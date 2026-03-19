import { atom } from "jotai";
import {
  Block,
  COLOR_PREST,
} from "../constants/block";
import { makeCustomTextBlock } from "../utils/block";
import { INITIAL_BLOCK_MAP, SPECIAL_BLOCK_MAP } from "./block";

export type TemplateKey = "tobu" | "jr" | "simple" | "custom";

export type Template = {
  label: string;
  description: string;
  blocks: Block[];
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

export const TEMPLATES: Record<Exclude<TemplateKey, "custom">, Template> = {
  tobu: {
    label: "東武風",
    description: "「この電車は、○○線 △△ □□行き です」",
    blocks: [
      makeCustomTextBlock("この電車は、"),
      INITIAL_BLOCK_MAP.lineName,
      SPECIAL_BLOCK_MAP.space,
      INITIAL_BLOCK_MAP.trainTypeName,
      SPECIAL_BLOCK_MAP.space,
      INITIAL_BLOCK_MAP.finalDestinationName,
      makeCustomTextBlock("行き", "orange"),
      SPECIAL_BLOCK_MAP.space,
      makeCustomTextBlock("です。", "green"),
      SPECIAL_BLOCK_MAP.separator,
      ...[
        makeCustomTextBlock("This is the"),
        INITIAL_BLOCK_MAP.lineNameRoman,
        INITIAL_BLOCK_MAP.trainTypeNameRoman,
        makeCustomTextBlock("train for"),
        INITIAL_BLOCK_MAP.finalDestinationNameRoman,
        ...makeStationNumberWithBracketBlocks(),
        makeCustomTextBlock("."),
      ].flatMap((blk) => [blk, SPECIAL_BLOCK_MAP.space]),
    ],
  },
  jr: {
    label: "JR風",
    description: "「○○線 △△ □□行き」",
    blocks: [
      INITIAL_BLOCK_MAP.lineName,
      SPECIAL_BLOCK_MAP.space,
      INITIAL_BLOCK_MAP.trainTypeName,
      SPECIAL_BLOCK_MAP.space,
      INITIAL_BLOCK_MAP.finalDestinationName,
      makeCustomTextBlock("行き", "orange"),
      SPECIAL_BLOCK_MAP.separator,
      ...[
        INITIAL_BLOCK_MAP.lineNameRoman,
        INITIAL_BLOCK_MAP.trainTypeNameRoman,
        makeCustomTextBlock("for"),
        INITIAL_BLOCK_MAP.finalDestinationNameRoman,
        ...makeStationNumberWithBracketBlocks(),
      ].flatMap((blk) => [blk, SPECIAL_BLOCK_MAP.space]),
    ],
  },
  simple: {
    label: "シンプル",
    description: "「△△ □□行き」",
    blocks: [
      INITIAL_BLOCK_MAP.trainTypeName,
      SPECIAL_BLOCK_MAP.space,
      INITIAL_BLOCK_MAP.finalDestinationName,
      makeCustomTextBlock("行き", "orange"),
      SPECIAL_BLOCK_MAP.separator,
      ...[
        INITIAL_BLOCK_MAP.trainTypeNameRoman,
        makeCustomTextBlock("for"),
        INITIAL_BLOCK_MAP.finalDestinationNameRoman,
      ].flatMap((blk) => [blk, SPECIAL_BLOCK_MAP.space]),
    ],
  },
};

export const templateKeyAtom = atom<TemplateKey>("tobu");
