# Todo API — Backend Nest.js

## Pengetahuan Domain
Sebelum mengimplementasikan fitur apa pun, baca basis pengetahuan bersama melalui MCP server `todo-shared-context` (GitHub: `satryawiguna/todo-shared-ai-native`):
  - `product/` untuk kebutuhan dan kriteria acceptance
  - `business/` untuk aturan bisnis dan alur kerja
  - `architecture/api-contracts.md` untuk kontrak API (sumber kebenaran)
  - `standards/` untuk konvensi coding, penamaan, keamanan, pengujian

## Konvensi Nest.js
- Modul mengenkapsulasi area fitur (todos/, users/, notifications/)
- Service berisi logika bisnis; controller menangani HTTP
- Semua DTO menggunakan dekorator class-validator
- ValidationPipe global dengan whitelist + forbidNonWhitelisted
- Gunakan dekorator @nestjs/swagger di semua endpoint
- Pola Repository via TypeORM (inject @InjectRepository)
- Exception kustom extends HttpException

## Pola TypeORM
- Entity menggunakan dekorator class + field
- Gunakan `@CreateDateColumn`, `@UpdateDateColumn`, `@DeleteDateColumn` untuk timestamp
- `synchronize: true` HANYA untuk development — gunakan migrasi untuk production
- Nama tabel: plural snake_case (`todos`, `users`)

## Error Handling
- 400 — VALIDATION_ERROR (class-validator gagal)
- 404 — NOT_FOUND (entity tidak ditemukan)
- 422 — BUSINESS_RULE_VIOLATION (aturan bisnis dilanggar, misal: edit todo completed)
- 500 — INTERNAL_ERROR (error tidak terduga — jangan tampilkan detail di production)

## Testing
- Unit test untuk service dengan mock repository
- E2E test dengan Supertest
- Ikuti konvensi `describe('Nama', () => { it('should ...', () => {}) })`

## Claude Code — Backend Specific
- Gunakan plan mode untuk perubahan database migration
- Sebelum mengubah kontrak API, baca `architecture/api-contracts.md` dari MCP server `todo-shared-context`
- Jalankan `pnpm test` sebelum commit

## Agent yang Tersedia
Gunakan agent ini via Copilot Chat untuk tugas spesifik:

| Agent | Fungsi | Dipanggil Saat |
|---|---|---|
| `api-reviewer` | Review keamanan & kepatuhan kontrak API | Review PR backend |
| `code-reviewer` | Review kualitas kode (clean code, DRY, SOLID) | Review PR secara umum |
| `migration-reviewer` | Review keamanan data migration TypeORM | Sebelum migration ke production |
| `test-reviewer` | Review kualitas test (coverage, edge cases) | Review file test |
| `security-auditor` | Audit OWASP, dependency, secrets | Review PR atau sebelum deployment |

## Prompt yang Tersedia
Gunakan prompt via `/` di Copilot Chat:

| Prompt | Fungsi |
|---|---|
| `api-endpoint` | Buat endpoint API baru lengkap (DTO, service, controller, test) |
| `create-migration` | Buat migration TypeORM berdasarkan perubahan entity |
| `refactor-module` | Refactor module atau service untuk meningkatkan struktur |

## Struktur AI Context
```
.github/
├── instructions/      # Always-on rules via applyTo patterns
│   ├── nestjs.instructions.md
│   ├── typeorm.instructions.md
│   ├── testing.instructions.md
│   ├── dto.instructions.md
│   ├── guard.instructions.md
│   ├── filter.instructions.md
│   └── interceptor.instructions.md
├── agents/            # Specialized sub-agents
│   ├── api-reviewer.agent.md
│   ├── code-reviewer.agent.md
│   ├── migration-reviewer.agent.md
│   ├── test-reviewer.agent.md
│   └── security-auditor.agent.md
└── prompts/           # Task templates (slash commands)
    ├── api-endpoint.prompt.md
    ├── create-migration.prompt.md
    └── refactor-module.prompt.md
```
