import type { ContactService } from '../contact/contact.service';
import type { LeadService } from "modules/lead/lead.service";
import { WebHookContactAdd, WebHookContactType, WebHookContactUpdate } from './contracts/contact.contract';
import { WebHookLeadAdd, WebHookLeadType, WebhookLeadUpdate } from './contracts/lead.contract';
import WebHookAccount from './contracts/account.contract';


export class WebHookService {
    constructor(
        public readonly contactService: ContactService,
        public readonly leadsService: LeadService,
    ) {}
    
    public async handleContact(body: WebHookContactType){ 
        try {
            const account = WebHookAccount.parse(body.account)
            if (body.contacts.hasOwnProperty("update")) {
                const updateContacts = WebHookContactUpdate.parse(body.contacts)
                return await this.contactService.updateWebHook(account, updateContacts);
            }  
            if (body.contacts.hasOwnProperty("add")) {
                const addContacts = WebHookContactAdd.parse(body.contacts)
                return await this.contactService.addWebHook(account, addContacts);
            }  
            const errorMessage = "Неизвестное действие для Contacts";
            throw new Error(errorMessage);
        } catch (error) {
            throw error;
        }
    }
    public async handleLead(body: WebHookLeadType){
        try {
            const account = WebHookAccount.parse(body.account)
            if (body.leads.hasOwnProperty("update")) {
                const updateLeads = WebhookLeadUpdate.parse(body.leads)
                return await this.leadsService.updateWebHook(account, updateLeads);
            } 
            if (body.leads.hasOwnProperty("add")) {
                const updateLeads = WebHookLeadAdd.parse(body.leads)
                return await this.leadsService.addWebHook(account, updateLeads);
            } 
            
            const errorMessage = "Неизвестное действие для Leads";
            throw new Error(errorMessage);
        } catch (error) {
            throw error;
        }
    }
}