import { atom } from "jotai";

type FormAtom = {
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
  stationName: "松屋",
  stationNameKana: "マツヤ",
  stationNameRoman: "Matsuya",
  stationNumber: "TK-02",
  lineName: "松屋線",
  lineNameRoman: "Matsuya Line",
  trainTypeName: "急行",
  trainTypeNameRoman: "Express",
  finalDestinationName: "朕邸",
  finalDestinationNameRoman: "TK Residence",
  finalDestinationNumber: "TK-28",
});
