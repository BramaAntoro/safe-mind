import { z } from 'zod'

export const activitySchema = z.object({
  name: z.string().min(1, 'Nama kegiatan wajib diisi').max(100, 'Maksimal 100 karakter'),
  mood: z.enum(['GREAT', 'GOOD', 'NEUTRAL', 'BAD', 'AWFUL']),
  energy_level: z.coerce.number().int().min(1).max(5),
  duration: z.coerce.number().int().min(1).max(1440).nullable(),
  notes: z.string().max(1000, 'Maksimal 1000 karakter').nullable().optional(),
  category_id: z.string().uuid().nullable().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
})

export type ActivityInput = z.infer<typeof activitySchema>
