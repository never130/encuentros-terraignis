import { ArrowRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { NotchRule } from "@/components/brand/notch-rule";
import { StripeColumn } from "@/components/brand/stripes";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";

/*
 * Traducción web de la tapa del programa oficial.
 *
 * Entra completo en la primera pantalla: alto = viewport menos el header (4rem / 5rem en lg)
 * y tipografía + espacios en `svh` con clamp(), para notebooks bajas (1366×768) y celulares
 * (piso: 360×640). Criterio tomado de copat3D (trampa 14). Si se agrega contenido, volver a medir.
 */
export function EventHero() {
  const { location } = event;

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="surface-dark relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col justify-center overflow-hidden terra-gradient-hero text-white lg:min-h-[calc(100svh-5rem)] lg:scroll-mt-20"
    >
      <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-9 sm:w-12 md:w-16 lg:w-24 xl:w-[7.5rem]" />

      {/* Padding izquierdo propio para no pisar la columna de franjas */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-16 py-[clamp(0.75rem,3svh,4rem)] pr-4 pl-14 sm:pr-6 sm:pl-20 md:pl-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:pr-8 lg:pl-[max(2rem,calc(10rem_-_max(0px,(100vw_-_80rem)/2)))]">
        <div>
          <p className="text-[clamp(1.25rem,min(5vw,4svh),3rem)] leading-none font-extralight tracking-wide uppercase">
            {event.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-[clamp(0.25rem,1svh,0.75rem)] text-[clamp(2.25rem,min(11vw,9.5svh),7rem)] leading-[0.9] font-black tracking-[-0.025em] uppercase"
          >
            {event.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <NotchRule className="mt-[clamp(1rem,3svh,2rem)] max-w-2xl text-white" />

          {/* ≥ 20 px extrabold: naranja sobre el degradé oscuro cumple como texto grande WCAG. */}
          <p className="mt-[clamp(0.75rem,3svh,2rem)] max-w-2xl text-[clamp(1.25rem,min(5.2vw,3.6svh),2.25rem)] leading-tight font-extrabold text-pretty text-terra-orange">
            {event.tagline}
          </p>

          <ul className="mt-[clamp(1rem,3.5svh,2.5rem)] grid gap-[clamp(0.75rem,2svh,1.5rem)] sm:grid-cols-2 sm:gap-8">
            <li className="flex items-center gap-3 sm:gap-4">
              <CalendarDaysIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-9 shrink-0 text-terra-orange sm:size-[clamp(2.5rem,6svh,3.5rem)]"
              />
              <p className="text-[clamp(1.25rem,min(5.2vw,3.4svh),1.875rem)] leading-[1.05] font-extrabold text-terra-orange">
                <span className="block">{event.dateLines[0]}</span>
                <span className="block">{event.dateLines[1]}</span>
              </p>
            </li>
            <li className="flex items-center gap-3 sm:gap-4">
              <MapPinIcon
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-9 shrink-0 text-terra-orange sm:size-[clamp(2.5rem,6svh,3.5rem)]"
              />
              <p className="text-base leading-snug sm:text-[clamp(1rem,2.2svh,1.25rem)]">
                <strong className="font-extrabold">{location.name}.</strong> {location.address}
                <br />
                {location.regionLabel}
              </p>
            </li>
          </ul>

          <div className="mt-[clamp(1.25rem,4svh,3rem)] flex flex-col items-start gap-x-3 gap-y-3 sm:flex-row sm:items-center">
            <Button asChild variant="accent" size="cta" className="h-[clamp(3rem,6.5svh,3.5rem)] w-full sm:w-auto">
              <a href="#inscripcion">
                Inscribirme
                <ArrowRightIcon aria-hidden="true" />
              </a>
            </Button>
            {/* En celular, link de texto para no sumar otro botón alto; desde sm, botón. */}
            <a
              href="#programa"
              className="py-1 text-base font-bold tracking-wide uppercase underline decoration-terra-orange decoration-2 underline-offset-[6px] sm:hidden"
            >
              Ver programa
            </a>
            <Button
              asChild
              variant="outline-light"
              size="cta"
              className="hidden h-[clamp(3rem,6.5svh,3.5rem)] sm:inline-flex"
            >
              <a href="#programa">Ver programa</a>
            </Button>
          </div>
        </div>

        {/* Organiza / Acompaña: columna derecha en desktop; abajo en celular (se oculta si la pantalla es muy baja). */}
        <div className="mt-[clamp(1.25rem,4svh,3rem)] grid grid-cols-2 gap-6 [@media(max-height:700px)_and_(max-width:1023px)]:hidden lg:mt-0 lg:grid-cols-1 lg:gap-[clamp(1.25rem,4svh,2.5rem)] lg:pb-1">
          {event.partnerGroups.map((group) => (
            <div key={group.role}>
              <p className="text-sm font-semibold sm:text-base">{group.role}:</p>
              <div className="mt-2 flex flex-wrap items-center gap-6 sm:mt-3">
                {group.partners.map((partner) => (
                  <PartnerLogo
                    key={partner.name}
                    partner={partner}
                    className="h-10 sm:h-12 lg:h-[clamp(2.75rem,6.5svh,3.75rem)]"
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
