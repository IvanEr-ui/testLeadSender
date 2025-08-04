import type { AddLeadSchemaType } from "../contracts/add.lead";

const extractContactsIdLead = (lead: AddLeadSchemaType[0]): Set<number> => {
    if (!lead._embedded || !lead._embedded.contacts?.length) {
        return new Set();
    }

    const contactsID = new Set<number>();
    
    for (const contact of lead._embedded.contacts) {
        contactsID.add(contact.id)
    }
    return contactsID;
};

export default extractContactsIdLead