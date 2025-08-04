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
    quantity: z.number(),
    catalog_id: z.number(),
    price_id: z.number(),
});

const sourceSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const GetByIdLeadSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    responsible_user_id: z.number(),
    group_id: z.number(),
    status_id: z.number(),
    loss_reason_id: z.number().nullable().optional(),
    source_id: z.number().optional(),
    created_by: z.number(),
    updated_by: z.number(),
    closed_at: z.number().nullable().optional(),
    created_at: z.number(),
    updated_at: z.number(),
    closest_task_at: z.number().nullable().optional(),
    is_deleted: z.boolean(),
    custom_fields_values: z.array(z.object({})).nullable(),
    score: z.number().nullable(),
    account_id: z.number(),
    labor_cost: z.number().nullable().optional(),
    is_price_modified_by_robot: z.boolean().optional(),
    _embedded: z.object({
        loss_reason: lossReasonSchema.optional(),
        tags: z.array(tagSchema).optional(),
        contacts: z.array(contactSchema).optional(),
        companies: z.array(companySchema).min(0),
        catalog_elements: z.array(catalogElementSchema).optional(),
        source: sourceSchema.optional(),
    }),
});

export type GetByIdLeadSchemaType = z.infer<typeof GetByIdLeadSchema>;
