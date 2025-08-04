import isNameUnique from "../../../common/helpers/isNameUnique";
import BaseDataBase from "../../../common/classes/BaseDataBase";
import { AddLeadSchemaType } from '../contracts/add.lead';
import { ContactModel } from "modules/contact/models/contact.model";
import transformToLeadModel from "./transformToContactModel";
import extractContactsIdLead from "./extractContactsIdLead";
import { ContactLeadModel } from "../models/contact_lead.model";


export interface LeadSaveResult {
    saveLead?: AddLeadSchemaType[0];
    skipLead?: AddLeadSchemaType[0];
    reason?: 'duplicate_name' | 'missing_contacts' | 'success';
}
export const checkDuplicateAndSaveOneLead = async (
    tableLead: string,
    db: BaseDataBase,
    lead: AddLeadSchemaType[0]
): Promise<LeadSaveResult> => {
    try {
        if (await isNameUnique(tableLead, db, lead.name)) return {skipLead: lead, reason: 'duplicate_name'}

        return await db.transaction(async (transaction) => {
            const contactsDB: number[] = (await transaction('contacts').select("id"))
                .map((contact)=>contact.id)

            const insertLead: ContactModel = transformToLeadModel(lead);
            const leadContactsId = extractContactsIdLead(lead)

            if (leadContactsId.size === 0) {
                await transaction(tableLead).insert(insertLead);
                return {saveLead: lead, reason: 'success'}
            }

            const [leadId] = await transaction(tableLead).insert(insertLead);
            for (const contactId of leadContactsId) {
                if(contactsDB.some((contactDB)=> contactDB == contactId)){
                    const phoneContactInsert: ContactLeadModel = {
                        id_contact: contactId,
                        id_lead: leadId
                    }
                    await transaction("contact_lead").insert(phoneContactInsert);
                } else{
                    return {skipLead: lead, reason: 'missing_contacts'}
                }
            }
            return {saveLead: lead, reason: 'success'}
        })
    } catch (error) {
        console.error('Error in lead processing:', error);
        throw new Error(`Failed to process leads: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export default checkDuplicateAndSaveOneLead