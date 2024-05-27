import { z } from 'zod';
import { createPracticeSchema } from './create-practice.dto';
export const updatePracticeSchema = createPracticeSchema.partial();
export type UpdatePracticeDto = z.infer<typeof updatePracticeSchema>;
