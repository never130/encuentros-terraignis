export const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#programa", label: "Programa" },
  { href: "#acompanan", label: "Acompañan" },
  { href: "#inscripcion", label: "Inscripción" },
] as const;

export const mainActions = [
  {
    href: "#inscripcion",
    title: "Inscripción",
    description: "Completá el formulario para registrar tu participación.",
  },
  {
    href: "#programa",
    title: "Programa",
    description: "Paneles y actividades de las dos jornadas.",
  },
  {
    href: "#acompanan",
    title: "Acompañan",
    description: "Instituciones que organizan y acompañan el encuentro.",
  },
] as const;

/* Textos de los botones (pedido de la organización). Cambiarlos acá cambia todo el sitio. */
export const ctaLabels = {
  /** Botón naranja principal (hero, header, menú): lleva al formulario. */
  primary: "Quiero más info",
  /** Versión corta para el header en celular, donde no entra el texto completo. */
  primaryShort: "Más info",
  /** Botón que envía el formulario. */
  submit: "Registrarme",
} as const;
