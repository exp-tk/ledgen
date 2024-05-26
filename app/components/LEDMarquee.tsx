"use client";
import { useAtomValue } from "jotai";
import Marquee from "react-fast-marquee";

import { blockAtom } from "../state/block";
import { formAtom } from "../state/form";
import style from "./LEDMarquee.module.css";
import { Text } from "./Text";

export const LEDMarquee = () => {
  const formVal = useAtomValue(formAtom);
  const blocks = useAtomValue(blockAtom);

  const speed = "window" in global && window.innerWidth > 425 ? 550 : 250;

  return (
    <Marquee className={style.marquee} gradient={false} speed={speed}>
      <div className={style.container}>
        {blocks.map((blk) =>
          // TODO: 定数化
          blk.type !== "space" &&
          blk.type !== "separator" &&
          blk.type !== "narrow" ? (
            <Text key={blk.id} color={blk.textColor ?? "green"}>
              {blk.formKey ? formVal[blk.formKey] : blk.value ?? ""}
            </Text>
          ) : (
            <div key={blk.id} className={style[blk.type]} />
          )
        )}
        <div className={style.separator} />
      </div>
    </Marquee>
  );
};
