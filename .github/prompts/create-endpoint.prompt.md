---
mode: agent
tools: [codebase]
description: "Generate a new REST endpoint following clean architecture"
---

Buat endpoint baru untuk: **[DESKRIPSI ENDPOINT]**

Detail:
- Method: **[GET/POST/PATCH/DELETE]**
- Path: **[/v1/resource/:param]**
- Auth required: **[Ya/Tidak]**
- Request body / query params: **[deskripsi input]**
- Response: **[deskripsi output]**

Yang harus dibuat:
1. Zod validator di `src/lib/validators/[resource].validator.ts`
2. Controller method di `src/controllers/[resource].controller.ts`
3. Service method di `src/services/[resource].service.ts`
4. Repository method di `src/repositories/[resource].repository.ts`
5. Route registration di `src/routes/[resource].route.ts`
6. Unit test untuk service method
7. Integration test untuk endpoint

Ikuti pattern di `.github/instructions/` untuk masing-masing layer.
Business rules ada di `../todo-shared-ai-native/business/business-rules.md`.
