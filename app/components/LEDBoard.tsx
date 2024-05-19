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
            <Text key={block.id} size="big" color={block.textColor ?? "green"}>
              {block.value}
            </Text>
          ) : (
            <div key={block.id} className={style[block.type]} />
          )
        )}
        <div className={style.separator} />
        {/* <Text size="big">この電車は、{lineName}</Text>
        <Text color="red" size="big">
          {trainTypeName}
        </Text>
        <Text color="orange" size="big">
          {finalDestinationName}行き
        </Text>
        <Text size="big">です。</Text>
        <Text color="red" size="big">
          あなたの食卓でありたい
        </Text>
        <Text color="orange" size="big">
          松屋練馬店
        </Text>
        <Text size="big">はこちらでお降りください。</Text>
      </div>
      <div className={style.container}>
        <Text size="big">This is the {lineNameRoman}</Text>
        <Text color="red" size="big">
          {trainTypeNameRoman}
        </Text>
        <Text size="big">train for</Text>
        <Text color="orange" size="big">
          {finalDestinationNameRoman}({finalDestinationNumber})
          <Text size="big">.</Text>
        </Text> */}
      </div>
    </Marquee>
  );
};
