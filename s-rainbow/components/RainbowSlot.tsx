'use client';

import { useEffect } from "react";
import useSlotsRegistration from '../Provider/slots/useSlotsRegistration';
import useSlotData from '../Provider/data/useSlotData';

interface RainbowSlotProps {
    id: string;
}

export default function RainbowSlot({ id }: RainbowSlotProps) {
    console.info('::::::: RainbowSlot - render function');
    const { registerSlot, unregisterSlot } = useSlotsRegistration();
    const slotData = useSlotData(id);

    useEffect(() => {
        console.info('::::::: RainbowSlot - effect - register slot');
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