# GitHub Copilot Instructions — Todo API

## Project
Todo App REST API. Node.js + TypeScript + Express + MySQL.
Solo developer + occasional collaborator. Target: production deployment di Railway/Render.

## Tech Stack
- Runtime: Node.js 20 LTS
- Language: TypeScript (strict mode)
- Framework: Express.js
- Database: MySQL 8 via mysql2 + custom query builder (atau Prisma ORM)
- Auth: JWT (jsonwebtoken) + bcrypt
- Validation: Zod
- Testing: Vitest + Supertest

## Shared Context
Business rules, API contracts, dan standards ada di: `../todo-shared-ai-native/`
File tersebut adalah source of truth lintas-repo.

## Architecture
Clean Architecture dengan 4 layer:
```
src/
├── controllers/    # HTTP layer: parse request, call service, format response
├── services/       # Business logic, orchestration
├── repositories/   # Database access, query execution
├── models/         # TypeScript interfaces / domain types
├── middlewares/    # Auth, validation, error handling
├── lib/            # DB connection, JWT utils, bcrypt utils
└── routes/         # Express router definitions
```

## Code Rules
- Controller hanya boleh: parse input, call service, return response
- Service berisi business logic, tidak boleh langsung query DB
- Repository berisi semua query SQL, tidak boleh ada logic
- Tidak ada `any` type
- Semua input divalidasi dengan Zod schema sebelum masuk ke controller
- Gunakan async/await, tidak ada callback-style

## Response Format
Selalu gunakan format standar dari `../todo-shared-ai-native/architecture/api-contracts.md`:
- Success: `{ success: true, data: ..., meta: ... }`
- Error: `{ success: false, error: { code, message, details } }`

## Error Handling
- Gunakan centralized error handler middleware
- Throw custom error class (AppError) dari service/repository
- Jangan expose stack trace di production

## Do NOT
- Jangan query DB langsung dari controller atau service
- Jangan return password hash dalam response apapun
- Jangan gunakan `any` type
- Jangan hardcode credentials atau secret
- Jangan skip input validation
- Jangan expose sensitive data dalam error message
