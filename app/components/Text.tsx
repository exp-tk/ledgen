import { ReactNode } from "react";
import style from "./Text.module.css";

type Props = {
  size?: "normal" | "big";
  color?: "green" | "orange" | "red";
  children: ReactNode;
  enableSpacing?: boolean;
};

export const Text = ({
  size = "normal",
  color = "green",
  children,
  enableSpacing,
}: Props) => {
  if (enableSpacing) {
    return (
      <div className={style.spacingContainer}>
        {children
          ?.toString()
          .split("")
          .map((c) => (
            <p
              key={c}
              className={[
                style.base,
                style[size],
                style[color],
              ].join(" ")}
            >
              {c}
            </p>
          ))}
      </div>
    );
  }

  return (
    <p className={[style.base, style[size], style[color]].join(" ")}>
      {children}
    </p>
  );
};
