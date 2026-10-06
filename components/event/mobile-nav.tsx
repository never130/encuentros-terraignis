"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { StripeColumn } from "@/components/brand/stripes";
import { TerraIgnisLogo } from "@/components/brand/terra-ignis-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { event } from "@/content/event";
import { navItems } from "@/content/navigation";

/**
 * Menú móvil a pantalla completa (como copat3D), sobre el Sheet de Radix:
 * foco atrapado, Escape y bloqueo del scroll de fondo ya resueltos.
 * El logo y el botón de cerrar quedan en la misma posición que en el header.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  // El scroll al ancla se hace al cerrar: mientras el Sheet está abierto el body está bloqueado.
  const pendingHash = useRef<string | null>(null);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="size-11 text-white hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Abrir menú"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="surface-dark h-dvh gap-0 overflow-y-auto border-0 terra-gradient text-white data-[side=right]:w-full data-[side=right]:sm:max-w-none"
        onCloseAutoFocus={(e) => {
          const hash = pendingHash.current;
          if (!hash) return;
          e.preventDefault();
          pendingHash.current = null;
          document.querySelector(hash)?.scrollIntoView();
          history.replaceState(null, "", hash);
        }}
      >
        <StripeColumn className="absolute top-16 bottom-0 left-0 -z-10 h-[calc(100%-4rem)] w-9 sm:w-12" />

        <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-white/15">
          <a href="#inicio" onClick={(e) => navigate(e, "#inicio")} className="shrink-0">
            <TerraIgnisLogo className="h-9" />
          </a>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-11 text-white hover:bg-white/10 hover:text-white"
              aria-label="Cerrar menú"
            >
              <XIcon className="size-6" />
            </Button>
          </SheetClose>
        </div>

        <SheetTitle className="sr-only">Menú</SheetTitle>
        <SheetDescription className="sr-only">
          Secciones del Encuentro {event.name}
        </SheetDescription>

        <div className="flex flex-1 flex-col justify-center pt-8 pr-6 pb-10 pl-16 sm:pl-24">
          <nav aria-label="Principal">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => navigate(e, item.href)}
                    className="block border-b border-white/15 py-4 text-[clamp(1.75rem,8vw,2.5rem)] leading-tight font-extrabold tracking-tight uppercase"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button asChild variant="accent" size="cta" className="mt-9 w-full">
            <a href="#inscripcion" onClick={(e) => navigate(e, "#inscripcion")}>
              Inscribirme
            </a>
          </Button>

          <p className="mt-7 text-white/85">
            {event.dateLabel}
            <br />
            {event.location.name} · {event.location.city}, {event.location.province}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
