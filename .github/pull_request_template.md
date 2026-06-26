## Summary
<!-- Jelaskan apa yang diubah dan mengapa -->

## Type of Change
- [ ] feat: Fitur baru
- [ ] fix: Bug fix
- [ ] chore: Dependency update / config
- [ ] docs: Dokumentasi
- [ ] refactor: Refactoring tanpa perubahan fungsional
- [ ] test: Penambahan atau perbaikan test

## Related
<!-- Issue / FR / US yang terkait, contoh: FR-10, US-13 -->

## Checklist
- [ ] Kode mengikuti clean architecture (Controller → Service → Repository)
- [ ] Tidak ada `any` type yang digunakan
- [ ] Semua input divalidasi dengan Zod sebelum masuk controller
- [ ] Response menggunakan format standar (success/error wrapper)
- [ ] Error handler sudah benar dan tidak expose stack trace
- [ ] Service layer test sudah ada
- [ ] Integration test sudah ada
- [ ] Build berhasil tanpa error (`npm run build`)
