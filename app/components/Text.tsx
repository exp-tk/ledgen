import { ReactNode } from "react";
import style from "./Text.module.css";

type Props = {
  kind?: "default" | "state" | "name" | "numbering" | "marquee";
  color?: string;
  children: ReactNode;
  enableSpacing?: boolean;
};

export const Text = ({
  kind = "default",
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
              style={{ color }}
              className={[style.base, style[kind]].join(" ")}
            >
              {c}
            </p>
          ))}
      </div>
    );
  }

  return (
    <p className={[style.base, style[kind]].join(" ")} style={{ color }}>
      {children}
    </p>
  );
};
