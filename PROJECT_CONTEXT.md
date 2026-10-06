# PROJECT CONTEXT
# Terra Ignis Energía
# Plataforma de Encuentros Institucionales
# Evento inicial: Repensar las Cuencas Maduras

Version: 1.1
Fecha de definición: Octubre 2026
Estado: MVP a desarrollar

============================================================
1. RESUMEN DEL PROYECTO
============================================================

Desarrollar una plataforma web institucional, moderna, responsive,
bilingüe y reutilizable para los encuentros organizados por
Terra Ignis Energía S.A.

El primer evento publicado será:

"ENCUENTRO: REPENSAR LAS CUENCAS MADURAS"

La plataforma reemplazará el Google Forms utilizado actualmente
como mecanismo de inscripción.

La solución NO debe sentirse como:

- Google Forms;
- un formulario genérico;
- una plantilla SaaS;
- una landing improvisada;
- una aplicación administrativa;
- una web genérica de eventos.

Debe percibirse como:

- institucional;
- oficial;
- energética;
- profesional;
- sobria;
- moderna;
- confiable;
- vinculada visualmente a Terra Ignis Energía;
- vinculada institucionalmente al Gobierno de Tierra del Fuego.

La plataforma será utilizada por:

- autoridades;
- gobernadores;
- organismos nacionales y provinciales;
- empresas energéticas;
- operadores;
- CEOs;
- empresas provinciales;
- proveedores;
- cámaras empresariales;
- instituciones académicas;
- especialistas;
- medios;
- compañías argentinas;
- compañías internacionales.


============================================================
2. PROBLEMA QUE RESUELVE
============================================================

Actualmente la inscripción al encuentro se realiza mediante
Google Forms.

La organización considera que enviar un formulario de Google
dentro de una invitación institucional, particularmente a
autoridades y empresas nacionales e internacionales, no representa
adecuadamente el nivel institucional del evento.

La nueva solución debe permitir que una persona reciba un único
link o QR y pueda:

1. conocer el encuentro;
2. consultar fecha y lugar;
3. consultar el programa;
4. conocer quién organiza y quién acompaña;
5. registrarse;
6. recibir confirmación;
7. consultar nuevamente el programa cuando lo necesite.


============================================================
3. VISIÓN DEL PRODUCTO
============================================================

No desarrollar únicamente:

"una web para Cuencas Maduras".

Pensar conceptualmente el producto como:

"Encuentros Terra Ignis".

"Repensar las Cuencas Maduras" será el primer evento dentro de
esa estructura.

La arquitectura deberá permitir reutilizar posteriormente:

- layout;
- componentes;
- inscripción;
- programa;
- administración;
- emails;
- infraestructura.

para futuros encuentros.


============================================================
4. DOMINIO Y PUBLICACIÓN
============================================================

Vercel será inicialmente el hosting de PRODUCCIÓN.

NO será solamente staging.

Nombre sugerido del proyecto Vercel:

encuentros-terraignis


URL:

https://encuentros-terraignis.vercel.app


Evento actual:

https://encuentros-terraignis.vercel.app/cuencas-maduras


Inscripción:

https://encuentros-terraignis.vercel.app/cuencas-maduras/inscripcion


Programa:

https://encuentros-terraignis.vercel.app/cuencas-maduras/programa


Acompañan:

https://encuentros-terraignis.vercel.app/cuencas-maduras/acompanan


La aplicación debe poder funcionar indefinidamente utilizando
el dominio Vercel.


============================================================
5. INTEGRACIÓN FUTURA CON TERRA IGNIS
============================================================

La integración futura con:

https://terraignisenergia.com/

es deseable pero NO representa una dependencia del MVP.

Actualmente el desarrollador NO posee acceso administrativo
al sitio principal de Terra Ignis.

No bloquear el proyecto esperando ese acceso.

La opción futura preferida sería:

https://encuentros.terraignisenergia.com


Ese subdominio podría conectarse posteriormente al mismo proyecto
alojado en Vercel.

Esto sería un upgrade institucional importante.

Pero:

Prioridad MVP: BAJA.

Dependencia para lanzamiento: NINGUNA.


============================================================
6. STACK TECNOLÓGICO
============================================================

Framework:

- Next.js
- App Router
- TypeScript


Frontend:

- React
- Tailwind CSS
- shadcn/ui


Tipografía:

- Outfit
- next/font/google


Validación:

- Zod


Persistencia:

- PostgreSQL
- Supabase


Autenticación administrativa:

- Supabase Auth


Emails transaccionales:

- Resend


Hosting:

- Vercel


Repositorio:

- GitHub


Analytics:

- Vercel Analytics opcional


Protección antispam:

- honeypot
- rate limiting
- Cloudflare Turnstile si resulta necesario


NO utilizar inicialmente:

- Brevo
- Django
- Redis
- Celery
- Kubernetes
- microservicios
- RabbitMQ
- CMS complejo
- infraestructura innecesaria


============================================================
7. FILOSOFÍA DE ARQUITECTURA
============================================================

El proyecto debe ser:

- simple;
- desacoplado;
- seguro;
- rápido;
- responsive;
- reusable;
- mantenible;
- fácil de desplegar;
- fácil de modificar.

NO sobreingenierizar.

No construir infraestructura empresarial innecesaria para
un encuentro de dos jornadas.

La arquitectura debe permitir crecimiento, pero solamente
cuando exista un requerimiento real.


============================================================
8. ESTRUCTURA DE RUTAS
============================================================

/

Inicialmente puede redireccionar a:

/cuencas-maduras


Evento:

/cuencas-maduras


Secciones:

/cuencas-maduras/inscripcion

/cuencas-maduras/inscripcion/exito

/cuencas-maduras/programa

/cuencas-maduras/acompanan


Administración:

/admin

/admin/inscripciones


Versión inglesa:

/en/cuencas-maduras

/en/cuencas-maduras/registration

/en/cuencas-maduras/program

/en/cuencas-maduras/partners


Español será el idioma predeterminado.


============================================================
9. ESTRUCTURA NEXT.JS ORIENTATIVA
============================================================

app/
│
├── page.tsx
│
├── [eventSlug]/
│   ├── page.tsx
│   ├── inscripcion/
│   │   ├── page.tsx
│   │   └── exito/
│   │       └── page.tsx
│   ├── programa/
│   │   └── page.tsx
│   └── acompanantes/
│       └── page.tsx
│
├── en/
│   └── [eventSlug]/
│
├── admin/
│   ├── page.tsx
│   └── inscripciones/
│       └── page.tsx
│
└── api/
    └── solamente cuando sea realmente necesario


components/
│
├── event/
├── program/
├── registration/
├── partners/
├── layout/
└── ui/


lib/
│
├── supabase/
├── resend/
├── validation/
├── auth/
└── utils/


content/
│
├── events/
│   └── cuencas-maduras.ts
├── program/
│   └── cuencas-maduras.ts
└── translations/
    ├── es.ts
    └── en.ts


============================================================
10. CONFIGURACIÓN DEL EVENTO
============================================================

La información específica del evento debe mantenerse separada
de los componentes visuales.

Ejemplo conceptual:

const event = {
  slug: "cuencas-maduras",

  name: "Repensar las Cuencas Maduras",

  eyebrow: "Encuentro",

  tagline:
    "Una agenda federal para el desarrollo de los hidrocarburos convencionales.",

  startDate: "2026-11-26",

  endDate: "2026-11-27",

  location: {
    name: "Fábrica de Talentos",
    address: "Av. Maipú 1255",
    city: "Ushuaia",
    province: "Tierra del Fuego",
    country: "Argentina"
  },

  registrationOpen: true,

  languages: ["es", "en"]
}


============================================================
11. DATOS OFICIALES DEL EVENTO
============================================================

Nombre:

ENCUENTRO
REPENSAR LAS CUENCAS MADURAS


Claim:

"Una agenda federal para el desarrollo de los
hidrocarburos convencionales."


Descripción:

"Un espacio federal de diálogo e intercambio entre autoridades
nacionales y provinciales, empresas de energía, operadores,
organizaciones gremiales, proveedores y referentes del sector,
para compartir experiencias y abordar los desafíos y oportunidades
de una nueva etapa de los hidrocarburos convencionales."


Ejes:

- Inversión
- Competitividad
- Sustentabilidad
- Empleo
- Desarrollo Regional


Fecha:

26 y 27 de noviembre de 2026


Lugar:

Fábrica de Talentos
Av. Maipú 1255
Ushuaia, Tierra del Fuego, AeIAS


Organiza:

Terra Ignis Energía S.A.


Acompaña:

Gobierno de Tierra del Fuego,
Antártida e Islas del Atlántico Sur


============================================================
12. SISTEMA DE DISEÑO OFICIAL
============================================================

La identidad visual ya cuenta con información oficial proporcionada
por Terra Ignis.

NO utilizar colores aproximados obtenidos visualmente del flyer.

NO utilizar Montserrat como sustituto.

La identidad confirmada es:


TIPOGRAFÍA OFICIAL

Outfit


COLOR INSTITUCIONAL PRINCIPAL

Pantone 7476 C

HEX:

#0D5257


COLOR DE ACENTO

Pantone Orange C

HEX:

#FF5E00


Estos valores deben considerarse oficiales dentro del proyecto.


============================================================
13. TIPOGRAFÍA OFICIAL — OUTFIT
============================================================

Utilizar:

Outfit


Implementación recomendada con Next.js:

next/font/google


Ejemplo conceptual:

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit"
});


Aplicar Outfit globalmente.


No introducir otras familias tipográficas salvo que exista
una necesidad concreta o posteriormente Terra Ignis lo solicite.


Pesos orientativos:

Body:
400

Body destacado:
500

Subtítulos:
500 / 600

Headings:
600 / 700

Títulos principales:
700 / 800

Hero:
700 / 800 / 900


Evitar utilizar peso Black indiscriminadamente.

Mantener jerarquía similar a las piezas institucionales.


============================================================
14. TOKENS DE COLOR
============================================================

Crear variables CSS centralizadas.

Ejemplo:

:root {
  --terra-petrol: #0D5257;
  --terra-orange: #FF5E00;

  --terra-white: #FFFFFF;
}


Los únicos colores institucionales confirmados actualmente son:

#0D5257

#FF5E00


El blanco puede utilizarse funcionalmente para:

- texto;
- superficies;
- fondos;
- contraste.


NO inventar colores adicionales como colores "oficiales".


============================================================
15. COLORES SECUNDARIOS FUNCIONALES
============================================================

Si la UI necesita tonos secundarios para:

- borders;
- hover;
- fondos;
- superficies;
- estados;

estos deben derivarse matemáticamente o mediante transparencia
a partir de los colores oficiales.

Ejemplos aceptables:

rgba(13, 82, 87, 0.08)

rgba(13, 82, 87, 0.15)

rgba(255, 94, 0, 0.10)


También pueden utilizarse neutros funcionales:

white

black

grises neutros muy controlados.


IMPORTANTE:

No presentar esos colores como parte oficial del brandbook.


============================================================
16. PALETA DE TAILWIND
============================================================

Configurar tokens semánticos.

Ejemplo conceptual:

colors: {
  terra: {
    petrol: "#0D5257",
    orange: "#FF5E00"
  }
}


Preferentemente utilizar CSS variables semánticas para facilitar
cambios futuros.


Ejemplos:

bg-terra-petrol

text-terra-orange

border-terra-orange


Evitar repetir valores hexadecimales directamente por todo
el código.


============================================================
17. USO DEL COLOR
============================================================

#0D5257 debe ser el color estructural dominante.

Utilizar para:

- hero;
- header;
- secciones institucionales;
- títulos;
- footer;
- elementos estructurales.


#FF5E00 debe funcionar como color de acento.

Utilizar para:

- CTA principal;
- panel numbers;
- indicadores;
- pequeños detalles;
- hover;
- líneas;
- elementos gráficos;
- iconos relevantes.


No abusar del naranja.

Debe destacar acciones y elementos específicos.


============================================================
18. CONTRASTE
============================================================

Combinaciones recomendadas:

Fondo #0D5257
+
texto blanco


Fondo blanco
+
texto #0D5257


CTA #FF5E00
+
texto con contraste accesible según validación final.


Verificar WCAG.

No asumir automáticamente que una combinación pasa contraste:
medirla durante QA.


============================================================
19. REFERENCIA VISUAL
============================================================

El diseño web debe derivarse de la pieza institucional oficial.

Características del flyer:

- fondo petrol;
- naranja como acento;
- blanco;
- Outfit;
- gran jerarquía tipográfica;
- títulos pesados;
- líneas finas;
- composiciones geométricas;
- diagonales;
- estructura limpia;
- contraste alto.


No copiar literalmente el flyer.

Traducir su lenguaje visual a una interfaz web moderna.


============================================================
20. RECURSOS GRÁFICOS
============================================================

Se pueden reutilizar conceptualmente:

- diagonales;
- barras;
- formas angulares;
- líneas;
- esquinas;
- marcos;
- interrupciones geométricas.


El naranja debe funcionar como elemento de energía/movimiento.

El petrol debe mantener la base institucional.


Evitar:

- gradientes multicolor;
- azul eléctrico;
- cyan;
- violetas;
- neon;
- hologramas;
- cyberpunk;
- glassmorphism excesivo;
- visuales generados por IA sin necesidad.


============================================================
21. GRADIENTES
============================================================

No utilizar los gradientes teal/navy aproximados definidos
anteriormente.

Si se utiliza gradiente, debe partir de:

#0D5257


y derivar hacia:

- una variante más oscura del mismo color;
- negro con transparencia;
- una tonalidad funcional derivada.


No introducir colores institucionales no aprobados.


============================================================
22. EXPERIENCIA GENERAL
============================================================

Flujo:

Invitación institucional
        ↓
Link / QR
        ↓
Landing del encuentro
        ↓
┌─────────────┬─────────────┬─────────────┐
│ Inscripción │ Programa    │ Acompañan   │
└─────────────┴─────────────┴─────────────┘
        ↓
Formulario
        ↓
Validación
        ↓
Base de datos
        ↓
Confirmación web
        ↓
Email mediante Resend


============================================================
23. HOME DEL EVENTO
============================================================

Ruta:

/cuencas-maduras


Orden recomendado:

1. Header
2. Hero
3. Información esencial
4. CTAs principales
5. Sobre el encuentro
6. Ejes
7. Preview programa
8. Acompañan
9. Ubicación
10. CTA final
11. Footer


============================================================
24. HEADER
============================================================

Incluir:

- logo Terra Ignis;
- navegación;
- selector ES / EN;
- CTA Inscribirme.


Navegación:

Inicio
Programa
Acompañan
Inscripción


CTA:

INSCRIBIRME


Desktop:

header limpio.


Mobile:

menu hamburguesa simple.


============================================================
25. HERO
============================================================

Contenido:

ENCUENTRO

REPENSAR LAS
CUENCAS MADURAS


Claim:

Una agenda federal para el desarrollo de los
hidrocarburos convencionales.


Fecha:

26 y 27 de noviembre de 2026


Lugar:

Fábrica de Talentos

Ushuaia · Tierra del Fuego


CTA primario:

INSCRIBIRME


CTA secundario:

VER PROGRAMA


============================================================
26. ESTILO DEL HERO
============================================================

Fondo dominante:

#0D5257


Texto:

principalmente blanco.


Palabras/accentos:

#FF5E00


Incorporar detalles geométricos inspirados en el flyer.

No llenar todo el hero de formas.

Mantener aire y claridad.


============================================================
27. PROGRAMA
============================================================

El programa actual es TENTATIVO.

Mostrar:

"Programa sujeto a modificaciones."


No inventar:

- horarios;
- speakers;
- moderadores;
- empresas;
- participantes nominales;
- sponsors.


============================================================
28. JUEVES 26 DE NOVIEMBRE
============================================================

09:30 h

Acreditaciones + coffee de bienvenida


10:00 h

Discurso inicial:

Prof. Gustavo Melella

Gobernador de Tierra del Fuego,
Antártida e Islas del Atlántico Sur


PANEL 1 — APERTURA

El futuro energético desde las provincias:
producción, inversión y desarrollo

Participan:

Autoridades de provincias productoras de hidrocarburos.


PANEL 2

Cuencas maduras:
cómo volver competitivos los hidrocarburos convencionales

Participan:

CEOs y autoridades de empresas del sector energético.


PANEL 3

Empresas provinciales de energía:
socios estratégicos para el desarrollo territorial

Participan:

Presidentes y autoridades de empresas provinciales de energía.


13:30–15:00

Almuerzo


PANEL 4

Explotación hidrocarburífera offshore:

Situación mundial actual y nuevas oportunidades
en la Cuenca Austral


El material actual NO especifica participantes del panel 4.

No inventarlos.


PANEL 5

Producción responsable:
sustentabilidad y licencia social en las cuencas maduras

Participan:

Especialistas y referentes vinculados a:

- sustentabilidad;
- gestión ambiental;
- actividad hidrocarburífera.


PANEL 6

Cadena de valor energética:
proveedores, servicios y desarrollo territorial

Participan:

- empresas proveedoras;
- cámaras empresariales;
- referentes vinculados al desarrollo de proveedores.


17:00 h aproximadamente

Finalización primera jornada.


============================================================
29. VIERNES 27 DE NOVIEMBRE
============================================================

09:30 h

Apertura + coffee de bienvenida


10:00 h

Comienzo primer panel


PANEL 7

Empresas petroleras convencionales:
desafíos del sector

Participan:

Representantes de empresas vinculadas
a la producción convencional.


PANEL 8

Inversiones y marco regulatorio para
una nueva etapa del convencional

Participan:

Legisladores nacionales y referentes vinculados a:

- sector energético;
- trabajo;
- innovación.


12:00 h

Conferencia de cierre


13:00 h

Finalización del encuentro


============================================================
30. DISEÑO DEL PROGRAMA
============================================================

No mostrar como tabla.

No utilizar estilo Excel.

Utilizar:

timeline

cards

tabs


Desktop:

[ JUEVES 26 ] [ VIERNES 27 ]


Mobile:

tabs horizontales sencillas.


Los números:

PANEL 1
PANEL 2
PANEL 3

pueden utilizar:

#FF5E00


Contenido:

#0D5257

o blanco dependiendo del fondo.


============================================================
31. PDF DEL PROGRAMA
============================================================

Permitir:

DESCARGAR PROGRAMA PDF


Pero el PDF será secundario.

La experiencia principal será HTML responsive.


============================================================
32. ACCIONES PRINCIPALES
============================================================

La organización solicitó:

INSCRIPCIÓN

PROGRAMA

ACOMPAÑAN


Estas tres opciones deben ser visibles sin navegación compleja.


============================================================
33. ACOMPAÑAN
============================================================

Título recomendado:

Instituciones que acompañan


Actualmente confirmado:


ORGANIZA

Terra Ignis Energía S.A.


ACOMPAÑA

Gobierno de Tierra del Fuego


No inventar sponsors.

Preparar componente configurable para agregar más logos.


============================================================
34. FORMULARIO DE INSCRIPCIÓN
============================================================

NO Google Forms.

NO iframe.

Formulario nativo de la plataforma.


Campos:

Nombre y apellido *

Empresa / Organismo / Institución *

Cargo / Función *

Sector *

Ciudad *

Provincia / Estado / Región

País *

Correo electrónico *

Teléfono de contacto


============================================================
35. SECTOR
============================================================

Opciones:

Empresa energética / operadora

Empresa proveedora de bienes o servicios

Organismo público

Empresa pública / provincial

Cámara / asociación empresarial

Institución académica

Medio de comunicación

Otro


Si selecciona Otro:

mostrar:

Especifique el sector *


============================================================
36. INTERNACIONALIZACIÓN DEL FORMULARIO
============================================================

No utilizar solamente:

"Ciudad y Provincia".


Utilizar:

Ciudad *

Provincia / Estado / Región

País *


Región puede ser opcional.

País obligatorio.


Teléfono compatible con prefijos internacionales.


============================================================
37. TRATAMIENTO DE DATOS
============================================================

Checkbox obligatorio.

No seleccionado inicialmente.


Texto:

"Autorizo el uso de los datos consignados en este formulario
para la organización y las comunicaciones vinculadas al Encuentro."


Guardar:

consent = true

consent_at

privacy_version


============================================================
38. VALIDACIÓN
============================================================

Utilizar Zod.

Validar cliente y servidor.

Validar:

fullName

organization

role

sector

sectorOther

city

country

email

consent


Normalizar email:

trim

lowercase


============================================================
39. ANTISPAM
============================================================

Implementar inicialmente:

honeypot

rate limiting


Evaluar Turnstile solamente si aparece spam real.


============================================================
40. DUPLICADOS
============================================================

Duplicado:

mismo event_slug

+

mismo email normalizado


Mensaje:

"Este correo ya posee una inscripción registrada para el encuentro."


No revelar otros datos.


============================================================
41. REGISTRO
============================================================

Flujo:

Formulario
   ↓
Zod
   ↓
Anti-spam
   ↓
Check duplicado
   ↓
PostgreSQL
   ↓
Resend
   ↓
Confirmación


Persistir antes de enviar email.

Una falla de Resend no debe borrar ni invalidar una inscripción
guardada correctamente.


============================================================
42. PÁGINA DE ÉXITO
============================================================

Ruta:

/cuencas-maduras/inscripcion/exito


Contenido:

INSCRIPCIÓN CONFIRMADA


Su inscripción al Encuentro
Repensar las Cuencas Maduras
ha sido registrada correctamente.


26 y 27 de noviembre de 2026

Fábrica de Talentos

Ushuaia, Tierra del Fuego


Botones:

VER PROGRAMA

VOLVER AL ENCUENTRO


Opcional:

AGREGAR AL CALENDARIO


============================================================
43. RESEND
============================================================

Proveedor:

Resend


NO utilizar Brevo.


Utilizar SDK oficial.

Todas las llamadas deben ejecutarse server-side.


Nunca exponer:

RESEND_API_KEY


============================================================
44. REMITENTE
============================================================

Durante desarrollo:

usar remitente autorizado por Resend.


Futuro deseable:

encuentros@terraignisenergia.com

inscripciones@terraignisenergia.com

eventos@terraignisenergia.com


Esto requiere posteriormente configuración DNS.

No bloquear MVP por esa integración.


============================================================
45. EMAIL
============================================================

Subject:

Inscripción confirmada | Repensar las Cuencas Maduras


Contenido base:

Hola, {nombre}:

Tu inscripción al Encuentro Repensar las Cuencas Maduras
fue registrada correctamente.

26 y 27 de noviembre de 2026

Fábrica de Talentos
Av. Maipú 1255
Ushuaia, Tierra del Fuego

Podés consultar el programa actualizado en:

{programUrl}

Terra Ignis Energía


Usar Outfit visualmente si es técnicamente viable en email,
pero diseñar fallback correcto debido a las limitaciones de
clientes de correo.


============================================================
46. BASE DE DATOS
============================================================

Tabla:

registrations


Campos:

id UUID PRIMARY KEY

event_slug TEXT NOT NULL

full_name TEXT NOT NULL

organization TEXT NOT NULL

role TEXT NOT NULL

sector TEXT NOT NULL

sector_other TEXT NULL

city TEXT NOT NULL

region TEXT NULL

country TEXT NOT NULL

email TEXT NOT NULL

phone TEXT NULL

language VARCHAR(5) NOT NULL DEFAULT 'es'

consent BOOLEAN NOT NULL

consent_at TIMESTAMPTZ NOT NULL

privacy_version TEXT NOT NULL

status TEXT NOT NULL DEFAULT 'confirmed'

email_sent BOOLEAN DEFAULT false

email_sent_at TIMESTAMPTZ NULL

created_at TIMESTAMPTZ DEFAULT now()

updated_at TIMESTAMPTZ DEFAULT now()


============================================================
47. UNIQUE
============================================================

Crear restricción equivalente a:

UNIQUE(event_slug, normalized_email)


La misma persona podrá registrarse a eventos futuros.


============================================================
48. ADMIN
============================================================

Ruta:

/admin


Autenticación:

Supabase Auth


Dashboard:

REPENSAR LAS CUENCAS MADURAS


Métricas:

Total inscriptos

Organizaciones

Países

Sectores


============================================================
49. TABLA ADMIN
============================================================

Mostrar:

Nombre

Empresa

Cargo

Sector

Ciudad

Región

País

Email

Teléfono

Fecha

Estado


============================================================
50. FILTROS ADMIN
============================================================

Buscar:

nombre

empresa

email


Filtrar:

país

sector

estado


Orden:

recientes

antiguos


============================================================
51. EXPORTACIÓN
============================================================

MVP:

CSV


Opcional:

XLSX


Exportar:

nombre

empresa

cargo

sector

ciudad

región

país

email

teléfono

idioma

estado

fecha


============================================================
52. SEGURIDAD
============================================================

No exponer:

service role

Resend key

secretos

datos de inscriptos


Los visitantes no pueden:

SELECT registrations

UPDATE registrations

DELETE registrations


Proteger dashboard server-side.


============================================================
53. VARIABLES DE ENTORNO
============================================================

NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

RESEND_FROM_EMAIL=

TURNSTILE_SECRET_KEY=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=


Crear:

.env.example


Nunca subir secretos.


============================================================
54. IDIOMAS
============================================================

ES

EN


Español predeterminado.


Traducir:

navegación

hero

descripción

programa

formulario

sectores

errores

consentimiento

confirmación

email

footer


No utilizar traducción automática runtime.


============================================================
55. MOBILE FIRST
============================================================

Alta prioridad.

Principales canales de acceso:

QR

WhatsApp

Email

LinkedIn


Probar:

360px

375px

390px

430px

768px

1024px

1440px


============================================================
56. UX MOBILE
============================================================

Formulario:

una columna.


Inputs grandes.

Labels visibles.

CTA ancho.

Buen espacio táctil.


No utilizar diseños de escritorio comprimidos.


============================================================
57. QR
============================================================

El QR definitivo de la invitación deberá apuntar a:

https://encuentros-terraignis.vercel.app/cuencas-maduras/inscripcion


Reemplazar el QR anterior asociado al Google Forms.


Probar:

Android

iPhone

monitor

papel


Mantener:

quiet zone

alto contraste

tamaño suficiente


============================================================
58. UBICACIÓN
============================================================

Fábrica de Talentos

Av. Maipú 1255

Ushuaia

Tierra del Fuego


CTA:

CÓMO LLEGAR


No hace falta mapa embebido pesado.


============================================================
59. SEO
============================================================

Title:

Encuentro Repensar las Cuencas Maduras | Terra Ignis Energía


Description:

26 y 27 de noviembre de 2026 ·
Fábrica de Talentos · Ushuaia, Tierra del Fuego.


Configurar:

canonical

robots

sitemap

OpenGraph


============================================================
60. OPEN GRAPH
============================================================

Crear:

1200 × 630 px


Utilizar:

#0D5257

#FF5E00

blanco

Outfit


Texto:

REPENSAR LAS CUENCAS MADURAS

26 Y 27 NOV 2026

Terra Ignis Energía


Debe verse correctamente al compartir en:

WhatsApp

LinkedIn

Facebook

mensajería


============================================================
61. ICONOGRAFÍA
============================================================

Usar:

Lucide Icons

o equivalente.


Mantener iconografía lineal y sobria.


No emojis en interfaz institucional.


============================================================
62. LOGOS
============================================================

Solicitar archivos originales:

SVG preferentemente.


Necesarios:

Terra Ignis Energía

Gobierno de Tierra del Fuego


No reconstruir manualmente si existen originales.


============================================================
63. ACCESSIBILITY
============================================================

HTML semántico.

Labels.

Focus visible.

Keyboard navigation.

Alt text.

prefers-reduced-motion.

Contraste WCAG.


============================================================
64. PERFORMANCE
============================================================

Objetivo Lighthouse aproximado:

Performance >= 90

Accessibility >= 90

Best Practices >= 90

SEO >= 90


Utilizar:

next/image

next/font


Outfit deberá cargarse mediante optimización de Next.js.

Evitar requests innecesarios de fuentes durante runtime.


============================================================
65. LOADING
============================================================

Al confirmar inscripción:

deshabilitar CTA.

Mostrar:

Confirmando inscripción...


Evitar doble submit.


============================================================
66. ERRORES
============================================================

Mensajes humanos.

Ejemplo:

"No pudimos completar la inscripción.
Intentá nuevamente en unos instantes."


Nunca mostrar errores internos de PostgreSQL o Supabase.


============================================================
67. PRIVACIDAD
============================================================

Los datos se utilizarán exclusivamente para:

organización

comunicaciones relacionadas con el encuentro.


No mostrar asistentes públicamente.


============================================================
68. FOOTER
============================================================

Fondo recomendado:

#0D5257


Contenido:

Terra Ignis Energía

Encuentro Repensar las Cuencas Maduras

Programa

Inscripción

Acompañan


Logos:

Terra Ignis

Gobierno de Tierra del Fuego


============================================================
69. RAÍZ DEL PROYECTO
============================================================

Inicialmente:

/

redirecciona a:

/cuencas-maduras


No desarrollar catálogo de eventos todavía.


Cuando existan múltiples eventos:

/

se convierte en:

portal "Encuentros Terra Ignis".


============================================================
70. COMPONENTES REUTILIZABLES
============================================================

Ejemplo:

<EventHeader />

<EventHero />

<EventInfo />

<EventAxes />

<EventProgramPreview />

<EventProgram />

<EventPartners />

<EventLocation />

<EventRegistration />

<EventFooter />


============================================================
71. ANALYTICS
============================================================

Vercel Analytics inicialmente.


Opcionalmente registrar:

click_inscribirme

registration_started

registration_completed

program_viewed

directions_clicked


Evitar tracking innecesario.


============================================================
72. GITHUB + VERCEL
============================================================

GitHub
   ↓
Vercel


main:

Production


Feature branches:

Preview Deployments


Utilizar Preview URLs para revisión con equipo/jefatura.


============================================================
73. TESTING
============================================================

Cubrir:

registro válido

email inválido

duplicado

consentimiento

sector otro

fallo DB


Deseable:

Playwright E2E.


============================================================
74. PROGRAMA DINÁMICO
============================================================

Mantener contenido en un único origen.

Ejemplo:

content/program/cuencas-maduras.ts


No dispersarlo dentro de JSX.


============================================================
75. FASE 2
============================================================

No desarrollar todavía:

QR individual

check-in

scanner

credenciales

certificados

emails masivos

lista de espera

CMS

constructor de eventos

roles complejos

gestión gráfica del programa


============================================================
76. PENDIENTES
============================================================

YA CONFIRMADOS:

[x] Tipografía oficial: Outfit

[x] Pantone 7476 C: #0D5257

[x] Pantone Orange C: #FF5E00

[x] Hosting inicial: Vercel

[x] Email: Resend

[x] Base de datos: Supabase/PostgreSQL


TODAVÍA PENDIENTES:

[ ] logos SVG oficiales

[ ] programa definitivo

[ ] panelistas finales

[ ] sponsors / acompañantes adicionales

[ ] contacto institucional

[ ] remitente definitivo Resend

[ ] política de privacidad final

[ ] inscripción pública o solamente por invitación

[ ] capacidad máxima

[ ] fecha cierre inscripción

[ ] textos ingleses institucionalmente aprobados

[ ] posible dominio encuentros.terraignisenergia.com


============================================================
77. INSCRIPCIÓN PÚBLICA VS INVITACIÓN
============================================================

Pendiente definir.

Opción A:

cualquier persona con link puede registrarse.


Opción B:

exclusivamente invitados.


No implementar códigos o tokens sin necesidad.


============================================================
78. TONO
============================================================

Formal.

Institucional.

Directo.

Claro.

Profesional.


No usar:

emojis

jerga startup

lenguaje exagerado

copy publicitario innecesario


============================================================
79. CRITERIO VISUAL
============================================================

Debe sentirse como una extensión digital real de Terra Ignis.

La combinación:

Outfit
+
#0D5257
+
#FF5E00
+
blanco
+
geometría institucional

debe constituir la base del sistema visual.


============================================================
80. MVP TERMINADO
============================================================

[ ] Landing

[ ] Outfit correctamente implementada

[ ] colores oficiales correctamente implementados

[ ] Hero

[ ] programa

[ ] inscripción

[ ] Zod

[ ] PostgreSQL / Supabase

[ ] tratamiento de datos

[ ] anti-spam

[ ] duplicados

[ ] pantalla de éxito

[ ] Resend

[ ] Acompañan

[ ] ES

[ ] EN

[ ] admin

[ ] búsqueda

[ ] filtros

[ ] CSV

[ ] OpenGraph

[ ] SEO

[ ] responsive

[ ] Vercel production

[ ] QR nuevo


============================================================
81. ORDEN DE IMPLEMENTACIÓN
============================================================

FASE 1

Next.js

TypeScript strict

Tailwind

shadcn

Outfit

design tokens oficiales


FASE 2

Landing

Header

Hero

secciones

responsive


FASE 3

Programa


FASE 4

Supabase

Zod

registro


FASE 5

Resend


FASE 6

Admin


FASE 7

English


FASE 8

SEO

OpenGraph

analytics

accessibility

performance


FASE 9

QA


FASE 10

Vercel production

QR definitivo


============================================================
82. DECISIONES TECNOLÓGICAS CERRADAS
============================================================

Next.js

TypeScript

Tailwind CSS

shadcn/ui

Outfit

Supabase

PostgreSQL

Supabase Auth

Resend

Vercel

GitHub


============================================================
83. DECISIONES DE BRANDING CERRADAS
============================================================

Tipografía oficial:

Outfit


Color principal:

Pantone 7476 C

#0D5257


Color acento:

Pantone Orange C

#FF5E00


Estas decisiones NO deben volver a reemplazarse por aproximaciones
visuales salvo solicitud explícita de Terra Ignis.


============================================================
84. ARQUITECTURA RESUMIDA
============================================================

INVITACIÓN
    │
    │ QR / LINK
    ▼
encuentros-terraignis.vercel.app
    │
    ▼
/cuencas-maduras
    │
    ├────────────► PROGRAMA
    │
    ├────────────► ACOMPAÑAN
    │
    └────────────► INSCRIPCIÓN
                        │
                        ▼
                       ZOD
                        │
                        ▼
                   ANTI-SPAM
                        │
                        ▼
                     SERVER
                        │
                 ┌──────┴──────┐
                 │             │
                 ▼             ▼
             SUPABASE        RESEND
                 │             │
                 ▼             ▼
            PostgreSQL      Email
                 │
                 ▼
               ADMIN


============================================================
85. DEPLOYMENT
============================================================

GitHub
   │
   ▼
Vercel
   │
   ├── Preview Deployments
   │
   └── Production
          │
          ▼
encuentros-terraignis.vercel.app


Posible futuro:

encuentros.terraignisenergia.com
          │
          ▼
    mismo deployment


============================================================
86. REGLA PARA AGENTES IA
============================================================

NO empezar generando código masivo.

Primero:

1. leer todo PROJECT_CONTEXT.md;
2. analizar arquitectura;
3. revisar modelo DB;
4. revisar estrategia auth;
5. revisar Resend;
6. revisar seguridad;
7. revisar i18n;
8. revisar design system;
9. revisar estructura del repositorio;
10. proponer plan.


Esperar aprobación antes de implementar.


============================================================
87. REGLAS DE DISEÑO PARA EL AGENTE
============================================================

NO sustituir Outfit por otra fuente.

NO cambiar #0D5257.

NO cambiar #FF5E00.

NO introducir nuevos colores de marca sin autorización.

NO utilizar gradientes aleatorios.

NO utilizar cyan.

NO utilizar violetas.

NO utilizar estética tech futurista.

NO reinterpretar Terra Ignis como una empresa de IA.


El sector es energía.

La estética debe comunicar:

industria

energía

territorio

institucionalidad

confianza


============================================================
88. REGLAS DE CÓDIGO
============================================================

TypeScript strict.

Evitar any.

Evitar archivos gigantes.

Evitar abstracciones prematuras.

No duplicar schemas.

No mezclar DB dentro de UI.

No exponer secrets.

No silenciar errores.

No inventar requisitos.


============================================================
89. PRIMER PROMPT PARA EL AGENTE
============================================================

Lee completamente PROJECT_CONTEXT.md.

Todavía NO escribas código ni inicialices el proyecto.

Actuá primero como arquitecto senior, diseñador de sistemas y
tech lead.

Analizá específicamente también el sistema visual oficial:

- Outfit
- Pantone 7476 C / #0D5257
- Pantone Orange C / #FF5E00

Necesito:

1. resumen de entendimiento;
2. arquitectura técnica;
3. estructura de directorios;
4. modelo PostgreSQL;
5. configuración Supabase;
6. autenticación admin;
7. formulario público seguro;
8. integración Resend;
9. estrategia ES/EN;
10. sistema de componentes;
11. design system;
12. estrategia responsive;
13. dependencias npm;
14. riesgos;
15. pendientes;
16. plan incremental.

No programes todavía.

No sobrearquitectures.

No agregues tecnologías innecesarias.

No inventes datos del evento.

Espera aprobación antes de comenzar código.


============================================================
90. CRITERIO FINAL
============================================================

El resultado debe poder ser enviado institucionalmente a:

- gobernadores;
- autoridades;
- CEOs;
- petroleras;
- empresas energéticas;
- proveedores;
- empresas internacionales.

El usuario debe sentir que está entrando a:

"la plataforma oficial del Encuentro
Repensar las Cuencas Maduras de Terra Ignis Energía."

No debe sentir que está entrando a:

"un Google Form mejorado".

La tecnología debe permanecer detrás de la experiencia.

Visualmente la identidad debe ser inmediatamente reconocible:

OUTFIT

#0D5257

#FF5E00

TERRA IGNIS ENERGÍA.