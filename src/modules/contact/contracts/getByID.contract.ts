import { customFieldValueSchema } from '../../../common/contracts/fieldValue.contract';
import { z } from 'zod';

const tagSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string().nullable(),
});

const companySchema = z.object({
    id: z.number(),
});

const customerSchema = z.object({
    id: z.number(),
});

const leadSchema = z.object({
    id: z.number(),
});

const catalogElementSchema = z.object({
    id: z.number(),
    metadata: z.object({}).optional(),
    quantity: z.number().refine(val => val >= 0, {
        message: "Количество должно быть неотрицательным",
    }),
    catalog_id: z.number(),
    price_id: z.number(),
});


export const GetByIdContactSchema = z.object({
    name: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    responsible_user_id: z.number().optional(),
    group_id: z.number().optional(),
    created_by: z.number().optional(),
    updated_by: z.number().optional(),
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
    is_deleted: z.boolean().optional(),
    is_unsorted: z.boolean().optional(),
    closest_task_at: z.number().nullable().optional(),
    custom_fields_values: z.array(customFieldValueSchema).nullable().optional(),
    account_id: z.number().optional(),
    _embedded: z.object({
        tags: z.array(tagSchema).optional(),
        companies: z.array(companySchema).optional(),
        customers: z.array(customerSchema).optional(),
        leads: z.array(leadSchema).optional(),
        catalog_elements: z.array(catalogElementSchema).optional(),
    }).optional(),
});


export type GetByIdContactSchemaType = z.infer<typeof GetByIdContactSchema>;
