'use client';

import { usePathname } from "next/navigation";
import RainbowProvider from "./RainbowProvider";
import facts from '../facts/facts';
import { DataProviderProps } from "./data/DataProvider";


type PathnameRefetchRainbowDataProviderProps = Omit<DataProviderProps, 'invalidateProp' | 'factsSuppliers'>

/**
 * Triggers a refetch for Rainbow data up on pathname cahnge
 */
export default function PathnameRefetchRainbowDataProvider(props: PathnameRefetchRainbowDataProviderProps) {
    console.info('::::::: PathnameRefetchRainbowDataProvider - render function');
    const pathname = usePathname();

    return <RainbowProvider invalidateProp={pathname} factsSuppliers={facts} {...props} />
}