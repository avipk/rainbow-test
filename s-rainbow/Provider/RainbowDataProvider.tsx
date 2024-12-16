'use client';

import mockData from './mockData';
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { FactSupplier as FactSupplier, RainbowToolFragment } from '../types';
import useFacts from '../hooks/useFacts2';
import FactsRegistry from './FactsRegistry';
import FactsRegistryInitializer from '../components/FactsRegistryInitializer';

export interface RainbowDataProviderProps {
    children: React.ReactNode;
    /**
     * Determines when the provider should refetch data. 
     * Example: pass the URL 'pathname' to trigger refetch on navigation
     */
    invalidateProp: string | string[] | (() => string);
    factsSuppliers: [key: string, supplier: FactSupplier][];
}

interface TRainbowSlotsContext {
    registerSlot: (slotId: string) => void;
    unregisterSlot: (slotId: string) => void;
    getSlotsList: () => (string[]);
}

interface TRainbowDataContext {
    data: RainbowToolFragment[];
}


const defaultRainbowSlotsContext: TRainbowSlotsContext = {
    registerSlot: (slotId: string) => {
        console.warn(`registerSlot called with id: ${slotId}, but no Provider is set.`);
    },
    unregisterSlot: (slotId: string) => {
        console.warn(`unregisterSlot called with id: ${slotId}, but no Provider is set.`);
    },
    getSlotsList: () => {
        console.warn(`getSlotsList called, but no Provider is set.`);
        return [];
    }
};

const defaultRainbowDataContext: TRainbowDataContext = {
    data: []
};

const defaultFactRegistry = new FactsRegistry();

export const RainbowDataContext = createContext<TRainbowDataContext>(defaultRainbowDataContext);
export const RainbowSlotsContext = createContext<TRainbowSlotsContext>(defaultRainbowSlotsContext);
export const RainbowFactsRegistryContext = createContext<FactsRegistry>(defaultFactRegistry);

// Serialize the invalidate prop to use as a dependency
function getInvalidateKey(invalidateProp: RainbowDataProviderProps['invalidateProp']) {
    let key: string;

    if (typeof invalidateProp === 'function') {
        key = invalidateProp();
    } else if (Array.isArray(invalidateProp)) {
        key = invalidateProp.join(',');
    } else {
        key = invalidateProp;
    }

    return key;
}

export default function RainbowDataProvider({ children, invalidateProp, factsSuppliers }: RainbowDataProviderProps) {
    // facts manger
    const factsRegistry = useRef(new FactsRegistry());
    // Rainbow data from server
    const [rainbowData, setRainbowData] = useState<TRainbowDataContext['data']>([]);
    // Stores the slot-ids avalable in provider context.
    const slotIds = useRef(new Set<string>());

    // Methods for managing adding / removing slots
    const slotContext = useMemo(() => ({
        registerSlot(slotId: string) {
            slotIds.current.add(slotId);
        },
        unregisterSlot(slotId: string) {
            slotIds.current.delete(slotId);
        },
        getSlotsList() {
            return [...slotIds.current];
        }
    }), []);

    // Serialize the invalidate prop to use as a dependency
    const invalidateKey = getInvalidateKey(invalidateProp);

    // Register for facts updates
    const factsKeys = useMemo(() => factsSuppliers.map(supplier => supplier[0]), [factsSuppliers]);
    const [facts, isPending] = useFacts(factsKeys);

    useEffect(() => {
        window['factsRegistry'] = factsRegistry.current;

        const fetchData = () => {
            console.info('::::::: fetch test', facts, isPending);
            if (!facts || Object.keys(facts).length === 0 || isPending) {
                return;
            }

            setTimeout(async () => {
                console.info(':::::::: facts', facts);
                const data = await Promise.resolve(mockData);

                if (data) {
                    setRainbowData(data.data.Rainbow.tools);
                }
            }, 3000);
        };

        if (slotIds.current.size > 0) {
            console.info(':::::::::::::::: fetching data');
            fetchData();
        }
    }, [facts, isPending, invalidateKey]);

    return (
        <RainbowSlotsContext.Provider value={slotContext}>
            <RainbowFactsRegistryContext.Provider value={factsRegistry.current}>
                <FactsRegistryInitializer factsSuppliers={factsSuppliers} />
                <RainbowDataContext.Provider value={{ data: rainbowData }}>
                    {children}
                </RainbowDataContext.Provider>
            </RainbowFactsRegistryContext.Provider>
        </RainbowSlotsContext.Provider>
    );

}


