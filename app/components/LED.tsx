"use client";
import localFont from "next/font/local";
import style from "./LED.module.css";
import { LEDMarquee } from "./LEDMarquee";
import { LEDHeader } from "./LEDHeader";
import { forwardRef } from "react";

const dotFont = localFont({
  src: "../fonts/JF-Dot-jiskan24.woff2",
  display: "swap",
});

export const LED = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={[style.container, dotFont.className].join(" ")}>
      <LEDHeader />
      <LEDMarquee />
    </div>
  );
});

LED.displayName = "LED";
