---
description: "Gunakan saat menulis entity TypeORM atau migration. Mencakup dekorator, indeks, soft delete."
applyTo:
  - "**/*.entity.ts"
  - "**/migrations/**"
---

# TypeORM Instructions

## Entity
- Gunakan dekorator `@Entity('nama_tabel')` — tabel plural snake_case
- Primary key: `@PrimaryGeneratedColumn('uuid')`
- Tambahkan indeks untuk kolom yang sering difilter: `@Index('idx_nama')`
- Gunakan `@CreateDateColumn`, `@UpdateDateColumn`, `@DeleteDateColumn` untuk timestamp
- Nama kolom eksplisit: `@Column({ name: 'created_at' })`

## Soft Delete
- Untuk soft delete, cukup tambahkan `@DeleteDateColumn()`
- Repository otomatis menambahkan filter `WHERE deleted_at IS NULL`
- Gunakan `repository.softRemove()` atau `repository.softDelete()`

## Relations
- Gunakan `@ManyToOne`, `@OneToMany`, dll. dengan eager/lazy sesuai kebutuhan
- Foreign key eksplisit: `@JoinColumn({ name: 'user_id' })`

## Migration
- `synchronize: true` HANYA untuk development
- Untuk production: generate migration → review → run
- Nama migration deskriptif: `CreateTodosTable`, `AddPriorityColumn`
