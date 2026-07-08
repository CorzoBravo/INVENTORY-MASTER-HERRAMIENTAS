# Inventory Master - Sistema de Inventario

Un sistema completo de gestión de inventario, clientes y ventas, construido con React (Frontend) y Node.js + Express + PostgreSQL (Backend).

##  Requisitos Previos

Asegúrate de tener instalado en tu computadora:
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- [Docker y Docker Compose](https://www.docker.com/) (Opcional, pero recomendado para la base de datos)
- [PostgreSQL](https://www.postgresql.org/) (Solo si decides no usar Docker)

---

##  Configuración Inicial

Antes de arrancar el proyecto, debes configurar las variables de entorno en ambas carpetas.

### 1. Backend (Node.js API)
1. Entra a la carpeta del backend: `cd herramientas-node-api`
2. Copia el archivo de ejemplo para crear tu propio entorno:
   - En Windows: `copy .env.example .env`
   - En Mac/Linux: `cp .env.example .env`
3. Abre el archivo `.env` recién creado y configura tus datos. Principalmente debes cambiar `JWT_SECRET` y asegurar que los datos de la Base de Datos coincidan.

### 2. Frontend (React)
1. Entra a la carpeta del frontend: `cd frontend-app`
2. Copia el archivo de ejemplo:
   - En Windows: `copy .env.example .env`
   - En Mac/Linux: `cp .env.example .env`
3. Verifica que `VITE_API_URL` apunte a `http://localhost:3000/api` (por defecto está listo).

---

##  Opción A: Ejecución Rápida con Docker Compose (Full Stack)

Si tienes Docker instalado, puedes levantar todo el sistema (Base de Datos + Backend + Frontend en Nginx) con un solo comando. Esta opción simula el entorno de producción.

1. Asegúrate de estar en la **raíz del proyecto** (donde está el `docker-compose.yml`).
2. Configura las variables para Docker: Debes tener establecidas en tu entorno las variables `DB_PASSWORD` y `JWT_SECRET`. Si prefieres, puedes crear un archivo `.env` en la raíz del proyecto para que Docker las lea.
3. Ejecuta:
   ```bash
   docker-compose up --build -d
   ```
4. **Accesos:**
   - Frontend: `http://localhost:80`
   - Swagger / Documentación: `http://localhost:80/docs/`
   - Base de Datos: Expuesta en el puerto `5438` (Usuario: `user`, BD: `tienda`).

---

##  Opción B: Ejecución Local para Desarrollo

Esta es la mejor opción si planeas **modificar el código** y ver los cambios en tiempo real.

### Paso 1: Levantar la Base de Datos
Puedes instalar PostgreSQL localmente y crear la base de datos `tienda`, o bien, levantar *solo* la base de datos con Docker:
```bash
docker-compose up -d db
```

### Paso 2: Arrancar el Backend
Abre una nueva terminal en la raíz del proyecto:
```bash
cd herramientas-node-api
npm install
npm run dev
```
*(El backend arrancará en el puerto `3000`)*

### Paso 3: Arrancar el Frontend
Abre una segunda terminal en la raíz del proyecto:
```bash
cd frontend-app
npm install
npm run dev
```
*(El frontend de React arrancará con Vite, normalmente en `http://localhost:5173`)*

Listo. Accede a la URL que te muestra Vite en la consola para usar la aplicación. Las peticiones a `/api` serán redirigidas automáticamente a tu backend local gracias al proxy configurado en Vite.
