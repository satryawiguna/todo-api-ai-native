# Todo API — Backend Nest.js

Backend REST API untuk aplikasi Todo, dibangun dengan Nest.js + TypeORM + MySQL.

## 🚀 Mulai Cepat

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Jalankan database dengan Docker
docker compose up -d mysql

# Jalankan development server
pnpm start:dev
```

API berjalan di `http://localhost:3001`  
Swagger docs di `http://localhost:3001/api/docs`

## 📋 Prasyarat

- Node.js 20+
- pnpm
- Docker (untuk MySQL) atau MySQL terinstal lokal

## 🛠️ Development

```bash
pnpm start:dev      # Jalankan dengan hot reload
pnpm lint           # Lint kode
pnpm format         # Format kode dengan Prettier
pnpm test           # Unit test
pnpm test:e2e       # E2E test
pnpm test:cov       # Test coverage
```

## 🐳 Docker

```bash
# Jalankan seluruh stack (API + MySQL)
docker compose up -d

# Hentikan
docker compose down
```

## 📁 Struktur Proyek

```
src/
├── main.ts                    # Bootstrap aplikasi
├── app.module.ts              # Root module
├── config/                    # Konfigurasi (database, env)
├── todos/                     # Modul Todo
│   ├── todo.controller.ts     # REST endpoints
│   ├── todo.service.ts        # Business logic
│   ├── todo.entity.ts         # TypeORM entity
│   └── dto/                   # Data Transfer Objects
├── common/                    # Shared components
│   ├── filters/               # Exception filters
│   ├── interceptors/          # Response transform, request ID
│   └── pipes/                 # Validation pipes
├── health/                    # Health check endpoint
└── database/                  # Migrations
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

## 📚 Dokumentasi

- **Kontrak API:** `../todo-shared-ai-native-orchestration/architecture/api-contracts.md`
- **Aturan Bisnis:** `../todo-shared-ai-native-orchestration/business/business-rules.md`
- **Standar:** `../todo-shared-ai-native-orchestration/standards/`
