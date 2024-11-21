import { RainbowSlotContext } from "@/components/RainbowSlotProvider";
import { useCallback, useContext } from "react";

export default function useRainbowSlotAdder() {
    const slots = useContext(RainbowSlotContext);

    const adder = useCallback((slotId: string) => {
        slots.add(slotId);
        console.log('::::::::::: adding slot', slotId, slots);
    }, [slots]);

    return adder;
}