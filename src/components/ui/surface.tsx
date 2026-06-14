import type { HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "@lib";

type SurfaceProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export function Panel({ children, className, ...props }: SurfaceProps) {
  return (
    <section className={cx("ui-surface", "ui-panel", className)} {...props}>
      {children}
    </section>
  );
}

export function Card({ children, className, ...props }: SurfaceProps) {
  return (
    <article className={cx("ui-surface", "ui-card", className)} {...props}>
      {children}
    </article>
  );
}
