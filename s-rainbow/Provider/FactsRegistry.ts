import { JsonValue } from "../types";

type FactProvider = () => JsonValue | Promise<JsonValue>;
type FactUpdater = () => Promise<void>;
type Subscriber = (key: string, value: JsonValue) => void;

class FactsRegistry {
    private pending: Set<Promise<JsonValue>>;
    private facts: Map<string, JsonValue>;
    private updaters: Map<string, FactUpdater>;
    private subscribers: Set<(key: string, value: JsonValue) => void>;

    constructor() {
        this.facts = new Map();
        this.updaters = new Map();
        this.subscribers = new Set();
        this.pending = new Set();
    }

    registerFact(key: string, provider: FactProvider): FactUpdater {
        this.generateValue(key, provider);

        const updater = async () => {
            const value = await this.generateValue(key, provider);
            this.notifySubscribers(key, value);
        };

        this.updaters.set(key, updater);

        return updater;
    }

    subscribe(subsriber: Subscriber) {
        this.subscribers.add(subsriber);

        const unsubscribe = () => {
            this.subscribers.delete(subsriber);
        };

        return unsubscribe();
    }

    getFacts() {
        return Object.fromEntries(this.facts.entries());
    }

    isPending() {
        return this.pending.size > 0;
    }

    private async generateValue(key: string, provider: FactProvider) {
        let value = provider();

        if (!(value instanceof Promise)) {
            value = Promise.resolve(value);
        } else {
            this.pending.add(value);
        }

        value.then(resolved => {
            this.facts.set(key, resolved);
            this.pending.delete(value);
        });

        return value;
    }

    private notifySubscribers(key: string, value: JsonValue) {
        this.subscribers.forEach(subscriber => subscriber(key, value));
    }
}

export default FactsRegistry;