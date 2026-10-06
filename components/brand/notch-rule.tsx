import { cn } from "@/lib/utils";

/**
 * Filete con "piquito" de la pieza oficial: tramo corto, quiebre hacia abajo
 * y línea continua. Toma el color de `currentColor`.
 */
export function NotchRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-start", className)}>
      <span className="h-[2.5px] w-12 shrink-0 bg-current sm:w-14" />
      <svg
        viewBox="0 0 24 18"
        fill="none"
        className="-ml-px h-[18px] w-6 shrink-0 overflow-visible"
      >
        <path d="M0 1.25 22.75 17V1.25" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className="h-[2.5px] flex-1 bg-current" />
    </div>
  );
}
