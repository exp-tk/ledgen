import { Block, ColorPresetKey } from "../constants/block";
import { INITIAL_BLOCK_MAP } from "../state/block";

export const makeCustomTextBlock = (
  value: string,
  textColor: ColorPresetKey = "green"
): Block => ({
  ...INITIAL_BLOCK_MAP.customText,
  label: value,
  textColor,
  value,
});
