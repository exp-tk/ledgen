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
  stationName: "茂林寺前",
  stationNameKana: "モリンジマエ",
  stationNameRoman: "Morinjimae",
  stationNumber: "TI-09",
  lineName: "東武伊勢崎線",
  lineNameRoman: "Tobu Isesaki Line",
  trainTypeName: "区間急行",
  trainTypeNameRoman: "Section Express",
  finalDestinationName: "浅草",
  finalDestinationNameRoman: "Asakusa",
  finalDestinationNumber: "TS-01",
});
