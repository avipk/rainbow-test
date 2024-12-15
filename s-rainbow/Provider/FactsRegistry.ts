import { JsonValue } from "../types";

type FactSupplier = () => JsonValue | Promise<JsonValue>;
type FactUpdater = () => Promise<void>;
type PendingSubscriber = (isPending: boolean) => void;
export type FactSubscriber = (key: string, value: JsonValue) => void;

class FactsRegistry {
    private pending: Set<Promise<JsonValue>>;
    private facts: Map<string, JsonValue>;
    private subscribers: Map<string, Set<FactSubscriber>>;
    private pendingSubscribers: Set<PendingSubscriber>;
    private updaters: Map<string, FactUpdater>;
    
    constructor() {        
        this.facts = new Map();
        this.subscribers = new Map();
        this.pending = new Set();
        this.updaters = new Map();
        this.pendingSubscribers = new Set();
    }

    registerFact(key: string, supplier: FactSupplier): FactUpdater {
        this.generateValue(key, supplier);

        const updater = async () => {
            const value = await this.generateValue(key, supplier);
            this.notifySubscribers(key, value);
        };

        this.updaters.set(key, updater);

        return updater;
    }

    subscribe(key: string, subsriber: FactSubscriber) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }

        this.subscribers.get(key)?.add(subsriber);

        const unsubscribe = () => {
            this.subscribers.get(key)?.delete(subsriber);
        };

        return unsubscribe;
    }

    subscribePending(subscriber: PendingSubscriber) {
        this.pendingSubscribers.add(subscriber);

        const unsubscribe = () => this.pendingSubscribers.delete(subscriber);

        return unsubscribe;
    }

    getFact(key: string) {
        return this.facts.get(key);
    }

    getAllFacts() {
        return Object.fromEntries(this.facts.entries());
    }

    getUpdater(key: string) {
        return this.updaters.get(key);
    }

    isPending() {
        return this.pending.size > 0;
    }

    private async generateValue(key: string, supplier: FactSupplier) {
        let value = supplier();

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
        this.subscribers.get(key)?.forEach(subscriber => subscriber(key, value));
    }
}

export default FactsRegistry;