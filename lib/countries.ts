/*
 * Códigos ISO 3166-1 alfa-2. Los nombres se obtienen con Intl.DisplayNames,
 * así que no hace falta mantener traducciones.
 *
 * Se excluyen deliberadamente FK (Islas Malvinas), GS (Georgias del Sur y
 * Sandwich del Sur) y AQ (Antártida): forman parte de la provincia de
 * Tierra del Fuego, Antártida e Islas del Atlántico Sur y no deben ofrecerse
 * como países. También se omiten territorios sin población permanente.
 */
const COUNTRY_CODES = [
  "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AR", "AS", "AT", "AU",
  "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ",
  "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BW", "BY", "BZ", "CA",
  "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR",
  "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ",
  "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FM", "FO", "FR",
  "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP",
  "GQ", "GR", "GT", "GU", "GW", "GY", "HK", "HN", "HR", "HT", "HU", "ID",
  "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO",
  "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ",
  "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA",
  "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP",
  "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC",
  "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA",
  "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW",
  "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE",
  "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST",
  "SV", "SX", "SY", "SZ", "TC", "TD", "TG", "TH", "TJ", "TK", "TL", "TM",
  "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "US", "UY", "UZ",
  "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA",
  "ZM", "ZW",
] as const;

export type CountryCode = (typeof COUNTRY_CODES)[number];

export type CountryOption = { code: CountryCode; name: string };

const DEFAULT_COUNTRY: CountryCode = "AR";

export function isCountryCode(value: string): value is CountryCode {
  return (COUNTRY_CODES as readonly string[]).includes(value);
}

/** Argentina primero; el resto ordenado alfabéticamente en el idioma pedido. */
export function getCountryOptions(locale = "es"): CountryOption[] {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const options = COUNTRY_CODES.map((code) => ({
    code,
    name: names.of(code) ?? code,
  }));
  const first = options.filter((option) => option.code === DEFAULT_COUNTRY);
  const rest = options
    .filter((option) => option.code !== DEFAULT_COUNTRY)
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  return [...first, ...rest];
}
