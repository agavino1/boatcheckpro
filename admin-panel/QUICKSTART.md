# BoatCheckPro Admin Panel - Quick Start Guide

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js v16 o superior
- npm o yarn

### Instalación (3 pasos)

```bash
# 1. Navegar al directorio del proyecto
cd BoatCheckPro-AdminPanel

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:3000**

---

## 📍 Navegación Rápida

| Página | URL | Función |
|--------|-----|---------|
| Dashboard | / | Panel principal con KPIs y gráficos |
| Técnicos | /technicians | Gestión de técnicos |
| Inspecciones | /inspections | Gestión de inspecciones |
| Pagos | /payments | Historial de pagos |
| Clientes | /clients | Gestión de clientes |
| Reportes | /reports | Analytics y reportes |

---

## 🎮 Cómo Usar Cada Módulo

### 1️⃣ Dashboard
- Ver KPIs en tiempo real
- Visualizar gráficos de ingresos e inspecciones
- Revisar últimas actividades

### 2️⃣ Técnicos
```
1. Crear técnico → Click en "Nuevo Técnico" → Completar formulario
2. Buscar → Usar barra de búsqueda
3. Editar → Click en icono "Edit" → Actualizar datos
4. Eliminar → Click en icono "Delete" → Confirmar
5. Ver rating → En la columna de Rating
```

### 3️⃣ Inspecciones
```
1. Crear inspección → Click en "Nueva Inspección" → Completar datos
2. Filtrar por estado → Usar dropdown de filtros
3. Buscar → Buscar por barco o cliente
4. Editar estado → Click en "Edit" → Cambiar estado
5. Asignar técnico → Editar inspección y asignar
```

### 4️⃣ Pagos
```
1. Ver pagos → Tabla lista todos los pagos
2. Cambiar estado → Seleccionar nuevo estado en el dropdown
3. Crear pago → Click en "Nuevo Pago"
4. Filtrar → Por estado del pago
5. Buscar → Por cliente o número de invoice
6. Exportar → Click en "Exportar CSV"
```

### 5️⃣ Clientes
```
1. Listar clientes → Tabla con todos los clientes
2. Crear cliente → Click en "Nuevo Cliente"
3. Bloquear → Click en icono de candado
4. Desbloquear → Click en icono de desbloqueo
5. Ver estadísticas → En cada fila
6. Exportar → Click en "Exportar CSV"
```

### 6️⃣ Reportes
```
1. Seleccionar tipo → Click en botón de tipo de reporte
2. Ver gráficos → Gráficos interactivos se actualizan
3. Exportar → Click en "Exportar CSV"
4. Imprimir → Click en "Imprimir"
```

---

## 📝 Datos Simulados

El proyecto incluye datos simulados que puedes:

### Técnicos
- Carlos Rodríguez (Hull Inspection, 4.8⭐)
- María García (Engine & Systems, 4.9⭐)
- Juan Martínez (Electrical Systems, 4.6⭐)
- Ana Fernández (Safety Equipment, 4.7⭐)
- Pedro López (Navigation Systems, 4.5⭐)

### Clientes
- Roberto Ferrari (8 inspecciones, €3,450 gastados)
- Isabella Rossi (5 inspecciones, €2,180 gastados)
- Carmen López (6 inspecciones, €1,920 gastados)
- Marco Rossi (3 inspecciones, €1,050 gastados)
- Giuseppe Pellegrino (2 inspecciones, €850 gastados)
- Sofia Lombardi (1 inspección, €450 gastados)

### Inspecciones
- 6 inspecciones en diferentes estados
- Precios de €320 a €600
- Tipos: Annual, Pre-purchase, Insurance, Seasonal

### Pagos
- 5 pagos registrados
- Métodos: Credit Card, Bank Transfer, PayPal
- Estados: Completed, Pending, Refunded

---

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (hot reload)

# Producción
npm run build        # Compila el proyecto
npm start            # Inicia servidor de producción

# Linting
npm run lint         # Verifica código con ESLint
```

---

## 🎨 Personalización

### Cambiar Colores
Editar `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'brand-blue': '#0066CC',    // Color principal
      'brand-dark': '#1A1A2E',    // Color oscuro
      'brand-light': '#F5F7FA',   // Color claro
    },
  },
},
```

### Agregar Nueva Página
1. Crear archivo en `pages/nueva-pagina.tsx`
2. Agregar menú en `components/Sidebar.tsx`
3. Importar datos de `lib/mockData.ts`
4. Usar componentes de `components/`

---

## 📋 Estructura de Datos

### Técnico
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  totalInspections: number;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
}
```

### Inspección
```typescript
{
  id: string;
  boatName: string;
  clientId: string;
  clientName: string;
  techniciansId?: string;
  technicianName?: string;
  inspectionType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  scheduledDate: string;
  completedDate?: string;
  price: number;
  notes?: string;
}
```

### Pago
```typescript
{
  id: string;
  inspectionId: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  paymentMethod: string;
  date: string;
  invoiceNumber: string;
}
```

### Cliente
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  totalInspections: number;
  totalSpent: number;
  status: 'active' | 'blocked' | 'inactive';
  joinDate: string;
  lastInspectionDate?: string;
}
```

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
npm install
```

### Puerto 3000 ocupado
```bash
npm run dev -- -p 3001  # Usar puerto 3001
```

### Cambios no se actualizan
- Limpiar caché: Ctrl+Shift+Delete (Chrome)
- Reiniciar servidor: Ctrl+C y npm run dev

---

## 💡 Tips y Trucos

1. **Búsqueda en tiempo real**: Los resultados se filtran mientras escribes
2. **Cambiar estado rápidamente**: Usa los dropdowns en lugar de editar
3. **Exportar datos**: Botón "Exportar CSV" disponible en varios módulos
4. **Imprimir reportes**: Usar botón "Imprimir" para reportes
5. **Menú colapsable**: Click en el ícono de menú para contraer/expandir

---

## 📞 Soporte

Para reportar problemas o sugerencias:
1. Revisar el código en `pages/` y `components/`
2. Verificar `lib/types.ts` para tipos TypeScript
3. Consultar datos en `lib/mockData.ts`

---

## 🚀 Próximas Pasos

1. **Integrar Backend**: Conectar APIs reales en lugar de mock data
2. **Autenticación**: Implementar login y JWT
3. **Mejorar UX**: Agregar más animaciones
4. **Mobile App**: Crear versión móvil
5. **Dark Mode**: Agregar tema oscuro

---

**¡Disfruta usando BoatCheckPro Admin Panel! 🎉**

v1.0.0 | 2026-02-19
