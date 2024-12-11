'use client';

import mockData from './mockData';
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import { RainbowToolFragment } from '../types';

interface RainbowDataProviderProps {
    children: React.ReactNode;
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


export default function RainbowDataProvider({ children }: RainbowDataProviderProps) {
    const slotIds = useRef(new Set<string>());
    const [rainbowData, setRainbowData] = useState<TRainbowDataContext['data']>([]);
    const pathname = usePathname();

    function registerSlot(slotId: string) {
        slotIds.current.add(slotId);
    }

    function unregisterSlot(slotId: string) {
        slotIds.current.delete(slotId);
    }

    function getSlotsList() {
        return [...slotIds.current];
    }

    useEffect(() => {
        const fetchData = () => {
            setTimeout(async () => {
                const data = await Promise.resolve(mockData);

                if (data) {
                    setRainbowData(data.data.Rainbow.tools);
                }
            }, 3000);
        };

        if (slotIds.current.size > 0) {
            fetchData();
        }
    }, [pathname]);

    return (
        <RainbowSlotsContext.Provider value={{ registerSlot, unregisterSlot, getSlotsList }}>
            <RainbowDataContext.Provider value={{ data: rainbowData }}>
                {children}
            </RainbowDataContext.Provider>
        </RainbowSlotsContext.Provider>
    );

}


