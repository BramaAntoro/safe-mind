import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi').max(50),
  icon: z.string().min(1, 'Icon wajib diisi'),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Format warna tidak valid'),
})

export type CategoryInput = z.infer<typeof categorySchema>
