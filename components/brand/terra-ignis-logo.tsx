import Image from "next/image";

import { logos } from "@/content/event";
import { cn } from "@/lib/utils";

/** Logo oficial en negativo (blanco y naranja): usar solo sobre fondos oscuros. */
export function TerraIgnisLogo({
  className,
  eager = false,
}: {
  className?: string;
  eager?: boolean;
}) {
  const { src, width, height } = logos.terraIgnis;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="Terra Ignis Energía"
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={cn("h-10 w-auto", className)}
    />
  );
}
