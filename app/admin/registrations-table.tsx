"use client";

import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { RegistrationRow } from "@/lib/registrations/admin-queries";

/** Filas por página (copat3D: con cientos de inscriptos la tabla entera se vuelve inmanejable). */
const PAGE_SIZE = 50;

const CELL = "px-3 py-3 align-top text-sm sm:px-4";
const filterSelect =
  "w-full [&_select]:h-11 [&_select]:bg-white [&_select]:pr-9 [&_select]:pl-3 [&_select]:text-sm";

type Sort = "recent" | "oldest";

/** Minúsculas y sin acentos, para buscar "perez" y encontrar "Pérez". */
function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function RegistrationsTable({
  rows,
  sectorOptions,
}: {
  rows: RegistrationRow[];
  sectorOptions: { value: string; label: string }[];
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [page, setPage] = useState(1);
  // Columnas secundarias ocultas por defecto para evitar scroll lateral en notebooks.
  const [showAll, setShowAll] = useState(false);

  const countryOptions = [...new Map(rows.map((r) => [r.country, r.countryName])).entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));

  const term = normalize(query.trim());
  const filtered = rows
    .filter(
      (r) =>
        (!term ||
          normalize(r.fullName).includes(term) ||
          normalize(r.organization).includes(term) ||
          r.email.includes(term)) &&
        (!country || r.country === country) &&
        (!sector || r.sector === sector)
    )
    .sort((a, b) =>
      sort === "recent" ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt)
    );

  // La página se DERIVA (no se corrige con un efecto): si el filtro deja menos páginas, se muestra la última válida.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  function update<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <section aria-labelledby="registrations-title" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="registrations-title" className="text-2xl font-extrabold text-terra-petrol uppercase">
          Inscriptos
        </h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => setShowAll(e.target.checked)}
            className="size-4 accent-terra-petrol"
          />
          Ver todas las columnas
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div className="grid gap-1.5">
          <Label htmlFor="admin-search">Buscar</Label>
          <div className="relative">
            <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-terra-ink/60" />
            <Input
              id="admin-search"
              type="search"
              value={query}
              onChange={(e) => update(setQuery)(e.target.value)}
              placeholder="Nombre, empresa o email"
              className="h-11 bg-white pl-9 text-sm md:text-sm"
            />
          </div>
        </div>
        <FilterSelect id="admin-country" label="País" value={country} onChange={update(setCountry)} allLabel="Todos los países" options={countryOptions} />
        <FilterSelect id="admin-sector" label="Sector" value={sector} onChange={update(setSector)} allLabel="Todos los sectores" options={sectorOptions} />
        <div className="grid gap-1.5">
          <Label htmlFor="admin-sort">Orden</Label>
          <NativeSelect
            id="admin-sort"
            value={sort}
            onChange={(e) => update(setSort)(e.target.value as Sort)}
            className={filterSelect}
          >
            <NativeSelectOption value="recent">Más recientes primero</NativeSelectOption>
            <NativeSelectOption value="oldest">Más antiguos primero</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      <p className="mt-4 text-sm" aria-live="polite">
        {filtered.length === 0
          ? "Sin resultados."
          : `Mostrando ${start + 1}–${start + visible.length} de ${filtered.length}${
              filtered.length !== rows.length ? ` (filtrados de ${rows.length})` : ""
            }`}
      </p>

      <div className="mt-3 overflow-x-auto border-2 border-terra-line bg-white">
        <table className="w-full min-w-[56rem] border-collapse text-left">
          <thead className="bg-terra-petrol text-white">
            <tr>
              <Th>Nombre</Th>
              <Th>Empresa / Organismo</Th>
              <Th>Cargo</Th>
              <Th>Sector</Th>
              {showAll && <Th>Ciudad</Th>}
              {showAll && <Th>Región</Th>}
              <Th>País</Th>
              <Th>Email</Th>
              {showAll && <Th>Teléfono</Th>}
              <Th>Fecha</Th>
              <Th>Confirmación</Th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={showAll ? 11 : 8} className="px-4 py-10 text-center text-terra-ink/80">
                  {rows.length === 0 ? "Todavía no hay inscripciones." : "Ninguna inscripción coincide con la búsqueda."}
                </td>
              </tr>
            ) : (
              visible.map((r) => (
                <tr key={r.id} className="border-t border-border even:bg-terra-petrol-tint">
                  <td className={`${CELL} font-semibold`}>{r.fullName}</td>
                  <td className={CELL}>{r.organization}</td>
                  <td className={CELL}>{r.role}</td>
                  <td className={CELL}>{r.sectorLabel}</td>
                  {showAll && <td className={CELL}>{r.city}</td>}
                  {showAll && <td className={CELL}>{r.region ?? "—"}</td>}
                  <td className={CELL}>{r.countryName}</td>
                  <td className={`${CELL} whitespace-nowrap`}>
                    <a href={`mailto:${r.email}`} className="underline-offset-2 hover:underline">
                      {r.email}
                    </a>
                  </td>
                  {showAll && <td className={`${CELL} whitespace-nowrap`}>{r.phone ?? "—"}</td>}
                  <td className={`${CELL} whitespace-nowrap tabular-nums`}>{r.createdAtLabel}</td>
                  <td className={CELL}>
                    <span
                      className={
                        r.emailSent
                          ? "inline-block bg-terra-petrol px-2 py-0.5 text-xs font-bold text-white"
                          : "inline-block border border-terra-line px-2 py-0.5 text-xs font-bold"
                      }
                    >
                      {r.emailSent ? "Enviado" : "Pendiente"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav aria-label="Páginas" className="mt-4 flex items-center justify-end gap-3">
          <Button
            variant="outline-petrol"
            className="h-10 px-3"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            <ChevronLeftIcon aria-hidden="true" />
            Anterior
          </Button>
          <span className="text-sm tabular-nums">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline-petrol"
            className="h-10 px-3"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Siguiente
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </nav>
      )}
    </section>
  );
}

function Th({ children }: { children: string }) {
  return (
    <th scope="col" className="px-3 py-3 text-xs font-bold tracking-wide whitespace-nowrap uppercase sm:px-4">
      {children}
    </th>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  allLabel,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <NativeSelect id={id} value={value} onChange={(e) => onChange(e.target.value)} className={filterSelect}>
        <NativeSelectOption value="">{allLabel}</NativeSelectOption>
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
