import { StripeColumn } from "@/components/brand/stripes";
import { SectionHeading } from "@/components/layout/section-heading";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { event } from "@/content/event";

/*
 * Una sola franja (como el pie de la tapa del PDF) en lugar de dos cajas: fondo azul noche,
 * columna de franjas naranjas y esquina cortada en diagonal. Los logos oficiales son negativos,
 * por eso van sobre fondo oscuro.
 */
export function EventPartners() {
  return (
    <section
      id="acompanan"
      aria-labelledby="partners-title"
      className="scroll-mt-16 bg-terra-petrol-tint lg:scroll-mt-20"
    >
      <div className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="Acompañan"
          title="Instituciones que acompañan"
          titleId="partners-title"
        />

        <div className="surface-dark relative isolate mt-14 overflow-hidden bg-terra-navy text-white [clip-path:polygon(0_0,calc(100%-3rem)_0,100%_3rem,100%_100%,0_100%)] sm:[clip-path:polygon(0_0,calc(100%-4.5rem)_0,100%_4.5rem,100%_100%,0_100%)]">
          <StripeColumn className="absolute inset-y-0 left-0 -z-10 h-full w-8 sm:w-12" />

          <ul className="grid grid-cols-1 divide-y divide-white/20 py-4 pr-6 pl-14 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:py-12 sm:pr-10 sm:pl-24 lg:pl-28">
            {event.partnerGroups.map((group) => (
              <li
                key={group.role}
                className="flex flex-col gap-5 py-8 sm:px-10 sm:py-2 sm:first:pl-0 lg:px-14"
              >
                <h3 className="text-lg font-extralight tracking-wide uppercase">{group.role}:</h3>
                <div className="flex flex-1 flex-wrap items-center gap-8">
                  {group.partners.map((partner) => (
                    <PartnerLogo key={partner.name} partner={partner} className="h-16 sm:h-20" />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
