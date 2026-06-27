# Spesifikasi API

API backend mengikuti kontrak yang didokumentasikan di shared-context:
→ `../todo-shared-ai-native-orchestration/architecture/api-contracts.md`

## Ringkasan Endpoint

| Method | Path | Deskripsi |
|---|---|---|
| GET | `/todos` | Daftar todo (paginasi, filter, cari) |
| GET | `/todos/:id` | Detail satu todo |
| POST | `/todos` | Buat todo baru |
| PUT | `/todos/:id` | Ubah todo |
| DELETE | `/todos/:id` | Hapus todo (soft delete) |
| GET | `/health` | Health check |

## Format Response

Semua response mengikuti format standar:
- Single item: `{ "data": { ... } }`
- List: `{ "data": [...], "meta": { "page", "limit", "total", "totalPages" } }`
- Error: `{ "error": { "code", "message", "details?" } }`

## Autentikasi

MVP tidak memerlukan autentikasi. Semua endpoint bersifat publik.
Autentikasi akan ditambahkan di v1.
