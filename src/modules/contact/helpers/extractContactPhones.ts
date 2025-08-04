import { formatPhoneNumber } from "../../../common/helpers/formatPhoneNumber";
import type { AddContactSchemaType } from "../contracts/add.contract";

const extractContactPhones = (contact: AddContactSchemaType[0]): Set<string> => {
    if (!contact.custom_fields_values?.length) {
        return new Set();
    }

    const phoneNumbers = new Set<string>();
    
    for (const fieldValue of contact.custom_fields_values) {
        if (fieldValue.field_type === "multitext" && 
            (fieldValue.field_code === "PHONE" || fieldValue.field_id === 948641)) {
            
            for (const value of fieldValue.values) {
                try {
                    const formattedPhone = '+' + formatPhoneNumber(String(value.value));
                    phoneNumbers.add(formattedPhone);
                } catch (error) {
                    console.warn(`Failed to format phone number: ${value.value}`);
                    continue;
                }
            }
        }
    }

    return phoneNumbers;
};

export default extractContactPhones