'use client';

import { useEffect } from "react";
import useSlotsRegistration from '../Provider/slots/useSlotsRegistration';
import useSlotData from '../Provider/data/useSlotData';

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
            {slotData?.toolId
                ? <div style={{ backgroundColor: 'pink', padding: '24px' }}>{slotData?.toolId || 'noop'}</div>
                : null}

        </div>
    );
}