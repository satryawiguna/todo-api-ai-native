import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Menambahkan X-Request-ID header ke setiap response untuk tracing.
 */
@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = request.headers['x-request-id'] || uuidv4();
    request.requestId = requestId;

    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Request-ID', requestId);

    return next.handle();
  }
}
