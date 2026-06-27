---
description: "Gunakan saat menulis test Nest.js. Mencakup unit test service dan E2E test controller."
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
- Ikuti `standards/testing-standards.md` dari shared-context
