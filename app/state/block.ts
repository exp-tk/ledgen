import { atom } from "jotai";
import uniqueId from "lodash/uniqueId";

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

const INITIAL_BLOCK_MAP: Record<BlockType, Block> = {
  stationName: {
    id: uniqueId(),
    label: "駅名",
    type: "stationName",
    value: "松屋",
    textColor: COLOR_PREST.orange,
  },
  stationNameKana: {
    id: uniqueId(),
    label: "駅名(読み)",
    type: "stationNameKana",
    value: "マツヤ",
    textColor: COLOR_PREST.orange,
  },
  stationNameRoman: {
    id: uniqueId(),
    label: "駅名(ローマ字)",
    type: "stationNameRoman",
    value: "Matsuya",
    textColor: COLOR_PREST.orange,
  },
  stationNumber: {
    id: uniqueId(),
    label: "駅番号",
    type: "stationNumber",
    value: "TK-28",
    textColor: COLOR_PREST.orange,
  },
  lineName: {
    id: uniqueId(),
    label: "路線名",
    type: "lineName",
    value: "松屋線",
    textColor: COLOR_PREST.green,
  },
  lineNameRoman: {
    id: uniqueId(),
    label: "路線名(ローマ字)",
    type: "lineNameRoman",
    value: "Matsuya Line",
    textColor: COLOR_PREST.green,
  },
  trainTypeName: {
    id: uniqueId(),
    label: "種別名",
    type: "trainTypeName",
    value: "急行",
    textColor: COLOR_PREST.red,
  },
  trainTypeNameRoman: {
    id: uniqueId(),
    label: "種別名(ローマ字)",
    type: "trainTypeNameRoman",
    value: "Express",
    textColor: COLOR_PREST.red,
  },
  finalDestinationName: {
    id: uniqueId(),
    label: "終着駅",
    type: "finalDestinationName",
    value: "朕邸",
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNameRoman: {
    id: uniqueId(),
    label: "終着駅(ローマ字)",
    type: "finalDestinationNameRoman",
    value: "TK Residence",
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNumber: {
    id: uniqueId(),
    label: "終着駅番号",
    type: "finalDestinationNumber",
    value: "TK-28",
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
