"use client";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { languageAtom } from "../state/language";
import style from "./LEDHeader.module.css";
import { Text } from "./Text";
import { formAtom } from "../state/form";

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
        <Text color="green">{nextStateText}</Text>
      </div>
      <div className={style.station}>
        <Text enableSpacing={lang !== "en"} size="big" color="orange">
          {stationNameMap[lang] ?? ""}
        </Text>
        {lang === "en" && <Text color="orange">({stationNumber})</Text>}
      </div>
    </div>
  );
};
