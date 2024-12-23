import { useContext } from "react";
import { DataContext } from '../data/DataProvider';

export default function useSlotData(slotId: string) {
    console.info('::::::: useSlotData - called');
    const { data } = useContext(DataContext);

    return data.find(tool => tool.slotId === slotId);

}