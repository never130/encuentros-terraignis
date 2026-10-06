import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { NotchRule } from "@/components/brand/notch-rule";
import { StripeColumn } from "@/components/brand/stripes";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";

/* Traducción web de la tapa del programa oficial. */
export function EventHero() {
  const { location } = event;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="surface-dark relative isolate scroll-mt-16 overflow-hidden terra-gradient-hero text-white lg:scroll-mt-20"
    >
      <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-9 sm:w-12 md:w-16 lg:w-24 xl:w-[7.5rem]" />

      {/* Padding izquierdo propio para no pisar la columna de franjas */}
      <div className="mx-auto w-full max-w-7xl pt-12 pr-4 pb-16 pl-14 sm:pt-16 sm:pr-6 sm:pl-20 md:pl-28 lg:pt-24 lg:pr-8 lg:pb-24 lg:pl-[max(2rem,calc(10rem_-_max(0px,(100vw_-_80rem)/2)))]">
        <p className="text-[1.375rem] leading-none font-extralight tracking-wide uppercase sm:text-4xl lg:text-5xl">
          {event.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-2 text-[clamp(2.5rem,11vw,7rem)] leading-[0.9] font-black tracking-[-0.025em] uppercase"
        >
          {event.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <NotchRule className="mt-8 max-w-2xl text-white" />

        <p className="mt-8 max-w-2xl text-2xl leading-tight font-extrabold text-pretty text-terra-orange sm:text-3xl lg:text-4xl">
          {event.tagline}
        </p>

        <ul className="mt-10 grid gap-7 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          <li className="flex items-center gap-4 sm:gap-5">
            <CalendarDaysIcon
              aria-hidden="true"
              strokeWidth={1.75}
              className="size-12 shrink-0 text-terra-orange sm:size-14"
            />
            <p className="text-2xl leading-[1.05] font-extrabold text-terra-orange sm:text-3xl">
              {event.dateLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </li>
          <li className="flex items-center gap-4 sm:gap-5">
            <MapPinIcon
              aria-hidden="true"
              strokeWidth={1.75}
              className="size-12 shrink-0 text-terra-orange sm:size-14"
            />
            <p className="text-lg leading-snug sm:text-xl">
              <strong className="font-extrabold">{location.name}.</strong>{" "}
              {location.address}
              <br />
              {location.regionLabel}
            </p>
          </li>
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:mt-12">
          <Button asChild variant="accent" size="cta">
            <a href="#inscripcion">
              Inscribirme
              <ArrowRightIcon aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline-light" size="cta">
            <a href="#programa">Ver programa</a>
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-16 lg:mt-20">
          {event.partnerGroups.map((group) => (
            <div key={group.role}>
              <p className="text-base font-semibold sm:text-lg">{group.role}:</p>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {group.partners.map((partner) => (
                  <PartnerLogo
                    key={partner.name}
                    partner={partner}
                    className="h-12 sm:h-14"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
