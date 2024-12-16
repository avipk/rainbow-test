import { useContext } from "react";
import { RainbowFactsRegistryContext } from "../Provider/RainbowDataProvider";

export default function useFactsRegistry() {
    const factsRegistry = useContext(RainbowFactsRegistryContext);

    return factsRegistry;
}