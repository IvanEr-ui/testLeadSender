import { z } from 'zod';

export const GetChatContactSchema = z.object({
    id: z.number(),
    contact_id: z.number(),
    chat_id: z.string(),
});

export type GetChatContactSchemaType = z.infer<typeof GetChatContactSchema>;
