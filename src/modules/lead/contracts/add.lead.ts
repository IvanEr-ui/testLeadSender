import { customFieldValueSchema } from '../../../common/contracts/fieldValue.contract';
import { z } from 'zod';

const tagSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
});

const contactSchema = z.object({
    id: z.number(),
    is_main: z.string().optional(),
});

const companySchema = z.object({
    id: z.number(),
});

const sourceSchema = z.object({
    external_id: z.number().optional(),
    type: z.string().optional(),
});

export const AddLeadSchema = z.array(z.object({
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
    custom_fields_values: z.array(customFieldValueSchema).optional(), 
    tags_to_add: z.array(tagSchema).optional(),
    _embedded: z.object({
        tags: z.array(tagSchema).optional(),
        contacts: z.array(contactSchema).optional(),
        companies: z.array(companySchema).length(1).optional(),
        source: sourceSchema.optional()
    }).optional(),
}));

export type AddLeadSchemaType = z.infer<typeof AddLeadSchema>;
