import { atom } from "jotai";
import { nanoid } from "nanoid";
import {
  Block,
  BlockType,
  COLOR_PREST,
  SpecialBlockType,
} from "../constants/block";
import { makeCustomTextBlock } from "../utils/block";

export const INITIAL_BLOCK_MAP: Record<BlockType, Block> = {
  stationName: {
    label: "駅名",
    type: "stationName",
    formKey: "stationName",
    textColor: COLOR_PREST.orange,
  },
  stationNameKana: {
    label: "駅名(読み)",
    type: "stationNameKana",
    formKey: "stationNameKana",
    textColor: COLOR_PREST.orange,
  },
  stationNameRoman: {
    label: "駅名(ローマ字)",
    type: "stationNameRoman",
    formKey: "stationNameRoman",
    textColor: COLOR_PREST.orange,
  },
  stationNumber: {
    label: "駅番号",
    type: "stationNumber",
    formKey: "stationNumber",
    textColor: COLOR_PREST.orange,
  },
  lineName: {
    label: "路線名",
    type: "lineName",
    formKey: "lineName",
    textColor: COLOR_PREST.green,
  },
  lineNameRoman: {
    label: "路線名(ローマ字)",
    type: "lineNameRoman",
    formKey: "lineNameRoman",
    textColor: COLOR_PREST.green,
  },
  trainTypeName: {
    label: "種別名",
    type: "trainTypeName",
    formKey: "trainTypeName",
    textColor: COLOR_PREST.red,
  },
  trainTypeNameRoman: {
    label: "種別名(ローマ字)",
    type: "trainTypeNameRoman",
    formKey: "trainTypeNameRoman",
    textColor: COLOR_PREST.red,
  },
  finalDestinationName: {
    label: "終着駅",
    type: "finalDestinationName",
    formKey: "finalDestinationName",
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNameRoman: {
    label: "終着駅(ローマ字)",
    type: "finalDestinationNameRoman",
    formKey: "finalDestinationNameRoman",
    textColor: COLOR_PREST.orange,
  },
  finalDestinationNumber: {
    label: "終着駅番号",
    type: "finalDestinationNumber",
    formKey: "finalDestinationNumber",
    textColor: COLOR_PREST.orange,
  },
  customText: {
    label: "カスタムテキスト",
    type: "customText",
    textColor: COLOR_PREST.green,
  },
} as const;

export const SPECIAL_BLOCK_MAP: Record<SpecialBlockType, Block> = {
  space: {
    label: "スペース",
    type: "space",
  },
  narrow: {
    label: "スペース打ち消し",
    type: "narrow",
  },
  separator: {
    label: "スペース(大)",
    type: "separator",
  },
};

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
].map((blk) => ({ id: nanoid(), ...blk }));

export const blockAtom = atom<Block[]>(initialBlocks);
