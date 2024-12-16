'use client';

import { useEffect } from "react";
import useFactsRegistry from "../hooks/useFactsRegistry";
import { FactSupplier } from "../types";

interface FactsRegistryInitializerProps {
    factsSuppliers: [key: string, FactSupplier][];
}
export default function FactsRegistryInitializer({ factsSuppliers }: FactsRegistryInitializerProps) {
    const factsRegistry = useFactsRegistry();

    useEffect(() => {
        factsSuppliers.forEach(([key, supllier]) => {
            factsRegistry.registerFact(key, supllier);
        }, [factsRegistry, factsSuppliers]);
    });

    return null;
}