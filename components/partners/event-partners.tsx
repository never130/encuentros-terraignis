import { SectionHeading } from "@/components/layout/section-heading";
import { PartnerLogo } from "@/components/partners/partner-logo";
import { event } from "@/content/event";

/* Los logos oficiales disponibles son negativos: se presentan sobre el degradé institucional. */
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

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {event.partnerGroups.map((group) => (
            <div
              key={group.role}
              className="surface-dark flex flex-col gap-8 terra-gradient p-8 text-white sm:p-10"
            >
              <h3 className="text-lg font-semibold">{group.role}:</h3>
              <ul className="flex flex-1 flex-col justify-center gap-6">
                {group.partners.map((partner) => (
                  <li key={partner.name}>
                    <PartnerLogo partner={partner} className="h-16 sm:h-20" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
