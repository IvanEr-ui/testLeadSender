import { z } from 'zod';

export const fieldTypes = [
    "text",
    "numeric",
    "checkbox",
    "select",
    "multiselect",
    "date",
    "url",
    "textarea",
    "radiobutton",
    "streetaddress",
    "smart_address",
    "legal_entity",
    "birthday",
    "date_time",
    "price",
    "category",
    "items",
    "multitext",
    "tracking_data",
    "linked_entity",
    "chained_list",
    "monetary",
    "file",
    "payer",
    "supplier"
]

export const customFieldValueSchema = z.object({
    field_id: z.number().optional(),
    field_code: z.string().optional(),
    field_type: z.enum(fieldTypes),
    values: z.array(z.object({
        value: z.union([z.string(), z.number()]),
    })),
});
