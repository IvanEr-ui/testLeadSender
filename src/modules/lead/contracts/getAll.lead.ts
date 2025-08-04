import { customFieldValueSchema } from '../../../common/contracts/fieldValue.contract';
import { z } from 'zod';

const lossReasonSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const tagSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string().nullable(),
});

const contactSchema = z.object({
    id: z.number(),
    is_main: z.boolean(),
});

const companySchema = z.object({
    id: z.number(),
});

const catalogElementSchema = z.object({
    id: z.number(),
    metadata: z.object({}).optional(), 
    quantity: z.number().nullable(),
    catalog_id: z.number(),
    price_id: z.number(),
});

const sourceSchema = z.object({
    id: z.number(),
    name: z.string(),
});

const embeddedSchema = z.object({
    loss_reason: lossReasonSchema.optional(),
    tags: z.array(tagSchema).optional(),
    contacts: z.array(contactSchema).optional(),
    companies: z.array(companySchema).optional(),
    catalog_elements: z.array(catalogElementSchema).optional(),
    source: sourceSchema.optional(),
});

export const GetAllLeadSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    responsible_user_id: z.number(),
    group_id: z.number(),
    status_id: z.number(),
    pipeline_id: z.number(),
    loss_reason_id: z.number().nullable(),
    source_id: z.number().nullable().optional(),
    created_by: z.number(),
    updated_by: z.number(),
    closed_at: z.number().nullable(),
    created_at: z.number(),
    updated_at: z.number(),
    closest_task_at: z.number().nullable(),
    is_deleted: z.boolean(),
    custom_fields_values: z.array(customFieldValueSchema).nullable(),
    score: z.number().nullable(),
    account_id: z.number(),
    labor_cost: z.number().nullable(),
    is_price_modified_by_robot: z.boolean().optional(), 
    _embedded: embeddedSchema,
}));


export type GetAllLeadSchemaType = z.infer<typeof GetAllLeadSchema>;
