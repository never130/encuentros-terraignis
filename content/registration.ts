export const sectors = [
  { value: "energy_operator", label: "Empresa energética / operadora" },
  { value: "supplier", label: "Empresa proveedora de bienes o servicios" },
  { value: "public_agency", label: "Organismo público" },
  { value: "public_company", label: "Empresa pública / provincial" },
  { value: "business_chamber", label: "Cámara / asociación empresarial" },
  { value: "academic", label: "Institución académica" },
  { value: "media", label: "Medio de comunicación" },
  { value: "other", label: "Otro" },
] as const;

export type SectorValue = (typeof sectors)[number]["value"];

export const consentText =
  "Autorizo el uso de los datos consignados en este formulario para la organización y las comunicaciones vinculadas al Encuentro.";
