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

    /**
     * Register a fact-supllier for given fact-key
     * @param key Key to store the supplier result
     * @param supplier Suplly function return a fact value
     * @returns updater function 
     */
    registerFact(key: string, supplier: FactSupplier): FactUpdater {
        this.generateValue(key, supplier).then(resolved => {
            console.info(':::::: after registering fact and resolving:', resolved);
            this.notifySubscribers(key, resolved);
    });

        const updater = async () => {
            const value = await this.generateValue(key, supplier);
            this.notifySubscribers(key, value);
        };

        this.updaters.set(key, updater);

        return updater;
    }

    /**
     * Subscribe for updates upon facts updates
     * @param key updating fact key 
     * @param subscriber handler to execute when fact is updated
     * @returns handler for unsubscribing from fact updates
     */
    subscribe(key: string, subscriber: FactSubscriber) {
        if (!this.subscribers.has(key)) {
            console.info(':::::::: creating subsrber set for:', key);
            this.subscribers.set(key, new Set());
        }

        this.subscribers.get(key)?.add(subscriber);

        // Call immediately with the current value
        const factValue = this.facts.get(key);
        if (factValue) {
            console.info('::::: calling subscriber for fact', key);
            subscriber(key, factValue);
        }

        const unsubscribe = () => {
            this.subscribers.get(key)?.delete(subscriber);
        };

        return unsubscribe;
    }

    /**
     * Subscribe to pending state updates
     * @param subscriber handler to execute when pending state changes
     * @returns handler for unsubscribing from pending state updates
     */
    subscribeToPending(subscriber: PendingSubscriber) {
        this.pendingSubscribers.add(subscriber);

        const unsubscribe = () => this.pendingSubscribers.delete(subscriber);

        return unsubscribe;
    }

    /**
     * Get the value of a specific fact
     * @param key fact key
     * @returns fact value
     */
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
            this.addPending(value);
        }

        value
            .then(resolved => {
                this.facts.set(key, resolved);                
                console.info('::::::: fact value', key, resolved);
            })
            .finally(() => this.removePending(value));

        return value;
    }

    private addPending(value: Promise<JsonValue>) {
        if (this.pending.size === 0) {
            this.notifyPendingSubscribers(true);
        }

        this.pending.add(value);
    }

    private removePending(value: Promise<JsonValue>) {
        const isRemoved = this.pending.delete(value);

        if (isRemoved && this.pending.size === 0) {
            this.notifyPendingSubscribers(false);
        }
    }

    private notifySubscribers(key: string, value: JsonValue) {
        console.info(':::::: notifying about:', key, value, this.subscribers);
        this.subscribers.get(key)?.forEach(subscriber => subscriber(key, value));
    }

    private notifyPendingSubscribers(isPending: boolean) {
        this.pendingSubscribers.forEach(subscriber => subscriber(isPending));
    }
}

export default FactsRegistry;