export type JsonObject = { [key: string]: JsonValue };

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | JsonObject;

  export interface RainbowToolFragment {
    __typename: 'RainbowTool'; 
     slotId?: string | null; 
     toolId: string;
  };