import type { ReactNode } from "react";

import { NotchRule } from "@/components/brand/notch-rule";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/* Jerarquía de la pieza oficial: antetítulo fino, título pesado y filete con piquito. */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-lg font-extralight tracking-wide uppercase sm:text-2xl",
            dark ? "text-white" : "text-terra-petrol"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className={cn(
          "mt-1 text-[2rem] leading-[0.98] font-extrabold tracking-[-0.02em] text-balance uppercase sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-terra-petrol"
        )}
      >
        {title}
      </h2>
      <NotchRule
        className={cn("mt-5 max-w-md", dark ? "text-white" : "text-terra-line")}
      />
      {description && (
        <div
          className={cn(
            "mt-6 text-lg leading-relaxed text-pretty",
            dark ? "text-white/85" : "text-terra-ink"
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
