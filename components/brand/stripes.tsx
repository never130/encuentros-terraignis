import { cn } from "@/lib/utils";

/*
 * Franjas naranjas de la pieza oficial: triángulos concéntricos con trazo de 35
 * (coordenadas del PDF de 1080 × 1920) recortados en una columna o en una banda.
 */

/** Columna lateral de la tapa (recorte x 0–139). */
export function StripeColumn({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 139 1920"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <g className="stroke-terra-orange" strokeWidth="35">
        <path d="M6.4 2301.5 1334.2-594.5H-1321.3Z" />
        <path d="M-1156-488.5H1168.9L6.4 2047.1Z" />
        <path d="M-990.8-382.5H1003.7L6.4 1792.7Z" />
        <path d="M-825.5-276.4H838.4L6.4 1538.3Z" />
        <path d="M-660.3-170.4H673.2L6.4 1283.8Z" />
        <path d="M-495-64.4H507.9L6.4 1029.4Z" />
        <path d="M-329.8 41.6H342.7L6.4 775Z" />
        <path d="M-164.5 147.7H177.4L6.4 520.6Z" />
      </g>
    </svg>
  );
}

/** Banda inferior de la página 3 del programa (recorte y 1722–1920). */
export function StripeBand({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 1722 1080 198"
      preserveAspectRatio="xMinYMin slice"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <g className="stroke-terra-orange" strokeWidth="35">
        <path d="M79 4000 1407 1104H-1249Z" />
        <path d="M-1083 1210H1241L79 3745Z" />
        <path d="M-918 1316H1076L79 3491Z" />
        <path d="M-753 1422H911L79 3236Z" />
        <path d="M-588 1528H746L79 2982Z" />
        <path d="M-422 1634H580L79 2728Z" />
        <path d="M-257 1740H415L79 2473Z" />
        <path d="M-92 1846H250L79 2219Z" />
      </g>
    </svg>
  );
}
