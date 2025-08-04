import { z } from 'zod';

const tagSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
}).refine(data => data.id !== undefined || data.name !== undefined, {
    message: "Необходимо указать либо id, либо name для тега",
});

const customFieldSchema = z.object({
    field_id: z.number().optional(),
    field_code: z.string().optional(),
    values: z.array(z.object({
        value: z.union([z.string(), z.number()]), 
    })),
});

export const UpdateOneLeadSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(), 
    price: z.number().optional(), 
    status_id: z.number().optional(), 
    pipeline_id: z.number().optional(),
    created_by: z.number().optional(), 
    updated_by: z.number().optional(), 
    closed_at: z.number().optional(),
    created_at: z.number().optional(), 
    updated_at: z.number().optional(), 
    loss_reason_id: z.number().optional(), 
    responsible_user_id: z.number().optional(), 
    custom_fields_values: z.array(customFieldSchema).optional(),
    tags_to_add: z.array(tagSchema).optional(),
    tags_to_delete: z.array(tagSchema).optional(),
    _embedded: z.object({
        tags: z.array(tagSchema).optional(),
    }).optional(),
});
export const UpdateLeadSchema = z.array(UpdateOneLeadSchema)

export type UpdateLeadSchemaType = z.infer<typeof UpdateLeadSchema>;
export type UpdateOneLeadSchemaType = z.infer<typeof UpdateOneLeadSchema>;

