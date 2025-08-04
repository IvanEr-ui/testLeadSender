import { z } from 'zod';
import { GetByIdContactSchema } from './getByID.contract';

export const GetAllContactSchema = z.array(GetByIdContactSchema);

export type GetAllContactSchemaType = z.infer<typeof GetAllContactSchema>;
