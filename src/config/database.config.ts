import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from '../todos/todo.entity';

export function databaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'todo_secret',
    database: process.env.DB_DATABASE || 'todo_db',
    entities: [Todo],
    synchronize: process.env.NODE_ENV === 'development', // HANYA untuk development!
    logging: process.env.NODE_ENV === 'development',
    migrations: ['src/database/migrations/*.ts'],
  };
}
