'use client';

import useRainbowSlotAdder from "@/app/hooks/useRainbowSlotAdder";
import { useEffect } from "react";

interface RainbowSlotProps {
    id: string;
}

export default function RainbowSlot({ id }: RainbowSlotProps) {
    const slotAdder = useRainbowSlotAdder();

    useEffect(() => slotAdder(id), [id, slotAdder]);

    return (
        <div>slot {id}</div>
    );
}