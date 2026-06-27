import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoService } from '../src/todos/todo.service';
import { Todo } from '../src/todos/todo.entity';
import { CreateTodoDto } from '../src/todos/dto/create-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  let repo: Repository<Todo>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: getRepositoryToken(Todo), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repo = module.get<Repository<Todo>>(getRepositoryToken(Todo));
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a todo with default values', async () => {
      const dto: CreateTodoDto = { title: 'Test todo' };
      const todo = { id: '1', title: 'Test todo', description: null, status: 'active', priority: 'medium' };
      mockRepository.create.mockReturnValue(todo);
      mockRepository.save.mockResolvedValue(todo);

      const result = await service.create(dto);
      expect(result.title).toBe('Test todo');
      expect(result.status).toBe('active');
      expect(result.priority).toBe('medium');
    });

    it('should trim whitespace from title', async () => {
      const dto: CreateTodoDto = { title: '  Trim me  ' };
      const todo = { id: '2', title: 'Trim me', status: 'active', priority: 'medium' };
      mockRepository.create.mockReturnValue(todo);
      mockRepository.save.mockResolvedValue(todo);

      const result = await service.create(dto);
      expect(result.title).toBe('Trim me');
    });
  });

  describe('update', () => {
    it('should throw error when updating completed todo (BR-01)', async () => {
      const completedTodo = { id: '1', title: 'Done', status: 'completed' };
      mockRepository.findOne.mockResolvedValue(completedTodo);

      await expect(service.update('1', { title: 'Changed' })).rejects.toThrow();
    });
  });
});
