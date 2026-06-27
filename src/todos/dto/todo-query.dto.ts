import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TodoQueryDto {
  @ApiPropertyOptional({ description: 'Nomor halaman', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Item per halaman', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Filter status', enum: ['active', 'completed'] })
  @IsOptional()
  @IsEnum(['active', 'completed'])
  status?: 'active' | 'completed';

  @ApiPropertyOptional({ description: 'Filter prioritas', enum: ['low', 'medium', 'high'] })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({ description: 'Cari berdasarkan judul' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Urutkan berdasarkan', enum: ['createdAt', 'updatedAt', 'title', 'priority'], default: 'createdAt' })
  @IsOptional()
  @IsEnum(['createdAt', 'updatedAt', 'title', 'priority'])
  sort?: 'createdAt' | 'updatedAt' | 'title' | 'priority' = 'createdAt';

  @ApiPropertyOptional({ description: 'Arah urutan', enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';
}
