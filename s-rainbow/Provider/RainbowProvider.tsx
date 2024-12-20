'use client';

import { FactSupplier } from "../types";
import DataProvider from "./data/DataProvider";
import FactsProvider from "./facts/FactsProvider";
import SlotsProvider from "./slots/SlotsProvider";

interface RainbowProviderProps {
    children: React.ReactNode;
    factsSuppliers: [key: string, supplier: FactSupplier][];
    invalidateProp: string | string[] | (() => string);
};

export default function RainbowProvider({ factsSuppliers, invalidateProp, children }: RainbowProviderProps) {
    console.info('::::::: RainbowProvider - render function');
    return (
        <SlotsProvider>
            <FactsProvider factsSuppliers={factsSuppliers}>
                <DataProvider invalidateProp={invalidateProp}>
                    {children}
                </DataProvider>
            </FactsProvider>
        </SlotsProvider>
    );
}