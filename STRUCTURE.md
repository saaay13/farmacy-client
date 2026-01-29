# 🌳 Estructura Jerárquica - Farmacy Client

Jerarquía completa de archivos y carpetas con su respectiva función.

```text
/cliente
├── public/                     # Archivos estáticos servidos directamente
│   └── img/                    # [Contenido omitido] (Imágenes y Avatares)
└── src/                        # Núcleo del código fuente
    ├── main.tsx                # Punto de entrada de React (Montaje del DOM)
    ├── App.tsx                 # Orquestador de rutas y seguridad (Global)
    ├── index.css               # Estilos globales y tokens de diseño
    ├── assets/                 # Recursos gráficos de la aplicación
    │   └── react.svg           # Logo de React
    ├── services/               # Capa de comunicación con el exterior
    │   └── api.ts              # Cliente Fetch centralizado para el Backend
    ├── context/                # Proveedores de estado global
    │   ├── AuthContext.tsx     # Gestión de sesión, roles y usuario
    │   └── CartContext.tsx     # Gestión de carrito y procesos de compra
    ├── hooks/                  # Lógica de negocio reutilizable
    │   ├── useAuth.ts          # Consumo fácil de identidad de usuario
    │   ├── useCart.ts          # Consumo fácil de funciones del carrito
    │   └── admin/              # Lógica exclusiva para gestión interna
    │       ├── useAdminUsers.ts    # Operaciones CRUD de personal
    │       ├── useInventory.ts    # Operaciones de stock y productos
    │       └── usePOS.ts          # Lógica de ventas en mostrador
    ├── pages/                  # Vistas completas de la aplicación
    │   ├── Login/              # Módulo de acceso
    │   │   ├── LoginPage.tsx      # Pantalla de inicio de sesión
    │   │   └── RegisterPage.tsx   # Pantalla de creación de cuenta
    │   ├── admin/              # Módulo de administración
    │   │   ├── DashboardPage.tsx  # Métricas y estadísticas generales
    │   │   ├── UsersPage.tsx      # Panel de gestión de empleados
    │   │   ├── InventoryPage.tsx  # Gestión de productos y lotes
    │   │   └── PointOfSalePage.tsx # Interfaz de venta rápida (POS)
    │   └── cliente/            # Módulo de tienda pública
    │       ├── HomePage.tsx       # Inicio con banners y categorías
    │       ├── ProductsPage.tsx   # Catálogo con filtros dinámicos
    │       └── CheckoutPage.tsx   # Formulario de pago y finalización
    └── components/             # Arquitectura de componentes (Atomic Design)
        ├── atoms/              # Piezas fundamentales (UI pura)
        │   ├── Button.tsx         # Botón estándar de la marca
        │   ├── Input.tsx          # Campo de texto con validaciones
        │   ├── Badge.tsx          # Etiquetas de estado y colores
        │   └── ThemeToggle.tsx    # Cambio de modo claro/oscuro
        ├── molecules/          # Composiciones de átomos con lógica
        │   ├── LoginForm.tsx      # Lógica de entrada de datos de acceso
        │   ├── RegisterForm.tsx   # Lógica de registro y selector de avatares
        │   ├── UserModal.tsx      # Ventana emergente de gestión de datos
        │   └── ProductCard.tsx    # Tarjeta de producto para el catálogo
        ├── organisms/          # Secciones globales y complejas
        │   ├── Header.tsx         # Navegación y perfil de usuario
        │   ├── Footer.tsx         # Información legal y enlaces
        │   ├── AdminSidebar.tsx   # Panel de control lateral para admin
        │   └── CartDrawer.tsx     # Carrito lateral persistente
        └── templates/          # Diseños estructurales de página
            ├── MainLayout.tsx     # Envoltorio para la tienda
            └── AdminLayout.tsx    # Envoltorio para la administración
```
├── INSTALL.md                  # Guía de instalación y arranque rápido
├── README.md                   # Documentación principal del proyecto
├── STRUCTURE.md                # (Este archivo) Mapa detallado del proyecto
├── package.json                # Gestión de dependencias y scripts de ejecución
├── vite.config.ts              # Configuración del empaquetador Vite + Tailwind v4
├── tsconfig.json               # Configuración de reglas de TypeScript
├── eslint.config.js            # Reglas de calidad y estilo de código
├── index.html                  # Plantilla base HTML de la aplicación SPA
---
*Este árbol representa la infraestructura viva del proyecto Farmacy Siempre Vivo.*
