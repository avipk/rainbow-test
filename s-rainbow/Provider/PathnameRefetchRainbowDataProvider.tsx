'use client';

import { usePathname } from "next/navigation";
import RainbowDataProvider, { RainbowDataProviderProps } from "./RainbowDataProvider";
import facts from '../facts/facts';

type PathnameRefetchRainbowDataProviderProps = Omit<RainbowDataProviderProps, 'invalidateProp' | 'factsSuppliers'>

/**
 * Triggers a refetch for Rainbow data up on pathname cahnge
 */
export default function PathnameRefetchRainbowDataProvider(props: PathnameRefetchRainbowDataProviderProps) {
    const pathname = usePathname();

    return <RainbowDataProvider invalidateProp={pathname} factsSuppliers={facts} {...props} />
}