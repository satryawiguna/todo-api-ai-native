---
mode: ask
description: "Review API changes"
---

Review perubahan API ini dengan fokus pada:

1. **Architecture** — Apakah mengikuti clean architecture? Controller → Service → Repository?
2. **Business Logic** — Apakah business rules dari `../todo-shared-ai-native/business/business-rules.md` sudah diterapkan?
3. **Validation** — Apakah semua input divalidasi dengan Zod di controller layer?
4. **Security** — SQL injection prevention? Ownership check? Password hashing?
5. **Error Handling** — Apakah error response mengikuti format standar RFC 7807?
6. **Testing** — Ada unit test untuk service? Ada integration test?
7. **Database** — Query sudah optimized? Index ada?

Format output:
- 🔴 **Must Fix** — blocker, harus diperbaiki sebelum merge
- 🟡 **Should Fix** — penting tapi tidak blocker
- 🟢 **Suggestion** — nice to have, opsional
