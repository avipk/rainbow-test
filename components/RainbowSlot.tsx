'use client';

import useRegisterSlot from "@/app/hooks/useRegisterSlot";

interface RainbowSlotProps {
    id: string;
}

export default function RainbowSlot({ id }: RainbowSlotProps) {
    useRegisterSlot(id);

    return (
        <div>slot {id}</div>
    );
}