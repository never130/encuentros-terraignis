import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/* Caja de la pieza oficial: filete y cuadrado lleno sobre la esquina superior izquierda. */
export function CornerBox({
  className,
  children,
  tone = "light",
  ...props
}: ComponentProps<"div"> & { tone?: "light" | "dark" }) {
  return (
    <div
      className={cn(
        "relative border-2",
        tone === "dark" ? "border-white" : "border-terra-line",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-[11px] -left-[11px] size-4",
          tone === "dark" ? "bg-terra-orange" : "bg-terra-petrol"
        )}
      />
      {children}
    </div>
  );
}
