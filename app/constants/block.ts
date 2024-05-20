import { FormAtom } from "../state/form";

export type BlockType =
  | "stationName"
  | "stationNameKana"
  | "stationNameRoman"
  | "stationNumber"
  | "lineName"
  | "lineNameRoman"
  | "trainTypeName"
  | "trainTypeNameRoman"
  | "finalDestinationName"
  | "finalDestinationNameRoman"
  | "finalDestinationNumber"
  | "customText";

export type SpecialBlockType = "space" | "separator" | "narrow";

export type Block = {
  id?: string;
  label: string;
  type: BlockType | SpecialBlockType;
  formKey?: keyof FormAtom;
  value?: string;
  textColor?: string;
};

export type ColorPresetKey = "green" | "orange" | "red";
export const COLOR_PREST: Record<ColorPresetKey, string> = {
  green: "green",
  orange: "orange",
  red: "crimson",
} as const;
