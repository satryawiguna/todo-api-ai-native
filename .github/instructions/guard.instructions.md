---
description: "Gunakan saat menulis atau mengubah Guard di Nest.js. Mencakup AuthGuard, RoleGuard, custom decorator, ExecutionContext."
applyTo:
  - "**/*.guard.ts"
---

# Guard Instructions

## Pola Dasar
- Semua guard implements `CanActivate`
- Gunakan `@Injectable()` untuk dependency injection
- Return `true` / `false` atau `Promise<boolean>` / `Observable<boolean>`

## Auth Guard
- Ekstrak token dari `request.headers.authorization`
- Format: `Bearer <token>`
- Jika tidak ada token → throw `UnauthorizedException`
- Attach user info ke `request.user` setelah verifikasi

## Role / Permission Guard
- Gunakan custom decorator untuk metadata: `@Roles('admin')`
- Guard membaca metadata via `Reflector.get('roles', context.getHandler())`
- Throw `ForbiddenException` jika role tidak cocok

## ExecutionContext
- `context.switchToHttp().getRequest()` untuk HTTP request
- `context.getHandler()` untuk mendapatkan handler metadata
- `context.getClass()` untuk mendapatkan class metadata

## Custom Decorator
- Gunakan `@SetMetadata('key', value)` atau `createParamDecorator()`
- Contoh: `@Roles()`, `@CurrentUser()`, `@Public()` (skip auth)
- Simpan decorator di `src/common/decorators/`

## Best Practice
- ✅ Satu guard = satu tanggung jawab
- ✅ Kombinasikan guard via `@UseGuards(GuardA, GuardB)` — urutan penting
- ✅ Gunakan `APP_GUARD` untuk global guard
- ❌ Jangan handle response di guard — gunakan interceptor/filter
- ❌ Jangan inject service yang melakukan side-effect di guard

## Referensi
- Nest.js docs: [Guards](https://docs.nestjs.com/guards)
- Nest.js docs: [Custom Decorators](https://docs.nestjs.com/custom-decorators)

## Referensi
- Nest.js docs: [Guards](https://docs.nestjs.com/guards)
- Nest.js docs: [Custom Decorators](https://docs.nestjs.com/custom-decorators)
