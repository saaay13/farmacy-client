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
├── public/
│   ├── vite.svg
│   └── img/
│       ├── home.png
│       └── avatar/
│           
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── atoms/          # Componentes básicos indivisibles
│   │   │   ├── Button/
│   │   │   │   └── Button.tsx
│   │   │   ├── Icon/
│   │   │   │   └── UserIcon.tsx
│   │   │   ├── Input/
│   │   │   │   └── Input.tsx
│   │   │   ├── Toggle/
│   │   │   │   └── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   ├── molecules/      # Combinaciones simples de átomos
│   │   │   ├── Login/
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── Menu/
│   │   │   │   └── UserMenu.tsx
│   │   │   └── index.ts
│   │   ├── organisms/      # Secciones complejas
│   │   │   ├── Footer/
│   │   │   │   └── Footer.tsx
│   │   │   ├── Header/
│   │   │   │   └── Header.tsx
│   │   │   ├── Login/
│   │   │   │   └── LoginCard.tsx
│   │   │   ├── Sidebar/
│   │   │   │   └── Sidebar.tsx
│   │   │   └── index.ts
│   │   └── templates/      # Vistas completas
│   │       └── MainLayout/
│   │           └── MainLayout.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBanch.ts
│   │   ├── useCategories.ts
│   │   ├── useProducts.ts
│   │   └── useTheme.ts
│   ├── pages/
│   │   ├── Banch/
│   │   │   └── BanchPage.tsx
│   │   ├── Categories/
│   │   │   └── CategoriesPage.tsx
│   │   ├── Home/
│   │   │   └── HomePage.tsx
│   │   ├── Login/
│   │   │   └── LoginPage.tsx
│   │   └── Products/
│   │       └── ProductsPage.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── sugerencia.txt
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
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

## 📋 Próximos Pasos

- Implementar autenticación completa
- Desarrollar páginas de productos y categorías
- Agregar gestión de inventario
- Integrar alertas y promociones

