import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

export type TodoStatus = 'active' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Index('idx_todos_status')
  @Column({ type: 'enum', enum: ['active', 'completed'], default: 'active' })
  status!: TodoStatus;

  @Index('idx_todos_priority')
  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })
  priority!: TodoPriority;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt!: Date | null;
}
