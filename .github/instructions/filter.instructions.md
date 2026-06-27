---
description: "Gunakan saat menulis atau mengubah Exception Filter di Nest.js. Mencakup response envelope, error code, logging."
applyTo:
  - "**/*.filter.ts"
---

# Filter Instructions

## Pola Dasar
- Semua filter implements `ExceptionFilter`
- Gunakan `@Catch()` untuk catch semua exception, atau `@Catch(HttpException)` untuk spesifik
- Gunakan `@Injectable()` (opsional, tapi direkomendasikan untuk konsistensi)

## Response Envelope
- Format error response: `{ error: { code: string, message: string, details?: any } }`
- Jangan bocorkan stack trace ke client di production
- Gunakan `Logger` untuk mencatat error detail

## Error Code Convention
| Status | Code | Kapan |
|---|---|---|
| 400 | `VALIDATION_ERROR` | class-validator gagal |
| 404 | `NOT_FOUND` | Entity tidak ditemukan |
| 409 | `CONFLICT` | Duplikasi data |
| 422 | `BUSINESS_RULE_VIOLATION` | Aturan bisnis dilanggar |
| 429 | `RATE_LIMIT_EXCEEDED` | Throttle limit |
| 500 | `INTERNAL_ERROR` | Error tidak terduga |

## Logging
- `this.logger.error()` untuk error 500 — sertakan stack trace
- `this.logger.warn()` untuk error 4xx yang mencurigakan (misal: 429 berulang)
- `this.logger.debug()` untuk error 4xx normal

## Best Practice
- ✅ Satu filter untuk satu tipe exception (atau global filter untuk semua)
- ✅ Format response konsisten di semua error
- ✅ Pisahkan logic mapping exception ke error code di method terpisah
- ❌ Jangan console.log — gunakan Logger Nest.js
- ❌ Jangan swallow exception tanpa logging

## Referensi
- Baca `architecture/api-contracts.md` dari MCP server `todo-shared-context` untuk format error response
- Nest.js docs: [Exception Filters](https://docs.nestjs.com/exception-filters)
