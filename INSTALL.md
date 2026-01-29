# 🚀 Guía de Instalación y Ejecución - Farmacy Client

Esta guía te ayudará a poner en marcha el frontend de la aplicación desde cero tras clonar el repositorio.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (Versión 18 o superior recomendada)
- **NPM** (Viene con Node.js)
- **Git** (Para clonar el repositorio)

---

## 🛠️ Pasos para la Instalación

### 1. Clonar el Repositorio
Abre tu terminal y ejecuta el siguiente comando:
```bash
git clone https://github.com/saaay13/farmacy-client.git
```

### 2. Entrar en la Carpeta del Proyecto
```bash
cd farmacy-client
```

### 3. Instalar Dependencias
Instala todas las librerías necesarias para que el proyecto funcione:
```bash
npm install
```

---

## ▶️ Ejecución del Proyecto

### Modo Desarrollo
Para iniciar el servidor local con recarga automática (HMR):
```bash
npm run dev
```
> [!NOTE]
> Por defecto, la aplicación se abrirá en [http://localhost:5173](http://localhost:5173).

---

## 🔗 Conexión con el Backend

⚠️ **IMPORTANTE**: Para que el login y el registro funcionen, debes tener el servidor (backend) ejecutándose en el puerto **3001**.

Si tu backend está en otra dirección, puedes cambiarla en el archivo:
`src/services/api.ts`

---

## 📦 Otros Comandos Útiles

- **`npm run build`**: Genera la versión lista para producción en la carpeta `/dist`.
- **`npm run lint`**: Revisa si hay errores de código o estilo.
- **`npm run preview`**: Prueba localmente la versión de producción ya construida.

---

¡Disfruta desarrollando en Farmacy Siempre Vivo! 🌿✨
