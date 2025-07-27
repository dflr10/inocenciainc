# Inocencia Studio - E-commerce

Esta es una aplicación de e-commerce moderna con animaciones en 3D construida con React Next.js y TypeScript y CSS. El proyecto sirve como una tienda para "Inocencia Studio", una marca de moda que vende ropa y calzado. La aplicación permite a los usuarios explorar productos, ver detalles, seleccionar tallas y colores, y añadirlos a un carrito de compras persistente.

## ✨ Características Principales

- **Página de Detalles del Producto**: Muestra información completa del producto, incluyendo título, marca, precio y descripción.
- **Galería de Imágenes Dinámica**: Un carrusel interactivo permite a los usuarios ver múltiples imágenes del producto con miniaturas de navegación.
- **Selección de Opciones**: Los usuarios pueden elegir tallas y colores disponibles para cada producto.
- **Carrito de Compras**: Un carrito de compras deslizable (sheet) donde los usuarios pueden ver los artículos añadidos, sus detalles y el subtotal de la compra.
- **Persistencia de Datos**: El contenido del carrito de compras se guarda en el `localStorage` del navegador, por lo que los artículos permanecen incluso después de recargar la página.
- **Productos Relacionados**: Un carrusel en la parte inferior de la página muestra otros productos que podrían interesar al usuario.
- **Diseño Responsivo**: La interfaz está optimizada para una experiencia de usuario fluida tanto en dispositivos de escritorio como móviles.

## 🛠️ Pila Tecnológica (Tech Stack)

Este proyecto está construido con un conjunto de tecnologías modernas y eficientes:

- **Framework**: [Next.js](https://nextjs.org/) (utilizando el App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Interfaz de Usuario**: [React](https://reactjs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes de UI**: [ShadCN/UI](https://ui.shadcn.com/)
- **Animaciones y Efectos**: `embla-carousel-react` para los carruseles y `class-variance-authority` para variantes de estilo dinámicas.
- **Gestión de Estado**: Hooks de React (`useState`, `useEffect`, `useContext`) para el estado local y global (carrito de compras).

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18.x o superior) y un gestor de paquetes como `npm` o `yarn`.

### 1. Clonar el Repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO>
```

### 2. Instalar Dependencias

A continuación, instala todas las dependencias del proyecto utilizando `npm`:

```bash
npm install
```

Este comando leerá el archivo `package.json` y descargará todas las librerías necesarias en la carpeta `node_modules`.

### 3. Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo de Next.js:

```bash
npm run dev
```

Este comando iniciará la aplicación en modo de desarrollo con recarga en caliente (`hot-reloading`). Por defecto, podrás ver el proyecto abriendo tu navegador y visitando:

[http://localhost:9002](http://localhost:9002)

### 4. Scripts Disponibles

El archivo `package.json` incluye los siguientes scripts:

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor de producción después de compilar.
- `npm run lint`: Ejecuta el linter de Next.js para analizar el código en busca de problemas.
- `npm run typecheck`: Ejecuta el compilador de TypeScript para verificar los tipos en todo el proyecto.
