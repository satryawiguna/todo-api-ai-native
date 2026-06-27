---
paths:
  - "src/**/*.ts"
---

# Backend API Rules

- Semua endpoint harus memiliki validasi input (class-validator)
- Response format: `{ data }` untuk single, `{ data, meta }` untuk list, `{ error }` untuk error
- Business rules di `../todo-shared-ai-native-orchestration/business/business-rules.md` harus dipatuhi
- API contracts di `../todo-shared-ai-native-orchestration/architecture/api-contracts.md` adalah sumber kebenaran
- Gunakan exception Nest.js (NotFoundException, UnprocessableEntityException) — jangan throw string
