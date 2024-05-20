type Props = { onRequestFullscreen: () => void };

export const Control = ({ onRequestFullscreen }: Props) => {
  return (
    <div>
      <button className="" onClick={onRequestFullscreen}>
        Fullscreen
      </button>
    </div>
  );
};
