type Props = { onRequestFullscreen: () => void };

export const Control = ({ onRequestFullscreen }: Props) => {
  return (
    <div>
      <button onClick={onRequestFullscreen}>
        フルスクリーン(iPhone非対応)
      </button>
    </div>
  );
};
