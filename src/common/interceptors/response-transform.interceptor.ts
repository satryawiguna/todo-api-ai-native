import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Membungkus response dalam format { data: ... } yang konsisten.
 * Jika response sudah memiliki key 'data' atau 'error', tidak diubah.
 */
@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Jika sudah dalam format { data } atau { error }, lewati
        if (data && (data.data !== undefined || data.error !== undefined || data.meta !== undefined)) {
          return data;
        }
        return { data };
      }),
    );
  }
}
