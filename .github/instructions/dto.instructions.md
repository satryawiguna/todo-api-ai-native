---
description: "Gunakan saat menulis atau mengubah DTO (Data Transfer Object) di Nest.js. Mencakup class-validator, class-transformer, Swagger decorator, enum, nested DTO."
applyTo:
  - "**/*.dto.ts"
  - "**/*.input.ts"
---

# DTO Instructions

## Validasi Dasar
- Semua field wajib menggunakan dekorator `class-validator`
- Gunakan `@IsOptional()` untuk field opsional — jangan gabungkan dengan `@IsNotEmpty()`
- Gunakan `@Type(() => Number)` dari `class-transformer` untuk query param numerik
- String: gunakan `@MinLength()`, `@MaxLength()` sesuai batasan bisnis

## Swagger Documentation
- Semua field wajib menggunakan `@ApiProperty()` atau `@ApiPropertyOptional()`
- Deskripsi `@ApiProperty({ description: '...' })` harus informatif
- Gunakan `example` untuk memberikan contoh nilai

## Enum
- Definisikan enum di file terpisah atau di dalam DTO sebagai `export enum`
- Gunakan `@IsEnum(EnumName)` untuk validasi
- Di `@ApiProperty()`, gunakan `{ enum: EnumName }` untuk Swagger

## Transform
- Query param string → number: `@Type(() => Number) @IsInt() @Min(1)`
- Query param string → boolean: `@Type(() => Boolean) @IsBoolean()`
- Gunakan `@Transform()` untuk transformasi kustom

## Nested DTO
- Validasi nested object: `@ValidateNested()` + `@Type(() => NestedDto)`
- Array nested: `@ValidateNested({ each: true })` + `@Type(() => NestedDto)`

## Response DTO
- Response DTO tidak perlu class-validator — cukup Swagger decorator
- Gunakan `@ApiResponse({ type: ResponseDto })` di controller

## Anti-pattern
- ❌ `@IsNotEmpty()` + `@IsOptional()` bersamaan
- ❌ Field numerik tanpa `@Type(() => Number)`
- ❌ Tidak ada `@ApiProperty` di field yang wajib ada di request body
- ❌ Enum langsung string literal — gunakan `enum` TypeScript

## Referensi
- Baca `architecture/api-contracts.md` dari MCP server `todo-shared-context` untuk format response
