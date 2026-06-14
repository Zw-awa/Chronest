import type { HTMLAttributes } from "react";
import { cx } from "@lib";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  kicker: string;
  title: string;
  align?: "start" | "space-between";
};

export function SectionHeading({
  kicker,
  title,
  className,
  align = "start",
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cx("ui-section-heading", `ui-section-heading-${align}`, className)}
      {...props}
    >
      <div>
        <span className="ui-section-kicker">{kicker}</span>
        <strong className="ui-section-title">{title}</strong>
      </div>
    </div>
  );
}
