import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TodoModule } from './todos/todo.module';
import { HealthModule } from './health/health.module';
import { databaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env.validation';

@Module({
  imports: [
    // Environment config dengan validasi Zod — fail fast jika ada yang salah
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envValidationSchema.parse(config),
    }),

    // TypeORM — database
    TypeOrmModule.forRoot(databaseConfig()),

    // Rate limiting — 100 request/menit per IP (sesuai security-guidelines.md)
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
      limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
    }]),

    // Feature modules
    TodoModule,
    HealthModule,
  ],
  providers: [
    // Global rate limit guard
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
