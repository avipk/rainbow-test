'use client';

import { createContext, useEffect, useState } from "react";
import type { RainbowToolFragment } from "../../types";
import selectRandomData from './mockData';
import useSlotsRegistration from "../slots/useSlotsRegistration";
import { useFacts } from "../facts/FactsProvider";


export interface DataProviderProps {
    children: React.ReactNode;
    /**
     * Determines when the provider should refetch data. 
     * Example: pass the URL 'pathname' to trigger refetch on navigation
     */
    invalidateProp: string | string[] | (() => string);
}

interface TDataContext {
    data: RainbowToolFragment[];
}

const defaultRainbowDataContext: TDataContext = {
    data: []
};

export const DataContext = createContext<TDataContext>(defaultRainbowDataContext);

// Serialize the invalidate prop to use as a dependency
function getInvalidateKey(invalidateProp: DataProviderProps['invalidateProp']) {
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

export default function DataProvider({ invalidateProp, children }: DataProviderProps) {
    console.info('::::::: DataProvider - render function');
    const slotsRegistration = useSlotsRegistration();
    const [contextData, setContenxtData] = useState<TDataContext>(defaultRainbowDataContext);

    // Serialize the invalidate prop to use as a dependency
    const invalidateKey = getInvalidateKey(invalidateProp);

    const [facts, isPending] = useFacts();

    useEffect(() => setContenxtData(ctx => {
        console.info('::::::: DataProvider - effect - invalidating data');
        return {
            ...ctx,
            data: [],
        };
    }), [invalidateKey]);

    useEffect(() => {
        console.info('::::::: DataProvider - effect - data-provider', facts, isPending);
        const slotIds = slotsRegistration.getSlotsList();

        const fetchData = () => {
            if (!facts || Object.keys(facts).length === 0 || isPending) {
                return;
            }

            setTimeout(async () => {
                const data = await Promise.resolve(selectRandomData());

                if (data) {
                    setContenxtData(ctx => ({
                        ...ctx,
                        data: data.data.Rainbow.tools
                    }));
                }
            }, 3000);
        };

        if (slotIds.length > 0) {
            fetchData();
        }
    }, [facts, invalidateKey, isPending, slotsRegistration]);

    return (
        <DataContext.Provider value={contextData}>
            {children}
        </DataContext.Provider>
    );
}