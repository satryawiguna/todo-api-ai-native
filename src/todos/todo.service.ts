import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Todo, TodoStatus, TodoPriority } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  /**
   * Mendapatkan daftar todo dengan paginasi, filter, dan pencarian.
   * Sesuai kontrak: GET /todos — architecture/api-contracts.md
   */
  async findAll(query: TodoQueryDto): Promise<{ data: Todo[]; meta: any }> {
    const { page = 1, limit = 10, status, priority, search, sort = 'createdAt', order = 'DESC' } = query;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Todo> = {};
    if (status) where.status = status as TodoStatus;
    if (priority) where.priority = priority as TodoPriority;
    if (search) where.title = Like(`%${search}%`);

    const [data, total] = await this.todoRepo.findAndCount({
      where,
      order: { [sort]: order },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Mendapatkan detail satu todo.
   * Sesuai kontrak: GET /todos/:id
   */
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepo.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException({ error: { code: 'NOT_FOUND', message: 'Todo tidak ditemukan' } });
    }
    return todo;
  }

  /**
   * Membuat todo baru.
   * Sesuai kontrak: POST /todos — status default: active, priority default: medium
   */
  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepo.create({
      title: dto.title.trim(),
      description: dto.description?.trim() || null,
      priority: dto.priority || 'medium',
      status: 'active',
    });
    return this.todoRepo.save(todo);
  }

  /**
   * Mengubah todo.
   * Sesuai kontrak: PUT /todos/:id
   * Aturan bisnis BR-01: todo completed tidak dapat diedit
   */
  async update(id: string, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);

    // BR-01: Todo yang sudah selesai tidak dapat diubah
    if (todo.status === 'completed') {
      throw new UnprocessableEntityException({
        error: {
          code: 'BUSINESS_RULE_VIOLATION',
          message: 'Todo yang sudah selesai tidak dapat diubah',
        },
      });
    }

    if (dto.title !== undefined) todo.title = dto.title.trim();
    if (dto.description !== undefined) todo.description = dto.description?.trim() || null;
    if (dto.status !== undefined) todo.status = dto.status;
    if (dto.priority !== undefined) todo.priority = dto.priority;

    return this.todoRepo.save(todo);
  }

  /**
   * Menghapus todo (soft delete).
   * Sesuai kontrak: DELETE /todos/:id
   * Aturan bisnis BR-04: data disimpan 30 hari sebelum dihapus permanen
   */
  async remove(id: string): Promise<{ message: string }> {
    const todo = await this.findOne(id);
    await this.todoRepo.softRemove(todo);
    return { message: 'Todo berhasil dihapus' };
  }
}
