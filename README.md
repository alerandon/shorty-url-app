# 🔗 Shorty URL App

Una aplicación moderna de acortamiento de URLs construida con una arquitectura de monorepo que permite a los usuarios crear enlaces cortos y rastrear estadísticas de visitantes de manera sencilla e intuitiva.

## 📋 Descripción

Shorty URL App es una solución completa para el acortamiento de URLs que permite a los usuarios:

- 🎯 **Crear enlaces cortos personalizados** a partir de URLs largas
- 📊 **Monitorear estadísticas** de clics y visitas en tiempo real
- 👤 **Gestión por sesión de invitado** sin necesidad de registro
- 🚀 **Interfaz moderna y responsiva** construida con React y TailwindCSS
- ⚡ **API RESTful robusta** con validaciones y manejo de errores

## 🛠️ Tecnologías Utilizadas

### Backend (API)

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista y flexible
- **MongoDB** - Base de datos NoSQL orientada a documentos
- **Mongoose** - ODM (Object Document Mapper) para MongoDB
- **TypeScript** - Superset tipado de JavaScript
- **Zod** - Biblioteca de validación de esquemas TypeScript-first
- **nanoid** - Generador de IDs únicos y seguros
- **Nodemon** - Herramienta de desarrollo para recarga automática

### Frontend (Client)

- **React 19** - Biblioteca para construir interfaces de usuario
- **TypeScript** - Desarrollo tipado y más seguro
- **Vite** - Herramienta de construcción rápida y moderna
- **TailwindCSS 4** - Framework de CSS utilitario
- **React Hooks** - Gestión de estado y efectos

### DevOps y Herramientas

- **Docker & Docker Compose** - Containerización y orquestación
- **Turbo** - Sistema de construcción de monorepos de alta performance
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código

## 📁 Estructura del Proyecto

```
shorty-url-app/
├── 📋 README.md                    # Documentación principal
├── 📦 package.json                 # Configuración del workspace raíz
├── 🐳 docker-compose.yml           # Orquestación de contenedores
├── ⚡ turbo.json                   # Configuración de Turbo
├── 📝 tsconfig.base.json           # Configuración base de TypeScript
│
├── 🎯 apps/
│   ├── 🔧 api/                     # Backend API
│   │   ├── 📦 package.json
│   │   ├── 🐳 Dockerfile.dev
│   │   ├── 🔄 nodemon.json
│   │   └── 📂 src/
│   │       ├── 🚀 index.ts         # Punto de entrada
│   │       ├── ⚙️ config/          # Configuraciones
│   │       ├── 🎮 controllers/     # Controladores de rutas
│   │       ├── 📊 models/          # Modelos de datos
│   │       ├── 🛣️ routes/          # Definición de rutas
│   │       ├── 📋 schemas/         # Esquemas de validación
│   │       ├── 🔧 services/        # Lógica de negocio
│   │       └── 🛠️ utils/           # Utilidades y helpers
│   │
│   └── 🎨 client/                  # Frontend React
│       ├── 📦 package.json
│       ├── 🐳 Dockerfile.dev
│       ├── ⚡ vite.config.ts
│       ├── 🌐 index.html
│       └── 📂 src/
│           ├── 🎨 App.tsx          # Componente principal
│           ├── 🚀 main.tsx         # Punto de entrada
│           ├── 🧩 components/      # Componentes reutilizables
│           ├── 🎭 context/         # Contextos de React
│           ├── 🎣 hooks/           # Hooks personalizados
│           ├── 🔧 services/        # Servicios de API
│           ├── 📝 types/           # Definiciones de tipos
│           └── 🛠️ utils/          # Utilidades del frontend
```

## 🚀 Montaje del Proyecto

### Prerrequisitos

- **Node.js** (versión 20 o superior)
- **npm** o **yarn**
- **MongoDB** (para desarrollo local)
- **Docker** y **Docker Compose** (para desarrollo con contenedores)

### 🔧 Instalación Nativa (NPM)

#### 1. Clonar el repositorio

```bash
git clone https://github.com/alerandon/shorty-url-app.git
cd shorty-url-app
```

#### 2. Instalar dependencias

```bash
# Instalar dependencias del workspace raíz y todas las aplicaciones
npm install
```

#### 3. Configurar variables de entorno

```bash
# En la carpeta raíz, crear archivo .env
cp .env.example .env

# Configurar las siguientes variables:
API_PORT=3001
API_DB_USER=user
API_DB_PASSWORD=password
API_DB_HOST=localhost
API_DB_PORT=27017
API_DB_NAME=shorty-url-app
API_JWT_SECRET=your-jwt-secret-key
API_NODE_ENV=development
```

#### 4. Iniciar MongoDB

```bash
# Opción 1: MongoDB local
mongod

# Opción 2: MongoDB con Docker
docker run -d -p 27017:27017 --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

#### 5. Ejecutar el proyecto

```bash
# Opción 1: Ejecutar todo el monorepo
npm run dev

# Opción 2: Ejecutar solo la API
npm run dev:api

# Opción 3: Ejecutar solo el cliente
npm run dev:client
```

### 🐳 Instalación con Docker

#### 1. Clonar el repositorio

```bash
git clone https://github.com/alerandon/shorty-url-app.git
cd shorty-url-app
```

#### 2. Configurar variables de entorno

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

#### 3. Construir y ejecutar con Docker Compose

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Ejecutar en modo desarrollo con watch (recomendado)
docker-compose watch

# Ejecutar en segundo plano
docker-compose up -d
```

#### 4. Acceder a la aplicación

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

### 🔍 Scripts Disponibles

```bash
# Workspace raíz
npm run dev          # Ejecutar todo el monorepo en modo desarrollo
npm run build        # Construir todas las aplicaciones
npm run dev:api      # Ejecutar solo la API
npm run dev:client   # Ejecutar solo el cliente

# API (apps/api)
npm run dev          # Desarrollo con hot-reload
npm run build        # Construir para producción
npm run start        # Ejecutar versión construida
npm test             # Ejecutar tests

# Cliente (apps/client)
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Linter de código
```

## 📊 Entidades del Proyecto

### 🔗 Modelo URL

El modelo principal de la aplicación que representa un enlace acortado.

#### Estructura de Datos

| Campo         | Tipo       | Descripción                                       | Requerido | Valor por Defecto |
| ------------- | ---------- | ------------------------------------------------- | --------- | ----------------- |
| `_id`         | `ObjectId` | Identificador único de MongoDB                    | ✅        | Auto-generado     |
| `originalUrl` | `String`   | URL original completa a acortar                   | ✅        | -                 |
| `shortCode`   | `String`   | Código único de 7 caracteres para el enlace corto | ✅        | `nanoid(7)`       |
| `visitCount`  | `Number`   | Contador de visitas al enlace corto               | ✅        | `0`               |
| `guestId`     | `String`   | Identificador de sesión del usuario invitado      | ✅        | -                 |
| `createdAt`   | `Date`     | Fecha y hora de creación del registro             | ✅        | Auto-generado     |
| `updatedAt`   | `Date`     | Fecha y hora de última actualización              | ✅        | Auto-actualizado  |

#### Ejemplo de Documento

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "originalUrl": "https://www.ejemplo.com/una-url-muy-larga-que-necesita-ser-acortada",
  "shortCode": "aB3xY7z",
  "visitCount": 42,
  "guestId": "guest_a1b2c3d4e5f6",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-18T15:45:30.000Z"
}
```

#### Validaciones y Reglas

- **originalUrl**: Debe ser una URL válida con protocolo (http/https)
- **shortCode**: Único en toda la base de datos, generado automáticamente
- **visitCount**: Solo incrementa, nunca disminuye
- **guestId**: Permite asociar múltiples URLs a una sesión de usuario

#### Índices de Base de Datos

- `shortCode`: Índice único para búsquedas rápidas
- `guestId`: Índice para consultas por usuario
- `createdAt`: Índice para ordenamiento temporal
