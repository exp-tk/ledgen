"use client";
import localFont from "next/font/local";
import style from "./LED.module.css";
import { LEDBoard } from "./LEDBoard";
import { LEDHeader } from "./LEDHeader";

const dotFont = localFont({
  src: "../fonts/JF-Dot-jiskan24.woff2",
  display: "swap",
});

export const LED = () => {
  return (
    <div className={[style.container, dotFont.className].join(" ")}>
      <LEDHeader />
      <LEDBoard />
    </div>
  );
};
