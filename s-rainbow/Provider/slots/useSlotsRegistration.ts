import { useContext } from "react";
import { RainbowSlotsContext } from "./SlotsProvider";

export default function useSlotsRegistration() {
    console.info('::::::: useSlotsRegistration - called');
    return useContext(RainbowSlotsContext);
}