---
mode: agent
tools: [codebase]
description: "Generate a database migration file"
---

Buat migration untuk: **[DESKRIPSI PERUBAHAN SKEMA]**

Ketentuan:
- Format filename: `YYYYMMDDHHMMSS_[deskripsi_singkat].sql`
- Sertakan `UP` migration (perubahan) dan `DOWN` migration (rollback)
- Gunakan `IF NOT EXISTS` / `IF EXISTS` untuk safety
- Tambahkan index yang relevan sesuai query pattern
- Soft delete: selalu sertakan kolom `deleted_at TIMESTAMP NULL`
- Timestamps: selalu sertakan `created_at` dan `updated_at`

Referensi entities di: `../todo-shared-ai-native/` (jika ada ERD atau entities doc)
