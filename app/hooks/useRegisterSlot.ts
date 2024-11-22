import { RainbowSlotContext } from "@/components/RainbowSlotProvider";
import { useContext, useEffect } from "react";

export default function useRegisterSlot(id: string) {
    const { slots } = useContext(RainbowSlotContext);

    useEffect(() => {
        if (!slots.has(id)) {
            slots.add(id);
            console.info(':::::::::::: register slot', id, slots);
        }

        return () => {
            if (slots.has(id)) {
                slots.delete(id);
                console.info(':::::::::::: remove slot', id, slots);
            }
        };
    }, [id, slots]);
}