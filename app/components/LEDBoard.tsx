import { useAtomValue } from "jotai";
import Marquee from "react-fast-marquee";
import { blockAtom } from "../state/block";
import { formAtom } from "../state/form";
import style from "./LEDBoard.module.css";
import { Text } from "./Text";

export const LEDBoard = () => {
  const formVal = useAtomValue(formAtom);
  const blocks = useAtomValue(blockAtom);

  return (
    <Marquee
      className={style.marquee}
      gradient={false}
      speed={
        typeof document !== "undefined" && document.fullscreenElement
          ? window.innerWidth * 0.4
          : window.innerWidth * 0.25
      }
    >
      <div className={style.container}>
        {blocks.map((block) =>
          // TODO: 定数化
          block.type !== "space" &&
          block.type !== "separator" &&
          block.type !== "narrow" ? (
            <Text key={block.id} color={block.textColor ?? "green"}>
              {block.formKey ? formVal[block.formKey] : block.value ?? ""}
            </Text>
          ) : (
            <div key={block.id} className={style[block.type]} />
          )
        )}
        <div className={style.separator} />
      </div>
    </Marquee>
  );
};
