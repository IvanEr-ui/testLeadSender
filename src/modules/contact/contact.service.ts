import { GetAllContactSchema } from './contracts/getAll.contract';
import { GetByIdContactSchema } from './contracts/getByID.contract';
import { AddContactSchemaType } from './contracts/add.contract';
import { UpdateAllContactSchemaType, UpdateOneContactSchemaType } from './contracts/update.contract';
import { AddChatContactSchemaType } from './contracts/addChat.contract';
import { GetChatContactSchema } from './contracts/getChat.contract';
import instance from '../../config/api';
import DataBaseHelper from '../../helpers/DataBaseHelper';
import { WebHookContactAddType, WebHookContactUpdateType } from '../../modules/webhook/contracts/contact.contract';
import checkDuplicateAndSaveOneContact from './helpers/checkDuplicateAndSaveOneContact';
import { WebHookAccountType } from '../../modules/webhook/contracts/account.contract';
import { WebhookContactModel } from './models/webhookcontract.model';


export class ContactService {
    constructor(public readonly dbHelper: DataBaseHelper){}
    private tableName: string = 'contacts'

    public async getAll(){
        try {
            const response = await instance.get('/contacts');
            if (!response.data._embedded.contacts) return ('No contacts data found in response');
            GetAllContactSchema.parse(response.data._embedded.contacts);

            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async getByID(id: string){
         try {
            const response = await instance.get(`/contacts/${id}`);
            if (!response.data) return ('No contact data found in response')
            GetByIdContactSchema.parse(response.data);

            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async add(contacts: AddContactSchemaType) {
        const db = this.dbHelper.db;
        let connection;
        
        try {
            connection = await db.connect();
            if(connection){
                const result: {
                    saveContacts: {
                        contact: AddContactSchemaType[0],
                        reason?: string
                    }[],
                    skipContacts: {
                        contact: AddContactSchemaType[0],
                        reason?: string
                    }[],
                    requestRespond: any;
                    errorSave: any
                } = {
                    saveContacts: [],
                    skipContacts: [],
                    requestRespond: [],
                    errorSave: []
                }

                for await (let contact of contacts){
                    try {
                        const saveResult = await checkDuplicateAndSaveOneContact(this.tableName, db, contact);
                        if (saveResult.saveContact) {
                            result.saveContacts.push({
                                contact: saveResult.saveContact,
                                reason: saveResult.reason
                            });
                            const resData = await instance.post('/contacts', [saveResult.saveContact]);
                            result.requestRespond.push(resData.data)
                        }
                        if (saveResult.skipContact) {
                            result.skipContacts.push({
                                contact: saveResult.skipContact,
                                reason: saveResult.reason
                            });
                        }
                    } catch (error) {
                        result.errorSave.push(`Error processing contact ${contact.name}: ${error}`)
                        continue;
                    }
                }
                
                return result;
            }
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await db.disconnect();
            }
        }
    }
    public async updateAll(contactsUpdate: UpdateAllContactSchemaType){
        try {
            const response = await instance.patch('/contacts', contactsUpdate);
            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async updateOne(id: string, contactUpdate: UpdateOneContactSchemaType){
        try {
            const response = await instance.patch(`/contacts/${id}`, contactUpdate);
            return response.data;
        } catch (error: any) {
           throw error
        }
    }
    public async addChat(chat: AddChatContactSchemaType){
        try {
            const response = await instance.post(`/contacts/chats`, chat);
            return response.data;
        } catch (error: any) {
           throw error
        }
    }
    public async getChats(){
        try {
            const response = await instance.get(`/contacts/chats`);
            if (!response.data) return ('No chats data found in response')
            GetChatContactSchema.parse(response.data);

            return response.data;
        } catch (error: any) {
           throw error
        }
    }

    public async updateWebHook(account: WebHookAccountType, update: WebHookContactUpdateType){
        const db = this.dbHelper.db;
        let connection;
                
        try {
            connection = await db.connect();
            const insertData: WebhookContactModel = {
                account: JSON.parse(JSON.stringify({account: account})),
                update: JSON.parse(JSON.stringify({update: update.update}))
            }
            await db.insert("webhookcontact", insertData)
            return insertData;
            
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await db.disconnect();
            }
        }
    }
    public async addWebHook(account: WebHookAccountType, add: WebHookContactAddType){
        const db = this.dbHelper.db;
        let connection;
                
        try {
            connection = await db.connect();
            const insertData: WebhookContactModel = {
                account: JSON.parse(JSON.stringify({account: account})),
                add: JSON.parse(JSON.stringify({add: add.add}))
            }
            await db.insert("webhookcontact", insertData)
            return insertData;
            
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await db.disconnect();
            }
        }
    }
}