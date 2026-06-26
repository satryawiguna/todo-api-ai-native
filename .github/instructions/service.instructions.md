---
applyTo: "src/services/**"
---

# Service Layer Instructions

## Rules
- Service berisi business logic dan orchestration antar repository
- Service tidak boleh langsung import DB connection atau execute query
- Service tidak boleh akses `req` atau `res` (framework-agnostic)
- Throw `AppError` untuk business rule violations

## Pattern

```ts
// src/services/task.service.ts
import { taskRepository } from '@/repositories/task.repository'
import { AppError } from '@/lib/errors'
import type { CreateTaskDto, Task } from '@/models/task.model'

export const taskService = {
  create: async (userId: string, dto: CreateTaskDto): Promise<Task> => {
    // Business rule validation
    if (dto.dueDate && new Date(dto.dueDate) < new Date()) {
      throw new AppError('INVALID_DUE_DATE', 'Due date cannot be in the past', 400)
    }
    return taskRepository.create(userId, dto)
  },

  getById: async (userId: string, taskId: string): Promise<Task> => {
    const task = await taskRepository.findById(taskId)
    if (!task) throw new AppError('NOT_FOUND', 'Task not found', 404)
    // BR-01: user hanya bisa akses task miliknya
    if (task.userId !== userId) throw new AppError('FORBIDDEN', 'Access denied', 403)
    return task
  },
}
```
