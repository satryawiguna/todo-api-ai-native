---
description: "Gunakan saat menulis atau mengubah test Nest.js. Mencakup unit test service dan E2E test controller."
applyTo:
  - "**/*.spec.ts"
  - "**/*.e2e-spec.ts"
---

# Testing Instructions — Backend

## Unit Test (Service)
- Mock repository dengan `getRepositoryToken(Entity)`
- Gunakan `jest.clearAllMocks()` di `beforeEach`
- Test: happy path, validasi input, error handling, business rules
- Format: `describe('Method', () => { it('should ...', () => {}) })`

## E2E Test (Controller)
- Gunakan Supertest: `request(app.getHttpServer()).get('/todos')`
- Test response status code + body shape
- Test error cases: 400, 404, 422
- Gunakan database test terpisah

## Konvensi Umum
- Deskripsi test dalam bahasa Indonesia
- Satu `it` untuk satu skenario
- Test business rules secara eksplisit
- Ikuti `standards/testing-standards.md` dari MCP server `todo-shared-context`

## Best Practice
- ✅ Nama test deskriptif: `it('should throw NotFoundException saat todo tidak ditemukan', ...)`
- ✅ Gunakan `await` di semua async assertion — jangan `done()` callback
- ✅ Group test per method: `describe('findAll', () => { ... })`
- ✅ Test edge case: input kosong, nilai boundary, karakter spesial
- ❌ Jangan test implementasi internal — test behavior (input → output)
- ❌ Jangan share state antar test — setiap test harus independen
- ❌ Jangan mock `jest.fn()` langsung — gunakan `getRepositoryToken()` untuk TypeORM

## Referensi
- Jest docs: [Mock Functions](https://jestjs.io/docs/mock-functions)
- Nest.js docs: [Testing](https://docs.nestjs.com/fundamentals/testing)
- `.github/agents/test-reviewer.agent.md` — gunakan untuk review kualitas test
