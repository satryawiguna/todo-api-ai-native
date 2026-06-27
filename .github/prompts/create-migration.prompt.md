---
description: "Buat migration TypeORM berdasarkan perubahan entity"
agent: "craft"
---

Buat migration TypeORM untuk perubahan entity terbaru.

Langkah-langkah:
1. Baca entity yang berubah di `src/**/**.entity.ts`
2. Generate migration dengan: `pnpm migration:generate src/database/migrations/<NamaMigration>`
3. Review migration yang dihasilkan — pastikan tidak ada data loss
4. Jika ada data migration manual, tambahkan ke file migration

Ikuti standar dari `../todo-shared-ai-native-orchestration/standards/` untuk konvensi penamaan.
