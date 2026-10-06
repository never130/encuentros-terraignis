import { CalendarDaysIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react";

import { StripeColumn } from "@/components/brand/stripes";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";

export function EventLocation() {
  const { location } = event;

  return (
    <section
      id="ubicacion"
      aria-labelledby="location-title"
      className="scroll-mt-16 bg-white lg:scroll-mt-20"
    >
      <div className="container-page grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-28">
        <div>
          <SectionHeading eyebrow="Ubicación" title={location.name} titleId="location-title" />
          <address className="mt-6 text-xl leading-relaxed text-terra-ink not-italic">
            {location.address}
            <br />
            {location.regionLabel}
            <br />
            {location.country}
          </address>
          <p className="mt-6 flex items-center gap-3 text-lg font-extrabold text-terra-petrol">
            <CalendarDaysIcon aria-hidden="true" className="size-6 shrink-0" />
            {event.dateLabel}
          </p>
          <Button
            asChild
            size="cta"
            className="mt-10 w-full font-bold tracking-wide uppercase sm:w-auto"
          >
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
              Cómo llegar
              <ExternalLinkIcon aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </Button>
        </div>

        <LocationPanel city={location.city} region={`${location.province} · ${location.country}`} />
      </div>
    </section>
  );
}

function LocationPanel({ city, region }: { city: string; region: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative isolate aspect-[4/3] overflow-hidden terra-gradient text-white"
    >
      <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-10 sm:w-14" />
      <MapPinIcon
        strokeWidth={1.75}
        className="absolute top-8 right-8 size-12 text-terra-orange sm:top-10 sm:right-10"
      />
      <div className="absolute bottom-0 left-0 py-8 pr-8 pl-16 sm:py-10 sm:pl-24">
        <p className="text-sm font-extralight tracking-wide uppercase sm:text-lg">{region}</p>
        <p className="mt-1 text-5xl leading-none font-black tracking-tight uppercase sm:text-6xl">
          {city}
        </p>
      </div>
    </div>
  );
}
