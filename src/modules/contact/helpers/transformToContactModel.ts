import { AddContactSchemaType } from "../contracts/add.contract";
import { ContactModel } from "../models/contact.model";

const transformToContactModel = (contact: AddContactSchemaType[0]): ContactModel => {
    return {
        ...contact,
        name: contact.name?.trim(),
        custom_fields_values: contact.custom_fields_values 
            ? JSON.parse(JSON.stringify({custom_fields_values: contact.custom_fields_values}))
            : null,
        _embedded: contact._embedded
            ? JSON.parse(JSON.stringify({_embedded: contact._embedded}))
            : null
    };
};

export default transformToContactModel
