"use client";
import { LEDBoard } from "./LEDBoard";
import { LEDHeader } from "./LEDHeader";
import style from "./LED.module.css";

export const LED = () => {
  return (
    <div className={style.container}>
      <LEDHeader />
      <LEDBoard />
    </div>
  );
};
