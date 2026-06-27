---
description: "Refactor module atau service Nest.js untuk meningkatkan struktur dan maintainability"
agent: "craft"
---

Refactor module atau service untuk: **{{ARGUMENTS}}**

Langkah-langkah:
1. Baca kode yang akan direfactor — pahami struktur saat ini dan dependensinya
2. Identifikasi masalah: tanggung jawab terlalu besar, duplikasi, coupling tinggi
3. Buat rencana refactor — split service, extract DTO, atau restruktur module
4. Terapkan perubahan secara bertahap — satu perubahan = satu commit mental
5. Update test yang terdampak — pastikan semua test tetap pass
6. Jalankan `pnpm lint && pnpm test` untuk verifikasi

Pastikan:
- Tidak mengubah API kontrak — response format tetap sesuai `api-contracts.md`
- Backward compatible — endpoint dan response shape tidak berubah
- Semua dependensi di-inject via constructor — tidak ada `new` manual
- Module tetap terorganisir: entity, dto/, service, controller, module
- Setiap service maksimal menangani 1 aggregate root
- Tidak ada duplikasi logika setelah refactor

## Pola Refactor Umum
| Masalah | Solusi |
|---|---|
| Service terlalu besar (>200 baris) | Split ke sub-service (e.g., `TodoValidationService`) |
| DTO reuse di banyak endpoint | Pisahkan: `CreateXDto`, `UpdateXDto`, `XQueryDto` |
| Logic duplikat antar module | Extract ke `src/common/utils/` atau shared service |
| Controller punya business logic | Pindahkan ke service |
| Module terlalu banyak dependency | Pertimbangkan domain event / CQRS pattern |
