# Windsurf Instructions — Todo API

## Project

Todo App REST API: Node.js + TypeScript + Express + MySQL. Clean Architecture.

## Priorities

1. Security — validate all input, never expose sensitive data. Errors: RFC 7807 format
2. Correctness — follow business rules in shared context
3. Type safety — no `any` type
4. Test coverage — service layer requires unit tests

## Cascade AI — Baca File Ini Terlebih Dahulu

Sebelum generate atau modifikasi kode apapun, baca file berikut:

1. `.github/copilot-instructions.md` — architecture dan rules
2. `../todo-shared-ai-native/architecture/api-contracts.md` — API contracts
3. `../todo-shared-ai-native/business/business-rules.md` — business rules
4. `.github/instructions/` — layer-specific patterns (endpoint, service, repository, testing)

## Key Rules (Ringkasan)

- Clean Architecture: Controller → Service → Repository
- Controller hanya HTTP: parse, call service, respond
- Service: business logic, validasi rules, throw AppError. Unit test wajib.
- Repository: SQL only, parameterized query, soft delete
- All input: Zod validation
- All error: centralized handler, RFC 7807 format
- AppError class: `src/lib/errors.ts`

## Reusable Prompts & Agents

- `.github/prompts/` — task templates (create-endpoint, create-migration, security-review)
- `.github/agents/` — subagent definitions (backend, database, review, security)

## Shared Context

Business rules, API contracts, dan standards lintas-repo ada di:
`../todo-shared-ai-native/`
