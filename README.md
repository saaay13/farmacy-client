# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Estructura del Proyecto: Store Farmacy
Se ha creado la estructura base del proyecto siguiendo la arquitectura cliente-servidor solicitada.

Estructura de Directorios
d:/store-farmacy
├── client/                 # Frontend (Vite + React + TypeScript)
│   ├── src/
│   │   ├── components/     # Atomic Design
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   └── templates/
│   │   ├── pages/
│   │   └── index.css       # Configurado con TailwindCSS v4.1
│   └── vite.config.ts      # Plugin de Tailwind integrado
│
└── server/                 # Backend (Node.js + Express + TypeScript)
    ├── src/
    │   └── index.ts        # Punto de entrada básico
    ├── package.json
    └── tsconfig.json
Cómo Ejecutar
Cliente (Frontend)
Navega a la carpeta del cliente: cd client
Instala dependencias (ya realizado): npm install
Inicia el servidor de desarrollo: npm run dev
Servidor (Backend)
Navega a la carpeta del servidor: cd server
Instala dependencias (ya realizado): npm install
Compila y ejecuta (puedes usar ts-node o compilar): npx ts-node src/index.ts
Detalles Técnicos
Frontend: React 18, TypeScript, TailwindCSS v4.1 (vía @tailwindcss/vite).
Backend: Express 4, TypeScript, CORS habilitado.
Diseño: Estructura de carpetas lista para Atomic Design (Atomos, Moléculas, Organismos).

