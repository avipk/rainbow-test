import { useContext } from "react"
import { RainbowFactsRegistryContext } from "../Provider/RainbowDataProvider"

export default function useFacts() {
    const factRegistry = useContext(RainbowFactsRegistryContext);
    

    
    return { facts, registerFact, subscribe, updateFact }
}