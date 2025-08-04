import { z } from 'zod';
import { GetByIdContactSchema } from './getByID.contract';


export const AddContactSchema = z.array(GetByIdContactSchema)

export type AddContactSchemaType = z.infer<typeof AddContactSchema>;
