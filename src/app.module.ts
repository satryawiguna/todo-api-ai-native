import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TodoModule } from './todos/todo.module';
import { HealthModule } from './health/health.module';
import { databaseConfig } from './config/database.config';
import { envValidationSchema } from './config/env.validation';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { RequestIdInterceptor } from './common/interceptors/request-id.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';

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

    // Global exception filter — konsistenkan error response envelope
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },

    // Global interceptors — request tracing & response transform
    { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}
