'use client'
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface RainbowslotProviderProps {
    children: React.ReactNode;
}

type SlotsContextType = Set<string>;

export const RainbowSlotContext = createContext<SlotsContextType>(new Set());

export default function RainbowslotProvider({ children }: RainbowslotProviderProps) {
    const [slots, setSlots] = useState<SlotsContextType>(new Set());

    const pathname = usePathname();

    useEffect(() => {
        setSlots(new Set());
        console.info(':::: slots where reset');
    }, [pathname]);

    return (
        <>
            <RainbowSlotContext.Provider value={slots}>
                {children}
                <div className="slots">Slots: {slots.size ? [...slots].join(', ') : 'Empty'}</div>
            </RainbowSlotContext.Provider>
        </>
    );
}
