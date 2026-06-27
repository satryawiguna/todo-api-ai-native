# Todo API — Backend Nest.js

## Pengetahuan Domain
Sebelum mengimplementasikan fitur apa pun, baca basis pengetahuan bersama:
→ `../todo-shared-ai-native-orchestration/`
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
