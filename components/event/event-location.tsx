import { CalendarDaysIcon, ExternalLinkIcon } from "lucide-react";

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

        <LocationMap src={location.mapEmbedUrl} title={`Mapa: ${location.name}, ${location.address}, ${location.city}`} />
      </div>
    </section>
  );
}

/* Mapa de Google enmarcado como las cajas del PDF: filete y cuadrado naranja en la esquina.
   loading="lazy": el mapa (pesado) se carga recién al llegar a la sección. */
function LocationMap({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative border-2 border-terra-petrol">
      <span aria-hidden="true" className="absolute -top-[11px] -left-[11px] z-10 size-4 bg-terra-orange" />
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block aspect-square w-full border-0 sm:aspect-[4/3]"
      />
    </div>
  );
}
