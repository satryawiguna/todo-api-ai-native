---
description: "Gunakan saat menulis controller, service, atau module Nest.js. Mencakup pola DI, dekorator, error handling."
applyTo:
  - "**/*.controller.ts"
  - "**/*.service.ts"
  - "**/*.module.ts"
---

# Nest.js Instructions

## Module Structure
- Setiap modul memiliki 4 file: entity, dto/, service, controller, module
- Service hanya berisi business logic — tidak ada HTTP concern
- Controller hanya menangani routing + validasi + response — delegasikan ke service

## Dependency Injection
- Gunakan `@Injectable()` pada service
- Inject repository dengan `@InjectRepository(Entity)`
- Jangan instantiate dependency secara manual

## Decorators
- Semua DTO menggunakan class-validator decorators
- Semua endpoint memiliki `@ApiOperation` + `@ApiResponse` (Swagger)
- Gunakan `@ApiTags('Nama')` untuk grouping di Swagger

## Error Handling
- Throw `NotFoundException` untuk entity tidak ditemukan
- Throw `UnprocessableEntityException` untuk business rule violation
- Throw `BadRequestException` untuk validasi input (class-validator otomatis)
- Format error mengikuti `api-contracts.md`: `{ error: { code, message, details? } }`

## Validation
- Global ValidationPipe dengan `whitelist: true` + `forbidNonWhitelisted: true`
- Gunakan `@Type(() => Number)` untuk query param numerik
