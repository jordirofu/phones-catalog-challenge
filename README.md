# Phone Catalog · Zara Challenge

Aplicación web de **catálogo de teléfonos móviles** desarrollada como prueba
técnica de frontend. Permite **visualizar, buscar y gestionar** un catálogo de
smartphones: listar los teléfonos, consultar el detalle de cada modelo (con
selección de almacenamiento y color) y administrar un carrito de compra
persistente.

Construida con **React 19 + Vite**, estilos en **SASS (SCSS)**, estado global con
**React Context API** y testing con **Vitest + Testing Library**.

---

## Tabla de contenidos

- [Funcionalidades](#funcionalidades)
- [Stack tecnológico](#stack-tecnológico)
- [Decisiones de diseño y justificación](#decisiones-de-diseño-y-justificación)
- [Arquitectura y estructura del proyecto](#arquitectura-y-estructura-del-proyecto)
- [Flujo de datos](#flujo-de-datos)
- [Accesibilidad](#accesibilidad)
- [Testing](#testing)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno y API key](#variables-de-entorno-y-api-key)
- [Scripts disponibles](#scripts-disponibles)
- [Mejoras futuras](#mejoras-futuras)

---

## Funcionalidades

La aplicación cuenta con las **tres vistas** definidas en el enunciado:

### 1. Listado de teléfonos

- Cuadrícula de tarjetas con los **primeros 20 teléfonos** de la API (imagen,
  nombre, marca y precio base).
- **Buscador en tiempo real** que filtra por nombre o marca **vía API**, con
  **debounce de 300 ms** para no lanzar una petición por cada pulsación.
- **Indicador del número de resultados** encontrados.
- **Barra de navegación** con enlace al inicio (logo) e icono de carrito que
  muestra la **cantidad de artículos**.

### 2. Detalle de teléfono

- Nombre, marca, imagen grande y especificaciones técnicas detalladas.
- **Selector de color** que cambia dinámicamente la imagen mostrada.
- **Selector de almacenamiento** que actualiza el precio en tiempo real.
- Botón **"ADD"** habilitado solo cuando se han elegido color y almacenamiento.
- Sección de **"Productos similares"** en forma de carrusel con _drag-to-scroll_
  (arrastre con el ratón), que distingue arrastrar de hacer clic para no navegar
  por error.

### 3. Carrito

- Lista de artículos con imagen, nombre, especificaciones seleccionadas
  (almacenamiento / color) y precio individual.
- Botón para **eliminar** productos individuales.
- **Precio total** de la compra.
- Botón **"Continue shopping"** que redirige al listado.
- **Persistencia en `localStorage`**: el carrito sobrevive a recargas y cierres
  del navegador.

---

## Stack tecnológico

| Capa             | Tecnología                        | Requisito del challenge            |
| ---------------- | --------------------------------- | ---------------------------------- |
| UI               | **React 19**                      | React ≥ 17                         |
| Lenguaje         | **JavaScript (ESM)**              | —                                  |
| Bundler / dev    | **Vite**                          | Modo desarrollo y producción       |
| Routing          | **React Router**                  | —                                  |
| Estado global    | **Context API + `useReducer`**    | React Context API                  |
| Estilos          | **SASS (SCSS)**                   | CSS · SASS · Styled Components      |
| Testing          | **Vitest + Testing Library**      | Implementación de pruebas          |
| Calidad de código| **ESLint + Prettier**             | Linters y formatters               |

---

## Decisiones de diseño y justificación

### JavaScript en lugar de TypeScript

Aunque mi entorno habitual es TypeScript, el proyecto se desarrolla en
**JavaScript** porque es el lenguaje que utiliza el equipo de desarrollo al que
va dirigida la prueba. Para mitigar la ausencia de tipado estático en la frontera
con datos externos, la respuesta de la API se normaliza en una **capa de mappers**
que produce un modelo interno estable y predecible.

### Vite como bundler

Vite cubre directamente el requisito de **dos modos** del enunciado sin
configuración adicional:

- **Desarrollo** (`npm run dev`): assets sin minimizar y HMR casi instantáneo.
- **Producción** (`npm run build`): assets concatenados y minimizados, con
  _code-splitting_ automático.

### Estado global: Context API + `useReducer`

La gestión de estado mediante **React Context API** era un requisito. Se combina
con **`useReducer`** porque la lógica del carrito (añadir, eliminar, recalcular
total) encaja de forma natural en acciones explícitas, lo que la hace predecible
y **fácil de testear de forma aislada**, sin acoplarla a React. La persistencia se
resuelve con un `useEffect` que sincroniza el estado con `localStorage`. Para un
estado global tan acotado, esta solución nativa evita la sobreingeniería de añadir
una librería externa (Redux, Zustand…).

### Estilos: SASS (SCSS)

Dentro de las opciones permitidas (CSS, SASS o Styled Components) elegí **SCSS**.
Frente a CSS puro aporta:

- **Variables y mixins** para centralizar colores, medidas y _breakpoints_,
  garantizando consistencia y facilitando reproducir las medidas exactas del
  diseño de Figma.
- **Anidación** que refleja la jerarquía del marcado y mejora la legibilidad.
- **Partials + `@use`**: un fichero de estilos por componente/página, organizados
  en una arquitectura modular que **espeja la estructura de componentes** e
  importados desde un único `main.scss`.

La tipografía respeta la indicada en el enunciado: `font-family: Helvetica, Arial, sans-serif`.

---

## Arquitectura y estructura del proyecto

El proyecto separa responsabilidades **por capas** para mantener los componentes
centrados en la presentación y aislar la lógica de negocio y de datos. Los
componentes y sus estilos se agrupan **por dominio** (no en una carpeta plana),
con una carpeta `common/` para lo reutilizable entre vistas.

```
src/
├── main.jsx                  Punto de entrada (CartProvider + RouterProvider)
├── router.jsx                Rutas con carga diferida (lazy + Suspense)
│
├── pages/                    Vistas asociadas a rutas
│   ├── PhoneListPage.jsx
│   ├── PhoneDetailsPage.jsx
│   └── CartPage.jsx
│
├── layouts/
│   └── Layout.jsx            Header (logo + carrito) + <Outlet>
│
├── components/               Componentes de presentación, agrupados por dominio
│   ├── common/               Reutilizables entre vistas
│   │   ├── PhoneCard.jsx
│   │   └── BackBar.jsx
│   ├── layout/               Header
│   │   ├── Logo.jsx
│   │   └── CartIcon.jsx
│   ├── phone-list/
│   │   ├── PhoneSearch.jsx
│   │   └── PhoneGrid.jsx
│   ├── phone-details/
│   │   ├── PhoneSpecs.jsx
│   │   ├── StorageSelector.jsx
│   │   ├── ColorSelector.jsx
│   │   └── SimilarPhones.jsx
│   └── cart/
│       ├── CartItem.jsx
│       └── CartSummary.jsx
│
├── context/                  Estado global del carrito
│   ├── cart-context.js
│   └── CartProvider.jsx
├── reducers/
│   └── cart-reducer.js       Lógica del carrito (acciones + total)
│
├── hooks/                    Hooks reutilizables
│   ├── useCart.js            Acceso al contexto del carrito
│   ├── useFetch.js           data / loading / error genérico
│   ├── useDebounce.js        Retardo del término de búsqueda
│   └── useDragScroll.js      Arrastre del carrusel de similares
│
├── services/
│   └── api.js                Acceso a la API (fetch, cabecera x-api-key, errores)
├── mappers/
│   └── phone.js              Normaliza la respuesta de la API a modelos internos
├── utils/
│   └── array.js              Utilidades puras (uniqueBy)
│
├── styles/                   Arquitectura SCSS (espeja components/ por dominio)
│   ├── main.scss             Punto único de importación (@use)
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _utilities.scss
│   ├── components/{common,layout,phone-list,phone-details,cart}/
│   ├── pages/
│   └── layouts/
│
└── test/
    └── setup.js              Setup de Vitest (jest-dom)
```

### Decisiones clave de arquitectura

- **Capa de servicios + mappers**: `services/api.js` encapsula las llamadas
  (`fetch`, cabecera `x-api-key`, gestión de errores) y `mappers/phone.js`
  transforma la respuesta cruda a un modelo interno (`createPhone`,
  `createPhoneDetail`). Si la API cambia, el impacto queda contenido en una capa.
- **Filtrado y deduplicado**: el servicio reúne hasta 20 teléfonos únicos por
  `id` (la API puede devolver duplicados) usando la utilidad pura `uniqueBy`.
- **Hooks para separar lógica de la UI**: `useFetch`, `useDebounce`, `useCart` y
  `useDragScroll` extraen comportamiento reutilizable fuera de los componentes.
- **Reducer aislado y testeable**: la lógica del carrito vive en `cartReducer`,
  independiente de React.
- **Carga diferida de páginas** con `lazy` + `Suspense` para optimizar el bundle
  inicial (cada vista es un _chunk_ independiente).

---

## Flujo de datos

```
Componente / Página
        │  (usa)
        ▼
   hooks (useFetch / useCart)
        │
        ▼
   services/api.js  ──fetch + x-api-key──►  API REST externa
        │
        ▼
   mappers/phone.js  (normaliza la respuesta cruda)
        │
        ▼
   modelo interno  ──►  estado del componente / del carrito
```

El estado del **carrito** fluye de forma unidireccional:
`componente → dispatch(acción) → cartReducer → nuevo estado → re-render`, con
sincronización automática a `localStorage` en cada cambio.

---

## Accesibilidad

La accesibilidad se ha tenido en cuenta de forma transversal:

- **HTML semántico**: uso de `header`, `main`, `section`, `table`/`th[scope]`,
  listas para colecciones, etc.
- **Encabezado oculto** (`visually-hidden`) en el listado para no perder la
  jerarquía de títulos manteniendo el diseño.
- **Roles y estados ARIA**: `role="status"` / `role="alert"` para carga y errores,
  `aria-live` en el contador de resultados, `aria-pressed` en los selectores de
  color y almacenamiento, `aria-label` en controles e iconos sin texto visible.
- **Imágenes**: `alt` descriptivo en imágenes informativas y `alt=""` en las
  decorativas para que los lectores de pantalla las omitan.
- **Consola limpia**: sin errores ni advertencias en el navegador.

---

## Testing

Tests escritos con **Vitest** y **Testing Library** (entorno `jsdom`). El enfoque
prioriza la **lógica crítica** (negocio, datos y hooks):

- **Hooks**: `useFetch`, `useDebounce`, `useCart`.
- **Lógica de negocio**: `cart-reducer`.
- **Datos**: `mappers/phone`, `services/api`.
- **Utilidades**: `utils/array`.

```bash
npm test           # modo watch
npm test -- --run  # ejecución única (CI)
```

---

## Puesta en marcha

### Requisitos previos

- **Node.js 18+** (el challenge especifica Node 18).
- **npm**.

### Pasos

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea el fichero de variables de entorno a partir de la plantilla:

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` y asigna la API key a `VITE_PHONEAPI_KEY`
   (ver [API key](#variables-de-entorno-y-api-key)).

3. Arranca el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La app quedará disponible en `http://localhost:5173` (o el puerto que indique
   Vite).

---

## Variables de entorno y API key

Todas las llamadas a la API deben autenticarse mediante la cabecera **`x-api-key`**.
La clave se inyecta a través de la variable de entorno `VITE_PHONEAPI_KEY` y **no
se versiona** (`.env.local` está en `.gitignore`).

| Variable            | Descripción                                                  |
| ------------------- | ------------------------------------------------------------ |
| `VITE_PHONEAPI_KEY` | API key de la API de móviles. Se envía como `x-api-key`.     |

Usa la **clave proporcionada en el enunciado del challenge**:

```
VITE_PHONEAPI_KEY=<clave-del-enunciado>
```

Endpoint base utilizado:

```
https://prueba-tecnica-api-tienda-moviles.onrender.com/products
```

> ⚠️ Sin esta variable, las llamadas a la API fallarán y el catálogo aparecerá
> vacío.

---

## Scripts disponibles

| Comando            | Descripción                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Servidor de desarrollo con HMR.              |
| `npm run build`    | Build de producción (minificado) en `dist/`. |
| `npm run preview`  | Sirve localmente el build de producción.     |
| `npm run lint`     | Ejecuta ESLint sobre el proyecto.            |
| `npm run format`   | Formatea `src/` con Prettier.                |
| `npm test`         | Ejecuta la suite de tests con Vitest.        |

---

## Mejoras futuras

Líneas de evolución identificadas para próximas iteraciones:

- **SSR con Next.js** para homogeneizar el aspecto de las imágenes de producto
  (renderizado y optimización en servidor) y mejorar el SEO y el primer pintado.
- **Ampliar el testing de componentes**: añadir tests de integración de las vistas
  y de interacción de los selectores, complementando la cobertura actual de
  lógica y hooks.
- **Pulido de efectos UI** y refinamiento de detalles responsive frente al diseño de Figma.

