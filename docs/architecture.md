# Arsitektur Backend

## Module Architecture

```
AppModule
├── ConfigModule (global — .env)
├── TypeOrmModule (MySQL)
├── ThrottlerModule (rate limiting)
├── TodoModule
│   ├── TodoController (REST endpoints)
│   ├── TodoService (business logic)
│   └── Todo (TypeORM entity)
└── HealthModule
    └── HealthController (readiness check)
```

## Database Schema

Lihat: `../todo-shared-ai-native-orchestration/diagrams/erd.md`

Tabel: `todos`
- `id` — UUID, primary key
- `title` — VARCHAR(200), NOT NULL
- `description` — TEXT, NULLABLE
- `status` — ENUM('active', 'completed'), default 'active'
- `priority` — ENUM('low', 'medium', 'high'), default 'medium'
- `created_at` — TIMESTAMP
- `updated_at` — TIMESTAMP
- `deleted_at` — TIMESTAMP, NULLABLE (soft delete)

## Security Layers

1. **Helmet** — HTTP security headers
2. **CORS** — Origin whitelist
3. **Throttler** — Rate limiting (100 req/menit)
4. **ValidationPipe** — Input whitelist + validation
5. **ExceptionFilter** — Safe error responses (no stack traces)
