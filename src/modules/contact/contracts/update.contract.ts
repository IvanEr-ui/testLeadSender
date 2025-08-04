import { customFieldValueSchema } from '../../../common/contracts/fieldValue.contract';
import { z } from 'zod';

const tagSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(), 
}).refine(data => data.id !== undefined || data.name !== undefined, {
    message: "Необходимо указать либо id, либо name тега.",
});

export const UpdateOneContactSchema = z.object({
    id: z.number(),
    name: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    responsible_user_id: z.number().optional(),
    created_by: z.number().optional(),
    updated_by: z.number().optional(),
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
    custom_fields_values: z.array(customFieldValueSchema).nullable().optional(),
    tags_to_add: z.array(tagSchema).optional(),
    tags_to_delete: z.array(tagSchema).optional(), 
    _embedded: z.object({
        tags: z.array(tagSchema).optional(),
    }).optional(),
});
export const UpdateAllContactSchema = z.array(UpdateOneContactSchema)

export type UpdateOneContactSchemaType = z.infer<typeof UpdateOneContactSchema>;
export type UpdateAllContactSchemaType = z.infer<typeof UpdateAllContactSchema>;
