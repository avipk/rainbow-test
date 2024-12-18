'use client';

import { useEffect } from "react";
import { useFactsRegistry } from "./FactsProvider";
import { FactSupplier } from "../../types";

interface FactsRegistryInitializerProps {
    factsSuppliers: [key: string, FactSupplier][];
}
export default function FactsRegistryInitializer({ factsSuppliers }: FactsRegistryInitializerProps) {
    const factsRegistry = useFactsRegistry();

    // Create facts. execute suppliers
    useEffect(() => {
        factsRegistry.reset();

        factsSuppliers.forEach(([key, supllier]) => {
            factsRegistry.registerFact(key, supllier);
        });
    }, [factsRegistry, factsSuppliers]);

    return null;
}