"use client";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { languageAtom } from "../state/language";
import style from "./LEDHeader.module.css";
import { Text } from "./Text";

export const LEDHeader = () => {
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

  const stationNameStub = {
    ja: "松屋",
    kana: "マツヤ",
    en: "Matsuya",
  };

  return (
    <div className={style.header}>
      <div className={style.state}>
        <Text color="green">{nextStateText}</Text>
      </div>
      <div className={style.station}>
        <Text enableSpacing={lang !== "en"} size="big" color="orange">
          {stationNameStub[lang] ?? ""}
        </Text>
        {lang === "en" && <Text color="orange">(TK-28)</Text>}
      </div>
    </div>
  );
};
