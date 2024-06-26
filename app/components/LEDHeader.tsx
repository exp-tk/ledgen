"use client";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { formAtom } from "../state/form";
import { languageAtom } from "../state/language";
import style from "./LEDHeader.module.css";
import { Text } from "./Text";

export const LEDHeader = () => {
  const {
    stationName,
    stationNameKana,
    stationNameRoman,
    stationNumber,
    state,
  } = useAtomValue(formAtom);

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
  const approachingStateText = useMemo(() => {
    switch (lang) {
      case "ja":
      case "kana":
        return "まもなく";
      case "en":
        return "Soon";
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
      <div
        className={[
          style.state,
          state === "arrived" ? style.zeroWidth : "",
        ].join(" ")}
      >
        {state === "next" && <Text color="green">{nextStateText}</Text>}
        {state === "approaching" && (
          <Text color="green">{approachingStateText}</Text>
        )}
      </div>
      <div className={style.station}>
        <Text enableSpacing={lang !== "en"} color="orange">
          {stationNameMap[lang] ?? ""}
        </Text>
        {lang === "en" && (
          <Text color="orange" kind="numbering">
            {stationNumber.length ? `(${stationNumber})` : ""}
          </Text>
        )}
      </div>
    </div>
  );
};
