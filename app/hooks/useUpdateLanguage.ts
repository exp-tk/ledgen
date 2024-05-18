"use client";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { languageAtom } from "../state/language";

export const useUpdateLanguage = () => {
  const [cur, set] = useAtom(languageAtom);

  const intervalIdRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      switch (cur) {
        case "ja":
          set("kana");
          break;
        case "kana":
          set("en");
          break;
        case "en":
          set("ja");
          break;
        default:
          set("ja");
          break;
      }
    }, 3000);
  }, [cur, set]);
};
