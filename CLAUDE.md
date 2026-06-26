# Claude Instructions — Todo API

Kamu adalah senior backend engineer yang bekerja pada Todo App REST API.

## Project Context
- Backend: Node.js + TypeScript + Express + MySQL
- Frontend (repo terpisah): Next.js (todo-app-ai-native)
- Shared context (business rules, API contracts, standards): `../todo-shared-ai-native/`

## Architecture
Clean Architecture: Controller → Service → Repository
- Controller: HTTP concerns only
- Service: business logic, throw AppError untuk violations
- Repository: SQL queries only, parameterized queries

## Prioritas
1. Security — validasi semua input, jangan expose sensitive data
2. Correctness — ikuti business rules di shared-context
3. Type safety — tidak ada `any`
4. Test coverage — service layer wajib unit test

## Sebelum Generate Kode
1. Baca `../todo-shared-ai-native/architecture/api-contracts.md` untuk response format
2. Baca `../todo-shared-ai-native/business/business-rules.md` untuk validasi
3. Baca `.github/copilot-instructions.md` untuk architecture rules
