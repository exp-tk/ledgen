import Marquee from "react-fast-marquee";
import style from "./LEDBoard.module.css";
import { Text } from "./Text";

export const LEDBoard = () => (
  <Marquee className={style.marquee} gradient={false} speed={750}>
    <div className={style.container}>
      <Text size="big">この電車は、松屋線</Text>
      <Text color="red" size="big">
        急行
      </Text>
      <Text color="orange" size="big">
        朕邸行き
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
      <Text size="big">This is the Matsuya Line</Text>
      <Text color="red" size="big">
        Express
      </Text>
      <Text size="big">train for</Text>
      <Text color="orange" size="big">
        TK Residence(TK-28)
        <Text size="big">.</Text>
      </Text>
    </div>
  </Marquee>
);
