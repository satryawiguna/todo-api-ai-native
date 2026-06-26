# Agent Instructions — Todo API

## Project Overview
Todo App REST API. Node.js + TypeScript + Express + MySQL. Clean Architecture.

## Key Files to Read First
1. `.github/copilot-instructions.md` — architecture dan coding rules
2. `../todo-shared-ai-native/architecture/api-contracts.md` — API response format
3. `../todo-shared-ai-native/business/business-rules.md` — business rules
4. `src/lib/errors.ts` — AppError class
5. `src/middlewares/` — auth dan error handler

## Layer Rules (singkat)
- Controller → hanya HTTP: parse, call service, respond
- Service → business logic: validasi rules, orchestrate repository
- Repository → SQL only: parameterized query, soft delete

## Common Tasks
- **Endpoint baru**: ikuti `.github/prompts/create-endpoint.prompt.md`
- **Migration baru**: ikuti `.github/prompts/create-migration.prompt.md`
- **Security review**: ikuti `.github/prompts/security-review.prompt.md`

## Never Do
- Jangan query DB dari controller atau service
- Jangan return data user lain (enforce ownership di service layer)
- Jangan expose stack trace di response
- Jangan gunakan `any` type
