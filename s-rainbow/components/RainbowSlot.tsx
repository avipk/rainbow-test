'use client';

import { useEffect } from "react";
import { useSlotsRegistration, useSlotData } from '../hooks';

interface RainbowSlotProps {
    id: string;
}

export default function RainbowSlot({ id }: RainbowSlotProps) {
    const { registerSlot, unregisterSlot } = useSlotsRegistration();
    const slotData = useSlotData(id);

    useEffect(() => {
        registerSlot(id);

        return () => {
            unregisterSlot(id);
        }
    }, [id, registerSlot, unregisterSlot]);


    return (
        <div>
            <div>slot {id}</div>
            <div>{slotData?.toolId || 'noop'}</div>
        </div>
    );
}