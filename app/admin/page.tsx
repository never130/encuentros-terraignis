import { DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { RegistrationsTable } from "@/app/admin/registrations-table";
import { TerraIgnisLogo } from "@/components/brand/terra-ignis-logo";
import { Button } from "@/components/ui/button";
import { event } from "@/content/event";
import { sectors } from "@/content/registration";
import { verifyAdminAuth } from "@/lib/admin-auth";
import {
  computeMetrics,
  listRegistrations,
  type RegistrationRow,
} from "@/lib/registrations/admin-queries";

export const metadata: Metadata = {
  title: "Panel de inscripciones | Encuentros Terra Ignis",
  robots: { index: false, follow: false },
};

// Datos en vivo: cada visita consulta la base.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // El proxy ya protege /admin; la página lo verifica de nuevo por su cuenta.
  if (!verifyAdminAuth((await headers()).get("authorization"))) notFound();

  let rows: RegistrationRow[] | null = null;
  try {
    rows = await listRegistrations(event.slug);
  } catch (error) {
    console.error("[admin] No se pudieron leer las inscripciones", error);
  }

  return (
    <div className="min-h-dvh bg-terra-petrol-tint text-terra-ink">
      <header className="surface-dark terra-gradient text-white">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-5">
            <TerraIgnisLogo eager className="h-9" />
            <span aria-hidden="true" className="hidden h-8 w-px bg-white/30 sm:block" />
            <p className="hidden text-sm font-semibold tracking-[0.14em] uppercase sm:block">
              Panel de inscripciones
            </p>
          </div>
          <Button asChild variant="accent" size="cta" className="h-11 px-5 text-base">
            <a href="/admin/export">
              <DownloadIcon aria-hidden="true" />
              Descargar Excel (CSV)
            </a>
          </Button>
        </div>
      </header>

      <main className="container-page py-10 lg:py-14">
        <p className="text-lg font-extralight tracking-wide text-terra-petrol uppercase">Encuentro:</p>
        <h1 className="text-3xl leading-none font-extrabold tracking-[-0.02em] text-terra-petrol uppercase sm:text-4xl">
          {event.name}
        </h1>
        <p className="mt-2 text-terra-ink/80">{event.dateLabel}</p>

        {rows === null ? (
          <div role="alert" className="mt-10 border-2 border-destructive bg-white p-6">
            <p className="font-bold text-destructive">No se pudo conectar con la base de datos.</p>
            <p className="mt-1">Verificá que DATABASE_URL esté configurada y que la tabla exista (npm run db:setup).</p>
          </div>
        ) : (
          <Dashboard rows={rows} />
        )}
      </main>
    </div>
  );
}

function Dashboard({ rows }: { rows: RegistrationRow[] }) {
  const metrics = computeMetrics(rows);

  return (
    <>
      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Total inscriptos" value={metrics.total} highlight />
        <Stat label="Organizaciones" value={metrics.organizations} />
        <Stat label="Países" value={metrics.countries} />
        <Stat label="Sectores" value={metrics.sectors} />
      </dl>

      {metrics.total > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Breakdown title="Por sector" items={metrics.bySector} total={metrics.total} />
          <Breakdown title="Por país" items={metrics.byCountry.slice(0, 8)} total={metrics.total} />
        </div>
      )}

      <RegistrationsTable
        rows={rows}
        sectorOptions={sectors.map((s) => ({ value: s.value, label: s.label }))}
      />
    </>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="border-2 border-terra-line bg-white px-5 py-4">
      <dt className="text-sm font-semibold tracking-wide text-terra-ink/80 uppercase">{label}</dt>
      <dd
        className={
          highlight
            ? "mt-1 text-4xl font-black text-terra-orange tabular-nums"
            : "mt-1 text-4xl font-black text-terra-petrol tabular-nums"
        }
      >
        {value}
      </dd>
    </div>
  );
}

function Breakdown({
  title,
  items,
  total,
}: {
  title: string;
  items: { label: string; count: number }[];
  total: number;
}) {
  return (
    <section className="border-2 border-terra-line bg-white px-5 py-4">
      <h2 className="text-sm font-semibold tracking-wide text-terra-ink/80 uppercase">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
            <span className="truncate text-sm">{item.label}</span>
            <span className="text-sm font-bold tabular-nums">{item.count}</span>
            <span aria-hidden="true" className="col-span-2 h-1.5 bg-terra-petrol/10">
              <span
                className="block h-full bg-terra-petrol"
                style={{ width: `${Math.round((item.count / total) * 100)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
