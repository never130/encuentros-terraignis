"use client";

import { MenuIcon } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/content/navigation";

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
        className="surface-dark w-full gap-0 border-white/10 terra-gradient text-white sm:max-w-sm [&>[data-slot=sheet-close]]:size-11 [&>[data-slot=sheet-close]]:text-white [&>[data-slot=sheet-close]]:hover:bg-white/10 [&>[data-slot=sheet-close]]:hover:text-white [&>[data-slot=sheet-close]_svg]:size-6"
        onCloseAutoFocus={(event) => {
          const hash = pendingHash.current;
          if (!hash) return;
          event.preventDefault();
          pendingHash.current = null;
          document.querySelector(hash)?.scrollIntoView();
          history.replaceState(null, "", hash);
        }}
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-xs font-semibold tracking-[0.28em] text-white uppercase">
            Menú
          </SheetTitle>
          <SheetDescription className="sr-only">
            Secciones del Encuentro Repensar las Cuencas Maduras
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Principal" className="px-6 pt-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => navigate(event, item.href)}
                  className="block border-b border-white/10 py-4 text-2xl font-semibold tracking-tight uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="p-6">
          <Button asChild variant="accent" size="cta" className="w-full">
            <a
              href="#inscripcion"
              onClick={(event) => navigate(event, "#inscripcion")}
            >
              Inscribirme
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
