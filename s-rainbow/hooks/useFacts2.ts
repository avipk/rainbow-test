import { useContext, useEffect, useRef, useState } from "react"
import { RainbowFactsRegistryContext } from "../Provider/RainbowDataProvider"
import { JsonObject } from "../types";
import { FactSubscriber } from "../Provider/FactsRegistry";

export default function useFacts(keys: string[]) {
    const factRegistry = useContext(RainbowFactsRegistryContext);
    const factsRef = useRef<JsonObject>({});
    const [ isPending, setIsPending ] = useState(false);

    const subscribeHandler: FactSubscriber = (key, value) => {
        factsRef.current = {
            ...factsRef.current, 
            [key]: value 
        }
    };    

    useEffect(() => {
        console.info(':::::::: subscribing to facts:', keys);
        const unsubscribers = keys.map(key => factRegistry.subscribe(key, subscribeHandler));

        const unsubscribePending = factRegistry.subscribeToPending(setIsPending);

        return () => {
            unsubscribers.forEach(unsubscribe => unsubscribe());
            unsubscribePending();
        }
    }, [factRegistry, keys]);        

    
    return [ factsRef.current, isPending ];
}