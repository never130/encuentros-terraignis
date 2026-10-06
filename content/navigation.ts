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
