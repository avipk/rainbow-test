'use client'; 

import { useEffect, useState } from "react";
import { FactProvider, Facts, JsonObject, JsonValue } from "../types";

export default function useFacts(factsProviders: FactProvider[]) {
    const [ facts, setFacts ] = useState<JsonObject|null>(null);
    const [ isPending, setIsPending ] = useState(false);

    useEffect(() => {        
        setIsPending(() => true);
        setFacts(() => null);

        const promises:Promise<JsonValue>[] = [];
        const tempFacts = factsProviders.map(provider => provider()).reduce((acc, [key, value]) => {
            
            if (value instanceof Promise) {
                value.then(result => acc[key] = result);            
                promises.push(value);
            } else {
                acc[key] = value;
            }

            return acc;
        }, {} as Facts);

        Promise.all(promises).then(() => {
            setFacts(tempFacts);
            setIsPending(false);
        });
    },[factsProviders]);

    return [ facts, isPending ];
}