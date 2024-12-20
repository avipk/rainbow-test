import { RainbowToolFragment } from "../../types";

const opt1 = {
  "data": {
    "Rainbow": {
      "tools": [
        {
          "__typename": "RainbowTool",
          "slotId": "slot-1",
          "toolId": "slot-1 opt-1",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-2",
          "toolId": "slot-2 opt-1",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-3",
          "toolId": "slot-3 opt-1",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-4",
          "toolId": "slot-4 opt-1",
        },
      ] as RainbowToolFragment[]
    }
  }
};

const opt2 = {
  "data": {
    "Rainbow": {
      "tools": [
        {
          "__typename": "RainbowTool",
          "slotId": "slot-1",
          "toolId": "slot-1 opt-2",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-2",
          "toolId": "slot-2 opt-2",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-3",
          "toolId": "slot-3 opt-2",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-4",
          "toolId": "slot-4 opt-2",
        },
      ] as RainbowToolFragment[]
    }
  }
};

const opt3 = {
  "data": {
    "Rainbow": {
      "tools": [
        {
          "__typename": "RainbowTool",
          "slotId": "slot-1",
          "toolId": "slot-1 opt-3",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-2",
          "toolId": "slot-2 opt-3",
        },
        {
          "__typename": "RainbowTool",
          "slotId": "slot-4",
          "toolId": "slot-4 opt-3",
        },
      ] as RainbowToolFragment[]
    }
  }
};

const datas = [opt1, opt2, opt3];

function selectRandomData() {
  const index = Math.floor(Math.random() * datas.length);
  const selected = datas[index];

  return selected;
}

export default selectRandomData;