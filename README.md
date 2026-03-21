# Guitar — Backend API REST

API REST desarrollada con **Node.js + Express + TypeScript + Sequelize-TypeScript + PostgreSQL** como parte del proyecto de integración Frontend-Backend para el curso de Desarrollo Web.

---

## Tabla de Contenidos

- [Requisitos previos](#-requisitos-previos)
- [Instalación de dependencias](#-instalación-de-dependencias)
- [Configuración de variables de entorno](#-configuración-de-variables-de-entorno)
- [Configuración de la base de datos](#-configuración-de-la-base-de-datos)
- [Arrancar el servidor](#-arrancar-el-servidor)
- [Endpoints disponibles](#-endpoints-disponibles)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tecnologías utilizadas](#-tecnologías-utilizadas)

---

## Requisitos previos

Antes de comenzar asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- Una base de datos PostgreSQL activa (local o en la nube, por ejemplo [Render](https://render.com))

Verifica tu versión de Node con:

```bash
node --version
npm --version
```

---

## Instalación de dependencias

### 1. Clona el repositorio

```bash
git clone https://github.com/IngOscar19/BackendProyectoGuitar.git
cd guitarras-backend
```

### 2. Instala las dependencias

```bash
npm install
```

Esto instalará automáticamente todos los paquetes listados en `package.json`:

| Paquete | Descripción |
|---|---|
| `express` | Framework para el servidor HTTP |
| `cors` | Middleware para habilitar CORS |
| `dotenv` | Carga variables de entorno desde `.env` |
| `sequelize` | ORM para base de datos |
| `sequelize-typescript` | Decoradores de Sequelize para TypeScript |
| `express-validator` | Validación de datos en las rutas |
| `pg` + `pg-hstore` | Driver de PostgreSQL |
| `reflect-metadata` | Requerido para los decoradores de TypeScript |
| `ts-node-dev` | Compilación y recarga automática en desarrollo |

---

## Configuración de variables de entorno

### 1. Crea el archivo `.env` en la raíz del proyecto

```bash
# En Windows
copy .env.example .env

# En Mac/Linux
cp .env.example .env
```

### 2. Edita el archivo `.env` con tus datos reales

```env
# =============================================
# CONFIGURACIÓN DE BASE DE DATOS
# =============================================
# Formato Render u otro servicio cloud:
DB_URL=postgresql://USUARIO:PASSWORD@HOST/NOMBRE_BD?ssl=true

# =============================================
# CONFIGURACIÓN DEL SERVIDOR
# =============================================
PORT=4000

# =============================================
# URL DEL FRONTEND (para CORS)
# =============================================
FRONTEND_URL=http://localhost:5173
```

>  **Importante:** Nunca subas el archivo `.env` a GitHub. Este archivo ya está incluido en el `.gitignore`.

---

## 🗄️ Configuración de la base de datos

### Poblar la base de datos (solo la primera vez)

Este comando crea las tablas en PostgreSQL e inserta los 12 modelos de guitarras iniciales:

```bash
npm run seed
```

Si todo está correcto verás en la consola:

```
Conexión establecida
Tablas sincronizadas
12 guitarras insertadas
```

>  **Atención:** El seed usa `force: true`, lo que elimina y recrea las tablas. Ejecútalo **únicamente la primera vez** o cuando quieras reiniciar los datos.

---

## Arrancar el servidor

### Modo desarrollo (con recarga automática)

```bash
npm run dev
```

### Modo producción

```bash
npm run build
npm start
```

Si la conexión es exitosa verás:

```
Conexión a PostgreSQL establecida
Tablas sincronizadas
Servidor corriendo en http://localhost:4000
```

---

## 📡 Endpoints disponibles

Base URL: `http://localhost:4000/api`

### Guitarras

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/guitars` | Obtener todas las guitarras |
| `GET` | `/api/guitars/:id` | Obtener una guitarra por ID |
| `POST` | `/api/guitars` | Crear una nueva guitarra |
| `PUT` | `/api/guitars/:id` | Actualizar una guitarra |
| `DELETE` | `/api/guitars/:id` | Eliminar una guitarra |

### Órdenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/orders` | Obtener todas las órdenes |
| `GET` | `/api/orders/:id` | Obtener una orden por ID |
| `POST` | `/api/orders` | Crear una nueva orden |
| `PUT` | `/api/orders/:id` | Modificar una orden |
| `DELETE` | `/api/orders/:id` | Eliminar una orden |

---

## Estructura del proyecto

```
guitarras-backend/
│
├── src/
│   ├── config/
│   │   └── db.ts                 # Conexión a PostgreSQL con Sequelize
│   │
│   ├── handlers/
│   │   ├── guitarController.ts             # Lógica CRUD de guitarras
│   │   └── orderController.ts              # Lógica CRUD de órdenes
│   │
│   ├── middleware/
│   │   └── handleInputErrors.ts  # Validación de datos con express-validator
│   │
│   ├── models/
│   │   ├── Guitar.model.ts       # Modelo de guitarra con decoradores
│   │   └── Order.model.ts        # Modelo de orden con decoradores
│   │
│   ├── routes/
│   │   ├── guitarRoutes.ts       # Rutas y validaciones de guitarras
│   │   └── orderRoutes.ts        # Rutas y validaciones de órdenes
│   │
│   ├── seed.ts                   # Script para poblar la base de datos
│   └── server.ts                 # Punto de entrada del servidor
│
├── .env                          # Variables de entorno 
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Tecnologías utilizadas

- **[Node.js](https://nodejs.org/)** — Entorno de ejecución JavaScript en el servidor
- **[Express](https://expressjs.com/)** — Framework minimalista para APIs REST
- **[TypeScript](https://www.typescriptlang.org/)** — Tipado estático sobre JavaScript
- **[Sequelize](https://sequelize.org/) + [sequelize-typescript](https://github.com/sequelize/sequelize-typescript)** — ORM con soporte de decoradores
- **[PostgreSQL](https://www.postgresql.org/)** — Base de datos relacional
- **[express-validator](https://express-validator.github.io/)** — Validación y sanitización de datos
- **[CORS](https://www.npmjs.com/package/cors)** — Control de acceso entre dominios

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con recarga automática |
| `npm run build` | Compila TypeScript a JavaScript en `/dist` |
| `npm start` | Inicia el servidor compilado |
| `npm run seed` | Pobla la base de datos con datos iniciales |