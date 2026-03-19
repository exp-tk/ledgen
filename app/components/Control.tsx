import style from "./Control.module.css";

type Props = { onRequestFullscreen: () => void };

export const Control = ({ onRequestFullscreen }: Props) => {
  return (
    <div className={style.container}>
      <button className={style.button} onClick={onRequestFullscreen}>
        フルスクリーン
      </button>
    </div>
  );
};
