import { z } from 'zod';

// Esquema para crear una práctica
export const createPracticeSchema = z.object({
  fecha: z.date(),
  duracion: z.string(),
  complicaciones: z.string(),
  resultadoFinal: z.string()
}).required();
export type CreatePracticeDto = z.infer<typeof createPracticeSchema>;
