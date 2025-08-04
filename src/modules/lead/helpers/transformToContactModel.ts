import type { AddLeadSchemaType } from "../contracts/add.lead";
import { LeadModel } from "../models/lead.model";

const transformToLeadModel = (lead: AddLeadSchemaType[0]): LeadModel => {
    return {
        ...lead,
        name: lead.name?.trim(),
        custom_fields_values: lead.custom_fields_values?.length
            ? JSON.parse(JSON.stringify({custom_fields_values: lead.custom_fields_values}))
            : null,
        tags_to_add: lead.tags_to_add?.length
            ? JSON.parse(JSON.stringify({tags_to_add: lead.tags_to_add}))
            : null,
        _embedded: lead._embedded
            ? JSON.parse(JSON.stringify({_embedded: lead._embedded}))
            : null
    };
};

export default transformToLeadModel
