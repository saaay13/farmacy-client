# 🌳 Estructura Jerárquica - Farmacy Client

Listado jerárquico de carpetas y archivos.

```text
/cliente
├── public/                     # Archivos estáticos
│   └── img/                    # Activos visuales y avatares
└── src/                        # Código fuente
    ├── main.tsx                # Punto de entrada
    ├── App.tsx                 # Rutas y seguridad
    ├── App.css                 # Estilos del App
    ├── index.css               # Estilos globales (Tailwind v4)
    ├── assets/                 # Recursos gráficos
    ├── services/               # Comunicación API
    │   └── api.ts              # Cliente Fetch centralizado
    ├── context/                # Estado global
    │   ├── AuthContext.tsx     # Sesión y roles
    │   └── CartContext.tsx     # Carrito de compras
    ├── hooks/                  # Lógica reutilizable
    │   ├── useAuth.ts          # Identidad de usuario
    │   ├── useBranch.ts        # Gestión de sucursales
    │   ├── useCart.ts          # Funciones del carrito
    │   ├── useCategories.ts    # Gestión de categorías
    │   ├── useProducts.ts      # Catálogo de productos
    │   ├── useTheme.ts         # Modo claro/oscuro
    │   └── admin/              # Hooks administrativos
    │       ├── useAdminAlerts.ts
    │       ├── useAdminBatches.ts
    │       ├── useAdminProductSales.ts
    │       ├── useAdminProducts.ts
    │       ├── useAdminSales.ts
    │       ├── useAdminStats.ts
    │       ├── useAdminUsers.ts
    │       ├── useCustomers.ts
    │       ├── useInventory.ts
    │       ├── usePOS.ts
    │       └── usePromotions.ts
    ├── pages/                  # Vistas de la aplicación
    │   ├── Login/              # Acceso
    │   │   ├── LoginPage.tsx
    │   │   └── RegisterPage.tsx
    │   ├── admin/              # Administración
    │   │   ├── AlertsPage.tsx
    │   │   ├── BatchesPage.tsx
    │   │   ├── BranchesPage.tsx
    │   │   ├── CategoriesPage.tsx
    │   │   ├── CustomersPage.tsx
    │   │   ├── DashboardPage.tsx
    │   │   ├── InventoryPage.tsx
    │   │   ├── PointOfSalePage.tsx
    │   │   ├── ProductsPage.tsx
    │   │   ├── ProfilePage.tsx
    │   │   ├── PromotionsPage.tsx
    │   │   ├── SalesByProductPage.tsx
    │   │   └── UsersPage.tsx
    │   └── cliente/            # Tienda pública
    │       ├── BranchPage.tsx
    │       ├── CategoriesPage.tsx
    │       ├── CheckoutPage.tsx
    │       ├── ClientProfilePage.tsx
    │       ├── ProductsPage.tsx
    │       └── SuccessPage.tsx
    └── components/             # Arquitectura atómica
        ├── atoms/              # UI pura
        │   ├── Alert/
        │   ├── Badge/
        │   ├── Button/
        │   ├── Card/
        │   ├── Icon/
        │   ├── Input/
        │   ├── Toggle/
        │   └── index.ts
        ├── molecules/          # Lógica combinada
        │   ├── Admin/          # Modales y formularios admin
        │   │   ├── AddBatchModal.tsx
        │   │   ├── BatchHistoryModal.tsx
        │   │   ├── CategoryModal.tsx
        │   │   ├── POSProductSearch.tsx
        │   │   ├── ProductModal.tsx
        │   │   ├── StatCard.tsx
        │   │   └── UserModal.tsx
        │   ├── Cart/           # Épicas del carrito
        │   │   ├── CartItem.tsx
        │   │   └── CheckoutSummary.tsx
        │   ├── Login/          # Forms de acceso
        │   │   ├── LoginForm.tsx
        │   │   └── RegisterForm.tsx
        │   ├── Menu/           # Menús desplegables
        │   │   └── UserMenu.tsx
        │   └── Product/        # Presentación de productos
        │       ├── ProductCard.tsx
        │       └── ProductRow.tsx
        ├── organisms/          # Secciones globales
        │   ├── Admin/          # Sidebar y paneles admin
        │   │   ├── AdminSidebar.tsx
        │   │   └── POSSalePanel.tsx
        │   ├── Cart/           # Checkout y drawer
        │   │   ├── CartDrawer.tsx
        │   │   └── CheckoutForm.tsx
        │   ├── Footer/
        │   │   └── Footer.tsx
        │   ├── Header/
        │   │   └── Header.tsx
        │   ├── Login/          # Cartas de acceso
        │   │   ├── LoginCard.tsx
        │   │   └── RegisterCard.tsx
        │   ├── Product/        # Grillas y tablas
        │   │   ├── ProductGrid.tsx
        │   │   └── ProductTable.tsx
        │   └── Sidebar/
        │       └── Sidebar.tsx
        └── templates/          # Estructuras de diseño
            ├── MainLayout.tsx
            └── AdminLayout.tsx
```
├── INSTALL.md                  # Guía de instalación
├── README.md                   # Documentación principal
├── STRUCTURE.md                # (Este archivo)
├── package.json                # Dependencias y scripts
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Reglas de TypeScript
├── eslint.config.js            # Reglas de Linter
└── index.html                  # Plantilla base SPA
---
*Este mapa refleja la estructura real y completa del proyecto Farmacy Siempre Vivo.*
