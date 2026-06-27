import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoQueryDto } from './dto/todo-query.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Daftar todo dengan paginasi, filter, dan pencarian' })
  @ApiResponse({ status: 200, description: 'Daftar todo berhasil diambil' })
  findAll(@Query() query: TodoQueryDto) {
    return this.todoService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail satu todo' })
  @ApiResponse({ status: 200, description: 'Todo ditemukan' })
  @ApiResponse({ status: 404, description: 'Todo tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat todo baru' })
  @ApiResponse({ status: 201, description: 'Todo berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Validasi input gagal' })
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Ubah todo' })
  @ApiResponse({ status: 200, description: 'Todo berhasil diubah' })
  @ApiResponse({ status: 404, description: 'Todo tidak ditemukan' })
  @ApiResponse({ status: 422, description: 'Melanggar aturan bisnis (todo completed)' })
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus todo (soft delete)' })
  @ApiResponse({ status: 200, description: 'Todo berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Todo tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
