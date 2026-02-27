# BoatCheckPro Admin Panel - Index & Navigation

## 📑 Índice de Contenidos

### 📄 Documentación Principal
| Documento | Descripción |
|-----------|------------|
| **[README.md](README.md)** | Descripción completa del proyecto, características e instalación |
| **[QUICKSTART.md](QUICKSTART.md)** | Guía rápida de inicio en 3 pasos y tutorial de uso |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Resumen ejecutivo del proyecto con estadísticas |
| **[FEATURES.md](FEATURES.md)** | Checklist completo de todas las características |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Guía de deployment a producción |
| **[INDEX.md](INDEX.md)** | Este archivo de navegación |

---

## 🗂️ Estructura del Código

### 📄 Páginas (Routes)

#### Dashboard (`pages/index.tsx`)
- KPI Cards con métricas principales
- LineChart de ingresos por mes
- PieChart de inspecciones por estado
- Lista de últimas inspecciones
- Lista de últimos pagos
- **Líneas**: ~250

#### Gestión de Técnicos (`pages/technicians.tsx`)
- Tabla con listado de técnicos
- Búsqueda por nombre/email
- CRUD completo (Crear, Editar, Eliminar)
- Modal para crear/editar
- Visualización de rating y especialización
- **Líneas**: ~350

#### Gestión de Inspecciones (`pages/inspections.tsx`)
- Tabla con listado de inspecciones
- Búsqueda y filtro por estado
- CRUD completo
- Modal para crear/editar
- Cambio dinámico de estado
- Información de precios
- **Líneas**: ~380

#### Gestión de Pagos (`pages/payments.tsx`)
- Tabla con historial de pagos
- Búsqueda y filtro por estado
- CRUD completo
- Resumen de ingresos (Total, Completados, Pendientes)
- Selector de estado dropdown
- Exportación a CSV
- **Líneas**: ~400

#### Gestión de Clientes (`pages/clients.tsx`)
- Tabla con listado de clientes
- Búsqueda por nombre/email
- CRUD completo
- Bloqueo/Desbloqueo de clientes
- Estadísticas por cliente
- Exportación a CSV
- **Líneas**: ~380

#### Reportes & Analytics (`pages/reports.tsx`)
- Selector de tipo de reporte (4 tipos)
- Múltiples gráficos (BarChart, PieChart)
- Estadísticas y resúmenes
- Exportación a CSV
- Opción de impresión
- **Líneas**: ~430

#### App Principal (`pages/_app.tsx`)
- Configuración principal de Next.js
- Layout wrapper
- **Líneas**: ~10

---

### 🧩 Componentes Reutilizables

#### Layout (`components/Layout.tsx`)
- Wrapper principal de la aplicación
- Contiene Sidebar + Header + Main content
- **Líneas**: ~25

#### Sidebar (`components/Sidebar.tsx`)
- Menú lateral colapsable
- Navegación entre páginas
- Logo y branding
- Logout button
- **Líneas**: ~100

#### Header (`components/Header.tsx`)
- Barra superior con logo
- Búsqueda global
- Notificaciones
- Perfil de usuario
- **Líneas**: ~90

#### Card Components (`components/Card.tsx`)
- Card principal (bg-white, shadow, border)
- CardHeader con border-bottom
- CardTitle para títulos
- CardContent para contenido
- **Líneas**: ~50

#### KPI Card (`components/KPICard.tsx`)
- Card especial para KPIs
- Icono personalizado
- Valor principal
- Trend (up/down)
- 4 variantes de color
- **Líneas**: ~60

---

## 📚 Librerías de Soporte

### Tipos TypeScript (`lib/types.ts`)
```typescript
export interface Technician { ... }  // Técnico
export interface Inspection { ... }  // Inspección
export interface Payment { ... }     // Pago
export interface Client { ... }      // Cliente
export interface DashboardStats { }  // Estadísticas dashboard
export interface Report { ... }      // Reporte
```

### Mock Data (`lib/mockData.ts`)
- `mockTechnicians`: 5 técnicos con detalles
- `mockInspections`: 6 inspecciones
- `mockPayments`: 5 pagos
- `mockClients`: 6 clientes
- `mockDashboardStats`: Estadísticas principales

### Utilidades de Exportación (`utils/export.ts`)
- `exportToCSV()`: Exportar datos a CSV
- `exportToPDF()`: Exportar a PDF con html2canvas
- `formatCurrency()`: Formato de moneda (EUR)
- `formatDate()`: Formato de fecha (DD/MM/YYYY)
- `formatDateTime()`: Formato de fecha y hora

---

## 🎨 Estilos

### Tailwind Configuration (`tailwind.config.js`)
- Brand colors configurados
- Responsive breakpoints
- Custom utilities

### Global Styles (`styles/globals.css`)
- Reset de estilos
- Tailwind imports
- Custom animations (slideIn, fadeIn)
- Scrollbar styling

### PostCSS (`postcss.config.js`)
- Tailwind CSS processing
- Autoprefixer

---

## ⚙️ Configuración

### Package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### TypeScript Config (`tsconfig.json`)
- Target: ES2020
- Module: ESNext
- JSX: preserve
- Strict mode: true

### Next.js Config (`next.config.js`)
- React strict mode habilitado
- Optimizaciones automáticas

---

## 🎯 Páginas y URLs

| URL | Componente | Descripción |
|-----|-----------|------------|
| `/` | `pages/index.tsx` | Dashboard principal |
| `/technicians` | `pages/technicians.tsx` | Gestión de técnicos |
| `/inspections` | `pages/inspections.tsx` | Gestión de inspecciones |
| `/payments` | `pages/payments.tsx` | Gestión de pagos |
| `/clients` | `pages/clients.tsx` | Gestión de clientes |
| `/reports` | `pages/reports.tsx` | Reportes y analytics |

---

## 📊 Módulos de Datos

### Estados de Inspección
```
pending       → Pendiente
in-progress   → En progreso
completed     → Completada
cancelled     → Cancelada
```

### Estados de Pago
```
pending   → Pendiente
completed → Completado
refunded  → Reembolsado
failed    → Fallido
```

### Estados de Técnico
```
active    → Activo
inactive  → Inactivo
on-leave  → De permiso
```

### Estados de Cliente
```
active    → Activo
blocked   → Bloqueado
inactive  → Inactivo
```

---

## 📦 Dependencias Principales

| Dependencia | Versión | Uso |
|------------|---------|-----|
| React | ^18.2.0 | Framework |
| Next.js | ^14.0.0 | Full-stack framework |
| TypeScript | ^5.0.0 | Type safety |
| Tailwind CSS | ^3.3.0 | Styling |
| Recharts | ^2.10.0 | Gráficos |
| Lucide React | ^0.294.0 | Iconos |
| date-fns | ^2.30.0 | Manejo de fechas |
| jsPDF | ^2.5.0 | Exportación PDF |
| html2canvas | ^1.4.1 | Captura de DOM |
| papaparse | ^5.4.1 | Parsing CSV |

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir navegador
open http://localhost:3000
```

---

## 🔄 Flujo de Datos

```
User Input
    ↓
Component State (useState)
    ↓
Event Handler
    ↓
Update Mock Data
    ↓
Re-render Component
    ↓
Updated UI
```

---

## 💾 Funcionalidades CRUD por Módulo

### ✅ Técnicos
- **Create**: Modal form
- **Read**: Tabla con búsqueda
- **Update**: Modal edit
- **Delete**: Confirmación

### ✅ Inspecciones
- **Create**: Modal form
- **Read**: Tabla con filtros
- **Update**: Modal edit con estado
- **Delete**: Confirmación

### ✅ Pagos
- **Create**: Modal form
- **Read**: Tabla con búsqueda
- **Update**: Dropdown estado
- **Delete**: N/A (solo lectura)

### ✅ Clientes
- **Create**: Modal form
- **Read**: Tabla con búsqueda
- **Update**: Modal edit
- **Delete**: Confirmación + Block/Unblock

---

## 🎨 Componentes Visuales

### Cards
- `Card` - Container principal
- `CardHeader` - Encabezado con border
- `CardTitle` - Título
- `CardContent` - Contenido

### KPIs
- `KPICard` - Card especializada para métricas
  - 4 variantes de color
  - Icono personalizable
  - Trend opcional

### Elementos UI
- Tablas responsivas
- Modales
- Botones de acción
- Badges de estado
- Dropdowns/Selects
- Input fields
- Buscadores

---

## 🔐 Validación y Seguridad

- ✅ Confirmación antes de eliminar
- ✅ Validación de formularios
- ✅ TypeScript type checking
- ✅ XSS protection via React
- ✅ Input sanitization

---

## 📈 Gráficos Disponibles

1. **LineChart** - Ingresos por mes (Dashboard, Reportes)
2. **BarChart** - Ingresos vs objetivo (Reportes ingresos)
3. **BarChart** - Inspecciones por técnico (Reportes técnicos)
4. **BarChart** - Actividad de clientes (Reportes clientes)
5. **PieChart** - Estado de inspecciones (Dashboard)
6. **PieChart** - Métodos de pago (Reportes pagos)

---

## 📱 Breakpoints Responsive

```css
Mobile:  320px - 640px
Tablet:  641px - 1024px
Desktop: 1025px+
```

---

## 📝 Convenciones de Código

- **Componentes**: PascalCase
- **Funciones**: camelCase
- **Archivos de componentes**: PascalCase.tsx
- **Archivos de páginas**: lowercase.tsx
- **Variables de estado**: camelCase
- **Constantes**: UPPER_CASE

---

## ✨ Características Especiales

- **Sidebar colapsable** - Menú que se puede contraer
- **Búsqueda en tiempo real** - Filtra mientras escribes
- **Filtros dinámicos** - Combinar búsqueda + estado
- **Modal windows** - CRUD en modales
- **Status badges** - Colores según estado
- **Exportación CSV** - Descargar datos
- **Impresión** - Imprimir reportes
- **Animaciones** - Transiciones suaves
- **Notificaciones** - Bell icon ready

---

## 🎓 Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [TypeScript](https://www.typescriptlang.org)

---

## 📞 Soporte y Contacto

Para información específica de cada componente o módulo, consultar:
1. El archivo correspondiente (comentarios en código)
2. La documentación en markdown
3. El archivo types.ts para estructuras de datos

---

**Última actualización**: 2026-02-19  
**Versión**: 1.0.0  
**Estado**: ✅ Completo y Funcional
