import { SectionHeading } from "@/components/layout/section-heading";
import { event } from "@/content/event";

export function EventAxes() {
  return (
    <section aria-labelledby="about-title" className="bg-terra-petrol-tint">
      <div className="container-page grid grid-cols-1 gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <SectionHeading
          eyebrow="Sobre el encuentro"
          title="Un espacio federal de diálogo e intercambio"
          titleId="about-title"
          description={<p>{event.description}</p>}
          className="lg:col-span-7"
        />

        <div className="lg:col-span-5 lg:pt-1">
          <h3 className="text-lg font-extralight tracking-wide text-terra-petrol uppercase sm:text-2xl">
            Ejes del encuentro
          </h3>
          <ul className="mt-6 space-y-3">
            {event.axes.map((axis) => (
              <li
                key={axis}
                className="flex items-center gap-4 border-2 border-terra-line bg-white px-5 py-4"
              >
                <span aria-hidden="true" className="size-3 shrink-0 bg-terra-orange" />
                <span className="text-xl font-extrabold tracking-wide text-terra-petrol uppercase">
                  {axis}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
