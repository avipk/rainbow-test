'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import FactsRegistry, { FactSubscriber } from "./FactsRegistry";
import { FactSupplier, JsonObject } from "../../types";
import FactsRegistryInitializer from "@/s-rainbow/Provider/facts/FactsRegistryInitializer";

interface FactsProviderProps {
    children: React.ReactNode;
    /**
     * Tuples array of fact-key and fact-supplier
     */
    factsSuppliers: [key: string, supplier: FactSupplier][];
}


interface TFactsContext {
    factsRegistry: FactsRegistry;
    factsKeys: string[];
}

const FactsContext = createContext<TFactsContext | null>(null);

export default function FactsProvider({ factsSuppliers, children }: FactsProviderProps) {
    console.info('::::::: FactsProvider - render function');
    const factsRegistry = useRef(new FactsRegistry());
    const factsKeys = useMemo(() => factsSuppliers.map(s => s[0]), [factsSuppliers]);

    return (
        <FactsContext.Provider value={{ factsRegistry: factsRegistry.current, factsKeys, }} >
            <FactsRegistryInitializer factsSuppliers={factsSuppliers} />
            {children}
        </ FactsContext.Provider>
    );
}

export function useFactsRegistry() {
    console.info('::::::: useFactsRegistry - called');
    const factsContext = useContext(FactsContext);


    if (!factsContext) {
        throw new Error('useFactsRegistry was called with no FactsContext available. probably was called outside a provider')
    }

    return factsContext.factsRegistry;
}

export function useFactsKeys() {
    console.info('::::::: useFactsKeys - called');
    const factsContext = useContext(FactsContext);


    if (!factsContext) {
        throw new Error('useFactsKeys was called with no FactsContext available. probably was called outside a provider')
    }

    return factsContext.factsKeys;
}

export function useFacts() {
    console.info('::::::: useFacts - called');
    const factRegistry = useFactsRegistry();
    const factsKeys = useFactsKeys();

    const factsRef = useRef<JsonObject>({});
    const [isPending, setIsPending] = useState(factRegistry.isPending());

    const subscribeHandler: FactSubscriber = (key, value) => {
        factsRef.current = {
            ...factsRef.current,
            [key]: value
        }
    };

    useEffect(() => {
        console.info('::::::: useFacts - effect');
        const unsubscribers = factsKeys.map(key => factRegistry.subscribe(key, subscribeHandler));

        const unsubscribePending = factRegistry.subscribeToPending((pendingStatus) => {
            setIsPending(pendingStatus)
        });

        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
            unsubscribePending();
        }
    }, [factRegistry, factsKeys]);


    return [factsRef.current, isPending];
}
