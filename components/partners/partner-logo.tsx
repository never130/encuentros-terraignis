import Image from "next/image";

import type { Partner } from "@/content/event";
import { cn } from "@/lib/utils";

/* Logo oficial en negativo (para fondos oscuros); sin logo, el nombre institucional. */
export function PartnerLogo({
  partner,
  className,
}: {
  partner: Partner;
  className?: string;
}) {
  if (partner.logo) {
    return (
      <Image
        src={partner.logo.src}
        width={partner.logo.width}
        height={partner.logo.height}
        alt={partner.name}
        unoptimized
        className={cn("h-14 w-auto max-w-full object-contain", className)}
      />
    );
  }

  return (
    <p className={cn("text-xl leading-snug font-semibold text-balance", className)}>
      {partner.name}
    </p>
  );
}
