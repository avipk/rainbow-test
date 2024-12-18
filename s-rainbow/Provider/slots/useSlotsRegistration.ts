import { useContext } from "react";
import { RainbowSlotsContext } from "./SlotsProvider";

export default function useSlotsRegistration() {
    return useContext(RainbowSlotsContext);
}