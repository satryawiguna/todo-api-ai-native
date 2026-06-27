---
description: "Gunakan saat menulis atau mengubah controller, service, atau module Nest.js. Mencakup pola DI, dekorator, error handling."
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
- Format error mengikuti `api-contracts.md` dari MCP server `todo-shared-context`: `{ error: { code, message, details? } }`

## Validation
- Global ValidationPipe dengan `whitelist: true` + `forbidNonWhitelisted: true`
- Gunakan `@Type(() => Number)` untuk query param numerik

## Best Practice
- ✅ Satu service = satu aggregate root — jangan campur tanggung jawab antar modul
- ✅ Gunakan custom exception class extends `HttpException` untuk error spesifik domain
- ✅ Semua dependency di-inject via constructor — jangan `new` manual
- ✅ Pisahkan DTO per operasi (Create, Update, Query, Response) — jangan reuse satu DTO
- ❌ Jangan taruh business logic di controller
- ❌ Jangan gunakan `any` di return type service
- ❌ Jangan akses database langsung dari controller

## Referensi
- Nest.js docs: [Controllers](https://docs.nestjs.com/controllers), [Providers](https://docs.nestjs.com/providers), [Modules](https://docs.nestjs.com/modules)
- Baca `architecture/api-contracts.md` dari MCP server `todo-shared-context` untuk kontrak API
