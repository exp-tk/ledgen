"use client";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { formAtom } from "../state/form";
import { languageAtom } from "../state/language";
import style from "./LEDHeader.module.css";
import { Text } from "./Text";

export const LEDHeader = () => {
  const { stationName, stationNameKana, stationNameRoman, stationNumber } =
    useAtomValue(formAtom);

  const lang = useAtomValue(languageAtom);
  const nextStateText = useMemo(() => {
    switch (lang) {
      case "ja":
      case "kana":
        return "次は";
      case "en":
        return "Next";
      default:
        return "";
    }
  }, [lang]);

  const stationNameMap: Record<string, string> = {
    ja: stationName,
    kana: stationNameKana,
    en: stationNameRoman,
  };

  return (
    <div className={style.header}>
      <div className={style.state}>
        <Text color="green" kind="state">
          {nextStateText}
        </Text>
      </div>
      <div className={style.station}>
        <Text enableSpacing={lang !== "en"} kind="name" color="orange">
          {stationNameMap[lang] ?? ""}
        </Text>
        {lang === "en" && (
          <Text color="orange" kind="numbering">
            ({stationNumber})
          </Text>
        )}
      </div>
    </div>
  );
};
