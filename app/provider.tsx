"use client";
import { Provider as JotaiProvider } from "jotai";
import { ReactNode } from "react";
import { store } from "./constants/jotai";

type Props = {
  children: ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <JotaiProvider store={store}>{children}</JotaiProvider>;
};
