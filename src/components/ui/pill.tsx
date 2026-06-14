import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "@lib";

type PillTone = "neutral" | "success" | "muted";

type PillProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: PillTone;
  }
>;

export function Pill({
  children,
  className,
  tone = "neutral",
  ...props
}: PillProps) {
  return (
    <span className={cx("ui-pill", `ui-pill-${tone}`, className)} {...props}>
      {children}
    </span>
  );
}
