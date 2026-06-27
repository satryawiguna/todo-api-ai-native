import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorBody: any = {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Terjadi kesalahan internal',
      },
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        errorBody = exceptionResponse;
      } else {
        errorBody = {
          error: {
            code: 'ERROR',
            message: exceptionResponse,
          },
        };
      }
    } else {
      // Jangan tampilkan detail error di production
      this.logger.error(`Unhandled exception: ${exception}`, (exception as any)?.stack);
    }

    response.status(status).json(errorBody);
  }
}
