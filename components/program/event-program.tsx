import { InfoIcon } from "lucide-react";

import { NotchRule } from "@/components/brand/notch-rule";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProgramEntry } from "@/components/program/program-entry";
import { program, programNotice } from "@/content/program";

/* Cada jornada replica una página del programa oficial; en desktop, lado a lado. */
export function EventProgram() {
  return (
    <section
      id="programa"
      aria-labelledby="program-title"
      className="scroll-mt-16 bg-white lg:scroll-mt-20"
    >
      <div className="container-page py-20 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Encuentro: Repensar las Cuencas Maduras"
            title="Programa"
            titleId="program-title"
          />
          <p className="flex items-center gap-2 text-sm font-medium text-terra-ink">
            <InfoIcon aria-hidden="true" className="size-4 shrink-0" />
            {programNotice}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {program.map((day) => (
            <article key={day.id} aria-labelledby={`${day.id}-title`}>
              <h3
                id={`${day.id}-title`}
                className="text-[2rem] leading-[0.95] font-extrabold tracking-[-0.02em] text-terra-petrol uppercase sm:text-[2.5rem]"
              >
                <span className="block">
                  {day.weekday} {day.day}
                </span>
                <span className="block">{day.month}</span>
              </h3>
              <NotchRule className="mt-4 max-w-xs text-terra-line" />

              <ol className="mt-10 space-y-8">
                {day.items.map((item, index) => (
                  <li key={index}>
                    <ProgramEntry item={item} />
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
