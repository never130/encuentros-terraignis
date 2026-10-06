import { EventAxes } from "@/components/event/event-axes";
import { EventFooter } from "@/components/event/event-footer";
import { EventHeader } from "@/components/event/event-header";
import { EventHero } from "@/components/event/event-hero";
import { EventInfo } from "@/components/event/event-info";
import { EventLocation } from "@/components/event/event-location";
import { EventPartners } from "@/components/partners/event-partners";
import { EventProgram } from "@/components/program/event-program";
import { EventRegistration } from "@/components/registration/event-registration";

export default function HomePage() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 bg-white px-4 py-3 font-semibold text-terra-petrol focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al contenido
      </a>
      <EventHeader />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <EventHero />
        <EventInfo />
        <EventAxes />
        <EventProgram />
        <EventPartners />
        <EventRegistration />
        <EventLocation />
      </main>
      <EventFooter />
    </>
  );
}
