import { atom } from "jotai";

export type FormAtom = {
  stationName: string;
  stationNameKana: string;
  stationNameRoman: string;
  stationNumber: string;
  lineName: string;
  lineNameRoman: string;
  trainTypeName: string;
  trainTypeNameRoman: string;
  finalDestinationName: string;
  finalDestinationNameRoman: string;
  finalDestinationNumber: string;
};

export const formAtom = atom<FormAtom>({
  stationName: "南町田グランベリーパーク",
  stationNameKana: "ミナミマチダグランベリーパーク",
  stationNameRoman: "Minami-machida Grandberry Park",
  stationNumber: "DT-25",
  lineName: "田園都市線",
  lineNameRoman: "Den-en-toshi Line",
  trainTypeName: "急行",
  trainTypeNameRoman: "Express",
  finalDestinationName: "中央林間",
  finalDestinationNameRoman: "Chuo-rinkan",
  finalDestinationNumber: "DT-27",
});
