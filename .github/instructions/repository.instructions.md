---
applyTo: "src/repositories/**"
---

# Repository Layer Instructions

## Rules
- Repository hanya boleh berisi query DB, tidak ada business logic
- Selalu gunakan parameterized query untuk mencegah SQL injection
- Gunakan soft delete (update `deleted_at`) bukan hard delete
- Kembalikan typed result, tidak pernah return `any`

## Pattern

```ts
// src/repositories/task.repository.ts
import { db } from '@/lib/db'
import type { CreateTaskDto, Task } from '@/models/task.model'

export const taskRepository = {
  create: async (userId: string, dto: CreateTaskDto): Promise<Task> => {
    const [result] = await db.execute(
      `INSERT INTO tasks (id, user_id, title, description, priority, due_date)
       VALUES (UUID(), ?, ?, ?, ?, ?)`,
      [userId, dto.title, dto.description, dto.priority, dto.dueDate]
    )
    // fetch and return created record
    return taskRepository.findById((result as any).insertId)
  },

  findById: async (id: string): Promise<Task | null> => {
    const [rows] = await db.execute<Task[]>(
      `SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL`,
      [id]
    )
    return rows[0] ?? null
  },
}
```

## Soft Delete
```ts
delete: async (id: string): Promise<void> => {
  await db.execute(
    `UPDATE tasks SET deleted_at = NOW() WHERE id = ?`,
    [id]
  )
}
```
