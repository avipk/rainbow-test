import { useContext, useEffect, useRef } from "react"
import { RainbowFactsRegistryContext } from "../Provider/RainbowDataProvider"
import { JsonObject } from "../types";
import { FactSubscriber } from "../Provider/FactsRegistry";

export default function useFacts(keys: string[]) {
    const factRegistry = useContext(RainbowFactsRegistryContext);
    const factsRef = useRef<JsonObject>({});

    const subscribeHandler: FactSubscriber = (key, value) => {
        factsRef.current = {
            ...factsRef.current, 
            [key]: value 
        }
    };    

    useEffect(() => {
        const unsubscribers = keys.map(key => factRegistry.subscribe(key, subscribeHandler));

        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
        }
    }, [factRegistry, keys]);        

    
    return factsRef.current;
}