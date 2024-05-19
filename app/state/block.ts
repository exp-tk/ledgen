import { atom } from "jotai";
import uniqueId from "lodash/uniqueId";
import { formAtom } from "./form";
import { store } from "../constants/jotai";

type BlockType =
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

type SpecialBlockType = "space" | "separator" | "narrow";

type Block = {
  readonly id: string;
  readonly label: string;
  readonly type: BlockType | SpecialBlockType;
  value?: string;
  textColor?: string;
};

type ColorPresetKey = "green" | "orange" | "red";
const COLOR_PREST: Record<ColorPresetKey, string> = {
  green: "green",
  orange: "orange",
  red: "crimson",
} as const;

const formAtomValue = store.get(formAtom);

const INITIAL_BLOCK_MAP: Record<BlockType, Block> = {
  stationName: {
    id: uniqueId(),
    label: "駅名",
    type: "stationName",
    value: formAtomValue.stationName,
    textColor: COLOR_PREST.orange,
  },
  stationNameKana: {
    id: uniqueId(),
    label: "駅名(読み)",
    type: "stationNameKana",
    value: formAtomValue.stationNameKana,
    textColor: COLOR_PREST.orange,
  },
  stationNameRoman: {
    id: uniqueId(),
    label: "駅名(ローマ字)",
    type: "stationNameRoman",
    value: formAtomValue.stationNameRoman,
    textColor: COLOR_PREST.orange,
  },
  stationNumber: {
    id: uniqueId(),
    label: "駅番号",
    type: "stationNumber",
    value: formAtomValue.stationNumber,
    textColor: COLOR_PREST.orange,
  },
  lineName: {
    id: uniqueId(),
    label: "路線名",
    type: "lineName",
    value: formAtomValue.lineName,
    textColor: COLOR_PREST.green,
  },
  lineNameRoman: {
    id: uniqueId(),
    label: "路線名(ローマ字)",
    type: "lineNameRoman",
    value: formAtomValue.lineNameRoman,
    textColor: COLOR_PREST.green,
  },
  trainTypeName: {
    id: uniqueId(),
    label: "種別名",
    type: "trainTypeName",
    value: formAtomValue.trainTypeName,
    textColor: COLOR_PREST.red,
  },
  trainTypeNameRoman: {
    id: uniqueId(),
    label: "種別名(ローマ字)",
    type: "trainTypeNameRoman",
    value: formAtomValue.trainTypeNameRoman,
    textColor: COLOR_PREST.red,
  },
  finalDestinationName: {
    id: uniqueId(),
    label: "終着駅",
    type: "finalDestinationName",
    value: formAtomValue.finalDestinationName,
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNameRoman: {
    id: uniqueId(),
    label: "終着駅(ローマ字)",
    type: "finalDestinationNameRoman",
    value: formAtomValue.finalDestinationNameRoman,
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNumber: {
    id: uniqueId(),
    label: "終着駅番号",
    type: "finalDestinationNumber",
    value: formAtomValue.finalDestinationNumber,
    textColor: COLOR_PREST.orange,
  },
  customText: {
    id: uniqueId(),
    label: "カスタムテキスト",
    type: "customText",
    value: "",
    textColor: COLOR_PREST.green,
  },
} as const;

const SPECIAL_BLOCK_MAP: Record<SpecialBlockType, Block> = {
  space: {
    id: uniqueId(),
    label: "スペース",
    type: "space",
  },
  narrow: {
    id: uniqueId(),
    label: "スペース打ち消し",
    type: "narrow",
  },
  separator: {
    id: uniqueId(),
    label: "スペース(大)",
    type: "separator",
  },
};

const makeCustomTextBlock = (
  value: string,
  textColor: ColorPresetKey = "green"
): Block => ({
  ...INITIAL_BLOCK_MAP.customText,
  textColor,
  value,
});

const makeStationNumberWithBracketBlocks = (): Block[] => [
  SPECIAL_BLOCK_MAP.narrow,
  makeCustomTextBlock("(", "orange"),
  SPECIAL_BLOCK_MAP.narrow,
  INITIAL_BLOCK_MAP.finalDestinationNumber,
  SPECIAL_BLOCK_MAP.narrow,
  makeCustomTextBlock(")", "orange"),
  SPECIAL_BLOCK_MAP.narrow,
];

const japaneseInitialBlocks: Block[] = [
  makeCustomTextBlock("この電車は、"),
  INITIAL_BLOCK_MAP.lineName,
  SPECIAL_BLOCK_MAP.space,
  INITIAL_BLOCK_MAP.trainTypeName,
  SPECIAL_BLOCK_MAP.space,
  INITIAL_BLOCK_MAP.finalDestinationName,
  makeCustomTextBlock("行き", "orange"),
  SPECIAL_BLOCK_MAP.space,
  makeCustomTextBlock("です。", "green"),
];

const englishInitialBlocks: Block[] = [
  makeCustomTextBlock("This is the"),
  INITIAL_BLOCK_MAP.lineNameRoman,
  INITIAL_BLOCK_MAP.trainTypeNameRoman,
  makeCustomTextBlock("train for"),
  INITIAL_BLOCK_MAP.finalDestinationNameRoman,
  ...makeStationNumberWithBracketBlocks(),
  makeCustomTextBlock("."),
].flatMap((blk) => [blk, SPECIAL_BLOCK_MAP.space]);

const initialBlocks = [
  ...japaneseInitialBlocks,
  SPECIAL_BLOCK_MAP.separator,
  ...englishInitialBlocks,
];

export const blockAtom = atom<Block[]>(initialBlocks);
