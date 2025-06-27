# TuContrato.cl - Plataforma de Generación de Contratos para Chile

## 🚀 Descripción General

**TuContrato.cl** es una plataforma web que permite generar contratos legales personalizables adaptados al contexto chileno. Está diseñada para personas sin formación legal: freelancers, emprendedores, pymes y particulares. El sistema permite crear contratos desde plantillas mediante formularios dinámicos, exportarlos en PDF y acceder a opciones de monetización escalables.

---

## 📅 Fases del Proyecto

### ✅ Fase 1: MVP Funcional (en desarrollo)

- Registro/login con JWT (access + refresh token)
- Recuperación de contraseña vía correo
- Selección de plantilla legal
- Formulario dinámico
- Vista previa del contrato generado
- Exportación en PDF con marca de agua
- 3 plantillas: Arriendo, Prestación de servicios, NDA

### 💳 Fase 2: MVP Monetizable

- Integración con Flow.cl / MercadoPago
- Límites por plan (freemium, pago por uso, suscripción mensual)
- Historial de contratos generados por usuario
- Panel administrativo (plantillas y usuarios)

### 🚀 Fase 3: Escalamiento

- Firma electrónica avanzada (FEA)
- Nuevas plantillas (laboral, compraventa, poderes, etc.)
- Aplicación móvil (opcional)
- Blog SEO y marketing legal

---

## 📊 Tecnologías Utilizadas

### Backend

- NestJS
- TypeORM + PostgreSQL
- JWT (Access + Refresh)
- Bcrypt
- Nodemailer (dev), Resend (prod)
- Class-validator

### Frontend (pendiente)

- Angular 16+
- Angular Material (tema Cyan/Orange)

---

## ⚖️ Seguridad y Buenas Prácticas

- Autenticación segura con JWT + Refresh
- Roles desde tabla `roles` (admin, user, etc.)
- Guards por recurso y decoradores personalizados
- Validación estricta con class-validator
- Sanitización de entradas
- Políticas de privacidad y eliminación de cuenta
- Helmet y CORS global configurados
- Throttling habilitado con `@nestjs/throttler`
- Swagger solo disponible en desarrollo

---

## 💼 Instrucciones para levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/camilo-lavado/tu-contrato.git
cd tu-contrato
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# 🌐 Entorno
NODE_ENV=development
PORT=3000
DATABASE_SSL=false

# 🗄️ Bases de datos
PROD_DATABASE_URL=postgresql://user:password@host/tu_contrato_db?sslmode=require&channel_binding=require
DATABASE_URL=postgres://postgres:password@localhost:5432/tucontrato_dev
TEST_DATABASE_URL=postgres://postgres:password@localhost:5432/tucontrato_test

# 🔐 Autenticación
ACCESS_TOKEN_SECRET=supersecretcontractpassword
REFRESH_TOKEN_SECRET=refreshsecretkeykcontract
ACCESS_TOKEN_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d

# 📬 Correo
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=mailtrap_user
EMAIL_PASS=mailtrap_pass

# 🌍 Frontend
FRONTEND_URL=http://localhost:4200
```

### 4. Ejecutar migraciones (si usas TypeORM CLI)

```bash
pnpm run typeorm:migration:run
```

### 5. Levantar el servidor en desarrollo

```bash
pnpm run start:dev
```

---

## 📈 Estructura del Proyecto (backend)

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   ├── guards/
│   ├── decorators/
│   ├── dtos/
│   ├── entities/
│   └── utils/
├── users/
├── roles/
├── templates/
├── contracts/
├── pdf/
└── shared/
```

---

## 🏠 Hosting sugerido (para MVP)

| Servicio                | Costo            |
| ----------------------- | ---------------- |
| **Render** (backend)    | $0 CLP           |
| **Vercel** (frontend)   | $0 CLP           |
| **NeonDB** (PostgreSQL) | $0 CLP           |
| **Dominio .cl**         | ~$12.000 CLP/año |
| **Mailtrap** (dev)      | Gratis           |

---

## 📎 Nombre y Branding

- Nombre: **TuContrato.cl**
- Dominio verificado: libre
- Marca sin conflicto detectado
- Redes disponibles
- Logo generado con estilo moderno y formal

---

## ✅ Estado Actual

- Modelo de base de datos completo con soporte para pagos, auditoría y perfiles de usuario
- Scripts listos en SQL y DBML para importar o visualizar la estructura
- Alias `@app/*` configurado y funcionando en TypeScript, Jest y editor
- Seguridad aplicada: Helmet, CORS, throttling (`@nestjs/throttler`)
- Swagger habilitado solo en desarrollo (`NODE_ENV !== 'production'`)
- Husky + lint-staged funcionando: corre ESLint y Prettier antes de cada commit
- Tests E2E configurados con Jest + entorno `.env.test`
- Usando `pnpm` como gestor de paquetes
- Avanzando en módulo de login con JWT (access + refresh)
