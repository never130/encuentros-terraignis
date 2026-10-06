export type Partner = {
  name: string;
  /** Logo oficial en versión negativa (para fondos oscuros), en /public. */
  logo?: { src: string; width: number; height: number };
};

export type PartnerGroup = {
  role: string;
  partners: Partner[];
};

/* Logos extraídos en vectores del PDF oficial del programa; no redibujar. */
export const logos = {
  terraIgnis: {
    src: "/logos/terra-ignis-energia-negativo.svg",
    width: 201,
    height: 76,
  },
  gobiernoTdf: {
    src: "/logos/gobierno-tierra-del-fuego-negativo.svg",
    width: 359,
    height: 97,
  },
} as const;

export const event = {
  slug: "cuencas-maduras",
  eyebrow: "Encuentro:",
  name: "Repensar las Cuencas Maduras",
  titleLines: ["Repensar", "las Cuencas", "Maduras"],
  tagline:
    "Una agenda federal para el desarrollo de los hidrocarburos convencionales",
  description:
    "Un espacio federal de diálogo e intercambio entre autoridades nacionales y provinciales, empresas de energía, operadores, organizaciones gremiales, proveedores y referentes del sector, para compartir experiencias y abordar los desafíos y oportunidades de una nueva etapa de los hidrocarburos convencionales.",
  axes: [
    "Inversión",
    "Competitividad",
    "Sustentabilidad",
    "Empleo",
    "Desarrollo Regional",
  ],
  startDate: "2026-11-26",
  endDate: "2026-11-27",
  dateLines: ["26 y 27 de", "noviembre de 2026"],
  dateLabel: "26 y 27 de noviembre de 2026",
  location: {
    name: "Fábrica de Talentos",
    address: "Av. Maipú 1255",
    city: "Ushuaia",
    province: "Tierra del Fuego",
    regionLabel: "Ushuaia, Tierra del Fuego, AeIAS",
    country: "Argentina",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=F%C3%A1brica%20de%20Talentos%2C%20Av.%20Maip%C3%BA%201255%2C%20Ushuaia%2C%20Tierra%20del%20Fuego",
  },
  organizer: "Terra Ignis Energía S.A.",
  partnerGroups: [
    {
      role: "Organiza",
      partners: [{ name: "Terra Ignis Energía S.A.", logo: logos.terraIgnis }],
    },
    {
      role: "Acompaña",
      partners: [
        {
          name: "Gobierno de Tierra del Fuego, Antártida e Islas del Atlántico Sur",
          logo: logos.gobiernoTdf,
        },
      ],
    },
  ] satisfies PartnerGroup[],
  registrationOpen: true,
} as const;
