---
description: "Gunakan saat menulis atau mengubah Interceptor di Nest.js. Mencakup request/response lifecycle, rxjs operators, logging."
applyTo:
  - "**/*.interceptor.ts"
---

# Interceptor Instructions

## Pola Dasar
- Semua interceptor implements `NestInterceptor`
- Gunakan `@Injectable()` untuk dependency injection
- Return `Observable` — gunakan `.pipe()` untuk transformasi

## Response Transform
- Wrap response dalam `{ data }` envelope jika belum terformat
- Gunakan `map()` operator dari rxjs
- Cek `data.data`, `data.error`, `data.meta` — jika sudah ada, lewati

## Request Lifecycle
- `intercept(context, next)` dipanggil SEBELUM handler
- `next.handle().pipe(map(...))` untuk transformasi response — SESUDAH handler
- Akses request: `context.switchToHttp().getRequest()`

## Logging / Tracing
- Gunakan `Logger` Nest.js — bukan `console.log`
- Attach request ID: baca `X-Request-ID` header atau generate UUID
- Set `X-Request-ID` di response header untuk distributed tracing

## Timeout / Circuit Breaker
- Gunakan `timeout()` operator untuk batasi durasi request
- Gunakan `catchError()` untuk handle error gracefully

## Best Practice
- ✅ Satu interceptor = satu concern (logging, transform, timing)
- ✅ Daftarkan via `APP_INTERCEPTOR` untuk global
- ✅ Gunakan `@UseInterceptors()` untuk route-specific
- ✅ Pisahkan interceptor dari business logic
- ❌ Jangan throw exception di interceptor — gunakan `catchError()` + return fallback
- ❌ Jangan mutate request body — immutable approach

## Referensi
- Nest.js docs: [Interceptors](https://docs.nestjs.com/interceptors)
- RxJS docs: [Operators](https://rxjs.dev/guide/operators)
