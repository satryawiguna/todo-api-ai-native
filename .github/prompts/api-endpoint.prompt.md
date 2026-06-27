---
description: "Buat endpoint API baru sesuai kontrak api-contracts.md"
agent: "craft"
---

Buat endpoint API baru untuk: **$ARGUMENTS**

Langkah-langkah:
1. Baca `../todo-shared-ai-native-orchestration/architecture/api-contracts.md` untuk kontrak API
2. Buat/tambah DTO di `src/<module>/dto/` dengan class-validator
3. Tambah method di service — implementasi business logic
4. Tambah endpoint di controller dengan Swagger decorators
5. Tambah unit test untuk service
6. Tambah E2E test untuk endpoint

Pastikan:
- Response format mengikuti `api-contracts.md`: `{ data }`, `{ data, meta }`, `{ error }`
- Semua input divalidasi
- Error handling mengikuti konvensi (400, 404, 422)
- Swagger documentation lengkap
