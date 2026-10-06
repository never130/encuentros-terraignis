import { CornerBox } from "@/components/brand/corner-box";
import type { ProgramItem } from "@/content/program";

/*
 * Naranja sobre blanco ≈ 3.1:1: los textos naranjas del panel van en ≥ 20 px
 * extrabold (texto grande WCAG), igual que en el PDF.
 */
export function ProgramEntry({ item }: { item: ProgramItem }) {
  if (item.kind === "moment") {
    return (
      <p className="text-lg leading-snug font-extrabold text-terra-ink sm:text-xl">
        <span className="tabular-nums">{item.time}</span>
        <span aria-hidden="true"> | </span>
        <span className="sr-only">: </span>
        {item.text}
      </p>
    );
  }

  return (
    <CornerBox className="px-5 py-5 sm:px-7 sm:py-6">
      <h4 className="text-xl leading-snug font-extrabold text-terra-orange">
        <span className="block uppercase">
          Panel {item.number}
          {item.label && `: ${item.label}`}
        </span>
        <span className="block text-pretty">{item.title}</span>
      </h4>
      {item.detail && (
        <p className="text-lg leading-snug text-pretty text-terra-ink sm:text-xl">
          {item.detail}
        </p>
      )}
      {item.participants && (
        <p className="mt-1 text-lg leading-snug text-pretty text-terra-ink sm:text-xl">
          Participan: {item.participants}
        </p>
      )}
    </CornerBox>
  );
}
