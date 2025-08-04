import { z } from 'zod';

export const AddChatContactSchema = z.array(z.object({
    chat_id: z.string(), 
    contact_id: z.number(),
    request_id: z.string().optional(),
}));

export type AddChatContactSchemaType = z.infer<typeof AddChatContactSchema>;
