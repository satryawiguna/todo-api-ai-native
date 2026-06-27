---
paths:
  - "src/**/*.ts"
---

# Backend API Rules

- Semua endpoint harus memiliki validasi input (class-validator)
- Response format: `{ data }` untuk single, `{ data, meta }` untuk list, `{ error }` untuk error
- Business rules — baca `business/business-rules.md` dari MCP server `todo-shared-context`
- API contracts — baca `architecture/api-contracts.md` dari MCP server `todo-shared-context`
- Gunakan exception Nest.js (NotFoundException, UnprocessableEntityException) — jangan throw string
