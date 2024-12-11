import { useContext } from "react";
import { RainbowSlotsContext } from "../Provider/RainbowDataProvider";

export default function useSlotsRegistration() {
    return useContext(RainbowSlotsContext);
}