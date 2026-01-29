# Store Farmacy - Frontend

Sistema de gestión integral para farmacias multisucursales - Cliente Web desarrollado con React, TypeScript y Vite.

## 🛠️ Tecnologías y Versiones

### Núcleo
- **Framework**: React ^19.2.0
- **Lenguaje**: TypeScript ~5.9.3
- **Herramienta de Desarrollo**: Vite ^7.2.4
- **Estilos**: TailwindCSS ^4.1.18 (vía @tailwindcss/vite)
- **Iconos**: Lucide React ^0.563.0
- **Enrutamiento**: React Router DOM ^7.13.0

### Desarrollo
- **Linter**: ESLint ^9.39.1 con plugins para React
- **Tipos**: @types/react ^19.2.5, @types/react-dom ^19.2.3, @types/node ^24.10.1
- **Plugins Vite**: @vitejs/plugin-react ^5.1.1

## � Arquitectura del Proyecto

### 📁 Raíz
- **INSTALL.md**: Guía paso a paso para instalación y arranque.
- **README.md**: Documentación técnica principal (este archivo).
- **package.json**: Definición de scripts y dependencias del ecosistema.
- **index.html**: Punto de anclaje de la Single Page Application.

### 📁 public/
- **img/**: Almacén de activos visuales, productos y el catálogo de 28 avatares.

### 📁 src/components (Atomic Design)
- **atoms/**: Componentes de interfaz mínima como `Button`, `Input`, `Badge` y `UserIcon`.
- **molecules/**: Lógica de UI combinada: `LoginForm`, `RegisterForm`, `UserModal`, `StatCard` y `ProductCard`.
- **organisms/**: Secciones globales: `Header`, `Footer`, `CartDrawer`, `AdminSidebar` y `ProductGrid`.
- **templates/**: Estructuras de diseño base como `MainLayout` y `AdminLayout`.

### 📁 src/context/ (Estado Global)
- **AuthContext.tsx**: Gestión centralizada de sesión, roles y persistencia de usuario.
- **CartContext.tsx**: Motor del carrito de compras y persistencia local.

### 📁 src/hooks/
- **admin/**: Lógica operativa para `useInventory`, `usePOS`, `useAdminUsers` y estadísticas.
- **useAuth.ts**: Hook de consumo para autenticación.
- **useCart.ts**: Hook de consumo para el carrito.

### 📁 src/pages/
- **admin/**: Cuadros de mando operativos facilitando `Dashboard`, `Inventory`, `Users` y `POS`.
- **cliente/**: Experiencia de compra pública: `Home`, `Products` y `Checkout`.
- **Login/**: Vistas de acceso y registro (`LoginPage`, `RegisterPage`).

### 📁 src/services/
- **api.ts**: Capa de abstracción para todas las peticiones fetch al servidor backend.

### 📁 src/ Core
- **App.tsx**: Orquestador principal de rutas y guardias de seguridad.
- **index.css**: Definición de tokens de diseño y utilidades personalizadas (Tailwind v4).
- **main.tsx**: Punto de entrada de React.

## 🚀 Cómo Crear y Configurar el Proyecto

### 1. Crear el Proyecto
```bash
# Crear proyecto con Vite + React + TypeScript
npm create vite@latest client -- --template react-ts
cd client
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Instalar Librerías Adicionales
```bash
# TailwindCSS v4.1.18
npm install @tailwindcss/vite tailwindcss

# React Router DOM v7.13.0
npm install react-router-dom

# Lucide React para iconos v0.563.0
npm install lucide-react

# Dependencias de desarrollo
npm install -D @types/node typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

### 4. Configurar TailwindCSS
En `vite.config.ts`, agregar el plugin:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

En `index.css`:
```css
@import "tailwindcss";
```

### 5. Configurar ESLint
El `eslint.config.js` ya está configurado con reglas para React y TypeScript.

## ▶️ Cómo Ejecutar el Proyecto

### Desarrollo
```bash
npm run dev
```
El servidor de desarrollo estará disponible en `http://localhost:5173`

### Construcción para Producción
```bash
npm run build
```

### Vista Previa de Producción
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🎨 Patrón de Diseño

### Atomic Design
Organizamos los componentes siguiendo el patrón de Atomic Design:

- **Átomos**: Componentes básicos (Button, Input)
- **Moléculas**: Combinaciones simples (FormField)
- **Organismos**: Secciones complejas (ProductGrid, Header)
- **Páginas**: Vistas completas (Products, Home)

### Convenciones de Código
- **Lenguaje**: TypeScript obligatorio
- **Componentes**: Funcionales con hooks
- **Estilos**: TailwindCSS para utilidades
- **Nombres**: En inglés para archivos y variables
- **Imports**: Usar `import type` para tipos

## 🔗 Conexión con el Backend

El frontend se conecta al backend en `http://localhost:3001` (configurable en `src/services/api.ts`).

Asegúrate de que el servidor backend esté ejecutándose antes de usar la aplicación.

## ✨ Características Implementadas

### Vista de Cliente
- **Catálogo Inteligente**: Filtrado dinámico de productos activos y permitidos sin receta.
- **Identidad Visual Premium**: Diseño cohesivo con "Hero Sections" inclinados y estética moderna.
- **Carrito de Compras**: Gestión de cantidades, persistencia local y cálculos de subtotales/totales precisos.
- **Flujo de Pago (Checkout)**: Interfaz de 3 pasos con validación, diseño envolvente y página de éxito dedicada.

### Gestión de Usuarios y Seguridad
- **Auto-Registro de Clientes**: Flujo de creación de cuenta público con asignación automática de rol `cliente`.
- **Selector de Avatares Premium**: Sistema de selección de personajes (28 opciones) con carrusel minimalista y paginación reactiva.
- **Login Inteligente**: Autenticación persistente con redirección basada en roles y estado de carga.
- **Header Dinámico**: Integración de perfil de usuario con avatar circular y menú desplegable premium.

### Panel de Administración (Staff)
- **Gestión de Usuarios (CRUD)**: Interfaz completa para administradores para crear, editar y dar de baja al personal (Farmacéuticos, Vendedores).
- **Modales Dinámicos**: Experiencia fluida para gestión de datos sin recargas de página utilizando Atomic Design.

## 📋 Próximos Pasos (Fase Operativa)

- [x] Implementar gestión de usuarios y personal.
- [ ] Desarrollar Dashboard con métricas y alertas de vencimiento (Staff).
- [ ] Implementar gestión de inventario completa con carga de lotes.
- [ ] Sistema de aprobación de promociones para productos cercanos a expirar.
- [ ] Reportes de ventas y stock por sucursal.
