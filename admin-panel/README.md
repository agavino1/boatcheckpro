# BoatCheckPro - Admin Panel Dashboard

Panel administrativo profesional para la gestión de inspecciones de barcos y la plataforma SaaS BoatCheckPro.

## 🎯 Características

### 📊 Dashboard Principal
- **KPIs en tiempo real**: Ingresos totales, inspecciones completadas, técnicos activos, tasa de finalización
- **Gráficos interactivos**: 
  - Ingresos mensuales (LineChart)
  - Estado de inspecciones (PieChart)
- **Últimas actividades**: Inspecciones recientes y pagos procesados

### 👨‍🔧 Gestión de Técnicos
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- 🔍 Búsqueda en tiempo real
- ⭐ Rating y reviews del técnico
- 📊 Historial de inspecciones completadas
- 🏷️ Estados: Activo, De permiso, Inactivo
- 🔧 Gestión de especialidades

### 🔍 Gestión de Inspecciones
- ✅ CRUD completo
- 🔍 Búsqueda y filtros avanzados (por estado, fecha, precio)
- 📝 Detalles completos de inspección
- 🔄 Cambio de estado (Pendiente → En progreso → Completada)
- 👨‍🔧 Asignación de técnicos
- 💰 Información de precios

### 💳 Gestión de Pagos
- 📋 Historial completo de transacciones
- 📑 Invoices detalladas
- 🔄 Gestión de reembolsos
- 📊 Resumen de ingresos (Total, Completados, Pendientes)
- 🔄 Cambio de estado de pago
- 📁 Exportación a CSV

### 👥 Gestión de Usuarios (Clientes)
- 📋 Lista completa de clientes
- 🔍 Búsqueda y filtros
- 🚫 Bloqueo/Desbloqueo de clientes
- 📊 Estadísticas: Total gastado, inspecciones realizadas
- 📅 Seguimiento de última inspección
- 📁 Exportación de lista de clientes

### 📈 Reportes & Analytics
- 📊 Reportes de ingresos por período
- 👨‍🔧 Inspecciones por técnico con ratings
- 👥 Clientes más activos
- 💳 Análisis de métodos de pago
- 📥 Exportación a CSV
- 🖨️ Opción de impresión

## 🛠️ Tech Stack

```json
{
  "frontend": ["React 18", "Next.js 14", "TypeScript"],
  "styling": ["Tailwind CSS", "Lucide Icons"],
  "charts": ["Recharts"],
  "utilities": ["date-fns", "jsPDF", "html2canvas", "papaparse"]
}
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm build

# Iniciar servidor de producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
BoatCheckPro-AdminPanel/
├── pages/
│   ├── _app.tsx          # Configuración principal Next.js
│   ├── index.tsx         # Dashboard principal
│   ├── technicians.tsx   # Gestión de técnicos
│   ├── inspections.tsx   # Gestión de inspecciones
│   ├── payments.tsx      # Gestión de pagos
│   ├── clients.tsx       # Gestión de clientes
│   └── reports.tsx       # Reportes y analytics
├── components/
│   ├── Layout.tsx        # Layout principal
│   ├── Sidebar.tsx       # Menú lateral
│   ├── Header.tsx        # Barra superior
│   ├── Card.tsx          # Componente Card reutilizable
│   └── KPICard.tsx       # Cards de KPI
├── lib/
│   ├── types.ts          # Definición de tipos TypeScript
│   └── mockData.ts       # Datos simulados
├── utils/
│   └── export.ts         # Funciones de exportación y formato
├── styles/
│   └── globals.css       # Estilos globales
└── public/               # Archivos estáticos
```

## 🚀 Funcionalidades CRUD

### Técnicos
```typescript
// Crear, editar, eliminar técnicos
// Cambiar estado: activo/inactivo/de permiso
// Buscar por nombre o email
```

### Inspecciones
```typescript
// Crear inspecciones con detalles completos
// Actualizar estado y asignar técnico
// Filtrar por estado, fecha y precio
// Búsqueda por nombre de barco o cliente
```

### Pagos
```typescript
// Registrar nuevos pagos
// Cambiar estado: pendiente/completado/reembolsado
// Filtrar por estado y cliente
// Ver detalles de invoice
```

### Clientes
```typescript
// Crear nuevos clientes
// Bloquear/desbloquear clientes
// Ver estadísticas de cliente
// Exportar lista de clientes
```

## 📊 Gráficos Disponibles

1. **LineChart**: Ingresos por mes
2. **BarChart**: Ingresos vs Objetivo, Inspecciones por técnico
3. **PieChart**: Estado de inspecciones, Métodos de pago

## 📤 Funciones de Exportación

### CSV
- Exportar técnicos, inspecciones, pagos, clientes
- Exportar reportes específicos
- Formato compatible con Excel/Sheets

### PDF
- Impresión directa del navegador
- Exportación de reportes a PDF (usando html2canvas + jsPDF)

## 🎨 Diseño

- **Interfaz moderna y profesional**
- **Responsive design**: Funciona en desktop, tablet y móvil
- **Dark sidebar** con navegación intuitiva
- **Tema de colores**: Azul principal (#0066CC) con acentos verdes/rojos
- **Animaciones suaves**: Transiciones y efectos visuales

## 📱 Componentes Responsivos

- Grid layout adaptable
- Tablas scrollables en móvil
- Formularios optimizados para tacto
- Menú colapsable en sidebar

## 🔐 Datos Simulados

El proyecto incluye datos simulados (mock data) para:
- 5 técnicos con detalles completos
- 6 inspecciones en diferentes estados
- 5 pagos con diferentes métodos
- 6 clientes con historial

Todos los datos se gestionan en memoria (estado local).

## 🔄 Estados de Inspección

- `pending`: Pendiente de realizar
- `in-progress`: Actualmente en ejecución
- `completed`: Completada
- `cancelled`: Cancelada

## 💰 Estados de Pago

- `pending`: Pendiente de cobro
- `completed`: Pagado completamente
- `refunded`: Reembolsado
- `failed`: Falló la transacción

## 👥 Estados de Cliente

- `active`: Cliente activo
- `blocked`: Cliente bloqueado
- `inactive`: Cliente inactivo

## 📝 Próximas Mejoras

- [ ] Integración con backend real
- [ ] Autenticación de usuarios
- [ ] Subida de fotos/documentos
- [ ] Sistema de notificaciones
- [ ] Calendario de inspecciones
- [ ] Generación de reportes automáticos
- [ ] Dashboard en tiempo real
- [ ] Integración de pagos (Stripe/PayPal)

## 📞 Contacto

BoatCheckPro Admin Panel v1.0.0

---

**Desarrollado con ❤️ para BoatCheckPro**
