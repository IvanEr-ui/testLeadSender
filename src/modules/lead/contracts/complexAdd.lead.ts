import { GetByIdContactSchema } from '../../../modules/contact/contracts/getByID.contract';
import { z } from 'zod';

const tagSchema = z.object({
    id: z.number().optional(),
    name: z.string().optional(),
}).refine(data => data.id !== undefined || data.name !== undefined, {
    message: "Необходимо указать либо id, либо name для тега",
});

const contactSchema = z.object({
    id: z.number().optional(),
})

const companySchema = z.object({
    id: z.number().optional(),
})

const sourceSchema = z.object({
    external_id: z.number().optional(),
    type: z.string().optional(),
});

export type Source = z.infer<typeof sourceSchema>;

const metadataSchema = z.object({
    category: z.enum(['sip', 'forms']),
}).optional();

export type Metadata = z.infer<typeof metadataSchema>;

export const ComplexAddLeadSchema = z.array(z.object({
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
    custom_fields_values: z.array(z.object({})).max(40).optional(), 
    tags_to_add: z.array(tagSchema).optional(),
    _embedded: z.object({
        tags: z.array(tagSchema).optional(),
        contacts: z.array(GetByIdContactSchema).optional(),
        companies: z.array(companySchema).max(1).optional(), 
        metadata: metadataSchema,
        source: sourceSchema.optional(),
    }).optional(),
}));

export type ComplexAddLeadSchemaType = z.infer<typeof ComplexAddLeadSchema>;
