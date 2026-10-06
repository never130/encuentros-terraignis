/** Separador `;`: es el que espera Excel configurado en español al abrir un CSV con doble clic. */
export const CSV_SEPARATOR = ";";

/**
 * Prepara un valor para una celda CSV (criterio de copat3D):
 * 1. Neutraliza fórmulas: Excel ejecuta celdas que empiezan con = + - @ (o tab / retorno).
 *    Un apóstrofo inicial las convierte en texto.
 * 2. Escapa según CSV: comillas duplicadas y la celda entre comillas si contiene
 *    separador, comillas o saltos de línea.
 */
export function csvCell(value: string | null | undefined): string {
  const text = value ?? "";
  const neutralized = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  if (/[";,\n\r]/.test(neutralized)) {
    return `"${neutralized.replace(/"/g, '""')}"`;
  }
  return neutralized;
}

/** BOM UTF-8 al inicio: sin él, Excel en Windows rompe acentos y eñes. */
export function toCsv(header: string[], rows: string[][]): string {
  const lines = [header, ...rows].map((cells) => cells.map(csvCell).join(CSV_SEPARATOR));
  return "﻿" + lines.join("\r\n");
}
