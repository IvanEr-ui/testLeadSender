import BaseDataBase from "../../../common/classes/BaseDataBase";
import { AddContactSchemaType } from "../contracts/add.contract";
import { ContactModel } from "../models/contact.model";
import { PhoneModel } from "../models/phone.model";
import { PhonesContactModel } from "../models/phones_contact.model";
import transformToContactModel from "./transformToContactModel";
import extractContactPhones from "./extractContactPhones";
import isNameUnique from "../../../common/helpers/isNameUnique";


export interface ContactSaveResult {
    saveContact?: AddContactSchemaType[0];
    skipContact?: AddContactSchemaType[0];
    reason?: 'duplicate_name' | 'missing_contacts' | 'success';
}
export const checkDuplicateAndSaveOneContact = async (
    tableContact: string,
    db: BaseDataBase,
    contact: AddContactSchemaType[0]
): Promise<ContactSaveResult> => {
    try {
        if (await isNameUnique(tableContact, db, contact.name)) return {skipContact: contact, reason: 'duplicate_name'}
       
        return await db.transaction(async (transaction) => {
            const phonesDB: string[] = (await transaction("phone").select<PhoneModel[]>("phone_number"))
                .map(phone => phone.phone_number);

            const insertContact: ContactModel = transformToContactModel(contact);
            const contactPhones: Set<string> = extractContactPhones(contact);

            if (contactPhones.size === 0) {
                await transaction(tableContact).insert(insertContact);
                return {saveContact: contact, reason: 'success'}
            }

            const hasDuplicatePhone = Array.from(contactPhones).some(phone => phonesDB.includes(phone));
            if (hasDuplicatePhone) return {skipContact: contact, reason: 'missing_contacts'}

            const [contactId] = await transaction(tableContact).insert(insertContact);
            for (const phone of contactPhones) {
                const phoneInsert: PhoneModel = { phone_number: phone }
                const [phoneId] = await transaction("phone").insert(phoneInsert)
                    
                const phoneContactInsert: PhonesContactModel = {
                    id_contact: contactId,
                    id_phone: phoneId
                }
                await transaction("phones_contact").insert(phoneContactInsert);
            }
            return {saveContact: contact, reason: 'success'}
        })
    } catch (error) {
        console.error('Error in contact processing:', error);
        throw new Error(`Failed to process contacts: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export default checkDuplicateAndSaveOneContact