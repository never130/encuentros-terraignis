import { CalendarDaysIcon, CheckIcon, MapPinIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { NotchRule } from "@/components/brand/notch-rule";
import { StripeColumn } from "@/components/brand/stripes";
import { TerraIgnisLogo } from "@/components/brand/terra-ignis-logo";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";

export const metadata: Metadata = {
  title: "Inscripción confirmada | Repensar las Cuencas Maduras",
  robots: { index: false, follow: false },
};

export default function RegistrationSuccessPage() {
  return (
    <main className="surface-dark relative isolate min-h-dvh overflow-hidden terra-gradient text-white">
      <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-9 sm:w-12 md:w-16 lg:w-24" />

      <div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col py-8 pr-4 pl-14 sm:pr-6 sm:pl-20 md:pl-28 lg:pl-36">
        <Link href="/" className="self-start">
          <TerraIgnisLogo eager className="h-10 sm:h-12" />
        </Link>

        <div className="my-auto py-16">
          <span className="flex size-14 items-center justify-center bg-terra-orange">
            <CheckIcon aria-hidden="true" strokeWidth={3} className="size-8 text-white" />
          </span>

          <h1 className="mt-8 text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.92] font-black tracking-[-0.025em] uppercase">
            Inscripción confirmada
          </h1>
          <NotchRule className="mt-6 max-w-xl text-white" />

          <p className="mt-8 max-w-2xl text-xl leading-snug sm:text-2xl">
            Su inscripción al Encuentro{" "}
            <strong className="font-extrabold">{event.name}</strong> ha sido registrada
            correctamente.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex items-center gap-4">
              <CalendarDaysIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-10 shrink-0 text-terra-orange"
              />
              <span className="text-xl font-extrabold text-terra-orange sm:text-2xl">
                {event.dateLabel}
              </span>
            </li>
            <li className="flex items-center gap-4">
              <MapPinIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-10 shrink-0 text-terra-orange"
              />
              <span className="text-lg leading-snug">
                <strong className="font-extrabold">{event.location.name}.</strong>{" "}
                {event.location.address}
                <br />
                {event.location.regionLabel}
              </span>
            </li>
          </ul>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="cta">
              <Link href="/#programa">Ver programa</Link>
            </Button>
            <Button asChild variant="outline-light" size="cta">
              <Link href="/">Volver al encuentro</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
