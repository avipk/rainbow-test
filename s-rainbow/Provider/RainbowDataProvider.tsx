'use client';

import mockData from './mockData';
import { createContext, useEffect, useRef, useState } from "react";
import { FactProvider, RainbowToolFragment } from '../types';
import useFacts from '../hooks/useFacts';

export interface RainbowDataProviderProps {
    children: React.ReactNode;
    /**
     * Determines when the provider should refetch data. 
     * Example: pass the URL 'pathname' to trigger refetch on navigation
     */
    invalidateProp: string | string[] | (() => string);
    factsProviders: FactProvider[];
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
}


export const RainbowDataContext = createContext<TRainbowDataContext>(defaultRainbowDataContext);
export const RainbowSlotsContext = createContext<TRainbowSlotsContext>(defaultRainbowSlotsContext);

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


export default function RainbowDataProvider({ children, invalidateProp, factsProviders }: RainbowDataProviderProps) {
    const slotIds = useRef(new Set<string>());
    const [rainbowData, setRainbowData] = useState<TRainbowDataContext['data']>([]);

    const [facts, isPending] = useFacts(factsProviders);

    function registerSlot(slotId: string) {
        slotIds.current.add(slotId);
    }

    function unregisterSlot(slotId: string) {
        slotIds.current.delete(slotId);
    }

    function getSlotsList() {
        return [...slotIds.current];
    }

    const invalidateKey = getInvalidateKey(invalidateProp);

    useEffect(() => {
        const fetchData = () => {
            if (!facts || Object.keys(facts).length === 0 || isPending) {
                return;
            }

            setTimeout(async () => {
                const f = facts;
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
    }, [facts, invalidateKey]);

    return (
        <RainbowSlotsContext.Provider value={{ registerSlot, unregisterSlot, getSlotsList }}>
            <RainbowDataContext.Provider value={{ data: rainbowData }}>
                {children}
            </RainbowDataContext.Provider>
        </RainbowSlotsContext.Provider>
    );

}


