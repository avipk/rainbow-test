'use client';

import { createContext, useMemo, useRef, } from "react";

interface SlotsProviderProps {
    children: React.ReactNode
}

interface TRainbowSlotsContext {
    registerSlot: (slotId: string) => void;
    unregisterSlot: (slotId: string) => void;
    getSlotsList: () => (string[]);
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

export const RainbowSlotsContext = createContext<TRainbowSlotsContext>(defaultRainbowSlotsContext);

export default function SlotsProvider({ children }: SlotsProviderProps) {
    console.info('::::::: SlotsProvider - render function');
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

    return (
        <RainbowSlotsContext.Provider value={slotContext}>
            {children}
        </RainbowSlotsContext.Provider>
    );
}

