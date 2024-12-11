import { useContext } from "react";
import { RainbowDataContext } from '../Provider/RainbowDataProvider';

export default function useSlotData(slotId: string) {
    const { data } = useContext(RainbowDataContext);

    return data.find(tool => tool.slotId === slotId);

}