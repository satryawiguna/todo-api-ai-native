import { z } from 'zod';

export const envValidationSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_DATABASE: z.string().min(1),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
  CORS_ORIGIN: z.string().url().optional(),
  THROTTLE_TTL: z.string().transform(Number).optional(),
  THROTTLE_LIMIT: z.string().transform(Number).optional(),
});
