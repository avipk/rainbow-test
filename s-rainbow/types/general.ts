export type JsonObject = { [key: string]: JsonValue };

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | JsonObject;

export type FactProvider = () => [ string, JsonValue|Promise<JsonObject> ];

export type Facts = { [key: string]: JsonValue };
export interface RainbowToolFragment {
  __typename: 'RainbowTool'; 
    slotId?: string | null; 
    toolId: string;
};