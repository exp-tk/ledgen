import { atom } from "jotai";

export const languageAtom = atom<"ja" | "kana" | "en">("ja");
