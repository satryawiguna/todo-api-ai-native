# Todo App — Backend API

Todo App REST API built with Node.js 20, TypeScript, Express, and MySQL.

## Tech Stack
- **Runtime**: Node.js 20 LTS
- **Language**: TypeScript (strict mode)
- **Framework**: Express.js
- **Database**: MySQL 8 via mysql2
- **Auth**: JWT (jsonwebtoken) + bcrypt
- **Validation**: Zod
- **Testing**: Vitest + Supertest

## Shared Context
Business rules, API contracts, dan standards ada di repo terpisah:
`todo-shared-ai-native` — single source of truth lintas-repo.

## AI Context Files
- `.github/copilot-instructions.md` — GitHub Copilot instructions
- `.github/instructions/` — Scoped instructions per layer
- `.github/prompts/` — Reusable prompt files
- `CLAUDE.md` — Claude instructions
- `AGENTS.md` — Agent instructions (Cursor, Windsurf, dll)
- `WINDSURF.md` — Windsurf Cascade instructions
- `.cursor/rules/` — Cursor IDE rules
