---
applyTo: "src/**/*.test.ts,tests/**"
---

# Testing Instructions — API

## Unit Test (Service Layer)
Mock repository, test business logic secara isolasi:

```ts
// src/services/__tests__/task.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { taskService } from '../task.service'
import { taskRepository } from '@/repositories/task.repository'

vi.mock('@/repositories/task.repository')

describe('taskService.create', () => {
  it('should throw if due date is in the past', async () => {
    await expect(
      taskService.create('user-1', { title: 'Test', dueDate: '2020-01-01', priority: 'medium' })
    ).rejects.toMatchObject({ code: 'INVALID_DUE_DATE' })
  })
})
```

## Integration Test (API Layer)
Gunakan Supertest dengan DB test (SQLite in-memory atau MySQL test DB):

```ts
// tests/integration/task.test.ts
import request from 'supertest'
import app from '@/app'

describe('POST /v1/tasks', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).post('/v1/tasks').send({ title: 'Test' })
    expect(res.status).toBe(401)
  })
})
```
