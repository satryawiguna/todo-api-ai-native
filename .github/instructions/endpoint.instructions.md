---
applyTo: "src/controllers/**,src/routes/**"
---

# Endpoint Instructions

## Controller Pattern

```ts
// src/controllers/task.controller.ts
import { Request, Response, NextFunction } from 'express'
import { taskService } from '@/services/task.service'
import { createTaskSchema } from '@/lib/validators/task.validator'

export const taskController = {
  create: async (req: Request, res: Response, next: NextFunction) =&gt; {
    try {
      // 1. Validate input (Zod)
      const dto = createTaskSchema.parse(req.body)
      // 2. Call service
      const task = await taskService.create(req.user!.id, dto)
      // 3. Return response
      res.status(201).json({ success: true, data: task })
    } catch (error) {
      next(error)
    }
  },
}
```

## Route Pattern
```ts
// src/routes/task.route.ts
import { Router } from 'express'
import { taskController } from '@/controllers/task.controller'
import { authenticate } from '@/middlewares/auth.middleware'

const router = Router()
router.use(authenticate) // semua task route memerlukan auth
router.get('/', taskController.getAll)
router.post('/', taskController.create)
router.get('/:id', taskController.getById)
router.patch('/:id', taskController.update)
router.delete('/:id', taskController.delete)

export default router
```
