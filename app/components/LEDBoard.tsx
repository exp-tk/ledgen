import { useAtomValue } from "jotai";
import Marquee from "react-fast-marquee";
import { blockAtom } from "../state/block";
import style from "./LEDBoard.module.css";
import { Text } from "./Text";

export const LEDBoard = () => {
  const blocks = useAtomValue(blockAtom);
  console.warn(blocks);
  return (
    <Marquee className={style.marquee} gradient={false} speed={750}>
      <div className={style.container}>
        {blocks.map((block) =>
          // TODO: 定数化
          block.type !== "space" &&
          block.type !== "separator" &&
          block.type !== "narrow" ? (
            <Text
              key={block.id}
              kind="marquee"
              color={block.textColor ?? "green"}
            >
              {block.value}
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
