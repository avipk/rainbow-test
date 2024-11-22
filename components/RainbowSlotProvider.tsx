'use client'
import { createContext, useMemo, } from "react";

interface RainbowslotProviderProps {
    children: React.ReactNode;
}

interface SlotsContextType {
    slots: Set<string>;
};

const slots: Set<string> = new Set();
export const RainbowSlotContext = createContext<SlotsContextType>({ slots });

export default function RainbowslotProvider({ children }: RainbowslotProviderProps) {
    const ctx: SlotsContextType = useMemo(() => ({ slots }), []);

    return (
        <>
            <RainbowSlotContext.Provider value={ctx}>
                {children}
                <div className="slots">Slots: -{[...slots].join(', ')}-</div>
            </RainbowSlotContext.Provider>
        </>
    );
}
