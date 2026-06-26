# Windsurf Instructions — Todo API

## Project
Todo App REST API: Node.js + TypeScript + Express + MySQL. Clean Architecture.

## Cascade AI — Baca File Ini Terlebih Dahulu
Sebelum generate atau modifikasi kode apapun, baca file berikut:
1. `.github/copilot-instructions.md` — architecture dan rules
2. `../todo-shared-ai-native/architecture/api-contracts.md` — API contracts
3. `../todo-shared-ai-native/business/business-rules.md` — business rules

## Key Rules (Ringkasan)
- Clean Architecture: Controller → Service → Repository
- Controller hanya HTTP: parse, call service, respond
- Service: business logic, validasi rules, throw AppError
- Repository: SQL only, parameterized query, soft delete
- All input: Zod validation
- All error: centralized handler, RFC 7807 format

## Shared Context
Business rules, API contracts, dan standards lintas-repo ada di:
`../todo-shared-ai-native/`
