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

## 📁 Estructura del Proyecto

```
client/
├── public/                 # Assets estáticos (imágenes, logos)
├── src/
│   ├── auth/               # Guardias de seguridad y lógica de acceso
│   ├── components/
│   │   ├── atoms/          # Componentes básicos (Botones, Inputs)
│   │   ├── molecules/      # Componentes combinados (ProductCard, CartItem)
│   │   ├── organisms/      # Secciones complejas (Header, CartDrawer, CheckoutForm)
│   │   └── index.ts
│   ├── context/            # Estado global (Auth, Cart)
│   ├── hooks/              # Hooks personalizados
│   ├── pages/
│   │   ├── admin/          # Páginas de administración
│   │   └── cliente/        # Páginas de la vista de cliente
│   ├── services/           # Conexión con API backend
│   ├── App.tsx             # Enrutamiento y árbol principal
│   └── main.tsx            # Punto de entrada
```

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

### Seguridad y Estructura
- **Rutas Protegidas**: Sistema de guardias para restringir acceso a secciones privadas (Checkout, Admin).
- **Gestión de Sesión**: AuthContext con inicialización síncrona y manejo de roles.

## 📋 Próximos Pasos (Fase Administrador)

- [ ] Desarrollar Dashboard con métricas y alertas de vencimiento (Staff).
- [ ] Implementar gestión de inventario completa con carga de lotes.
- [ ] Sistema de aprobación de promociones para productos cercanos a expirar.
- [ ] Reportes de ventas y stock por sucursal.
