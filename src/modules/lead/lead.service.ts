import instance from "../../config/api";
import { GetAllLeadSchema } from "./contracts/getAll.lead";
import { GetByIdLeadSchema } from "./contracts/getByID.lead";
import { AddLeadSchemaType } from "./contracts/add.lead";
import { ComplexAddLeadSchemaType } from "./contracts/complexAdd.lead";
import { UpdateLeadSchemaType, UpdateOneLeadSchemaType } from "./contracts/update.lead";
import DataBaseHelper from "../../helpers/DataBaseHelper";
import { WebHookLeadAddType, WebhookLeadUpdateType } from "../../modules/webhook/contracts/lead.contract";
import checkDuplicateAndSaveOneLead from "./helpers/checkDuplicateAndSaveOneLead";
import { WebhookLeadModel } from "./models/webhooklead.model";
import { WebHookAccountType } from '../webhook/contracts/account.contract';

export class LeadService {
    constructor(public readonly dbHelper: DataBaseHelper){}
    private tableName: string = "leads"
    
    public async getAll(){
        try {
            const response = await instance.get('/leads');
            if (!response.data._embedded.leads) return ('No leads data found in response')
            GetAllLeadSchema.parse(response.data._embedded.leads);

            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async getByID(id: string){
        try {
            const response = await instance.get(`/leads/${id}`);
            if (!response.data) return ('No leads data found in response')
            GetByIdLeadSchema.parse(response.data);

            return response.data;
        } catch (error) {
            throw error
        }
    }
    public async add(leads: AddLeadSchemaType){
        const db = this.dbHelper.db;
        let connection;
        
        try {
            connection = await db.connect();
            if(connection){
                const result: {
                    saveLeads: {
                        lead: AddLeadSchemaType[0],
                        reason?: string
                    }[],
                    skipLeads: {
                        lead: AddLeadSchemaType[0],
                        reason?: string
                    }[],
                    requestRespond: any;
                    errorSave: any
                } = {
                    saveLeads: [],
                    skipLeads: [],
                    requestRespond: [],
                    errorSave: []
                }

                for await (let lead of leads){
                    try {
                        const saveResult = await checkDuplicateAndSaveOneLead(this.tableName, db, lead);
                        if (saveResult.saveLead) {
                            result.saveLeads.push({
                                lead: saveResult.saveLead,
                                reason: saveResult.reason
                            });
                            const resData = await instance.post('/leads', [saveResult.saveLead]);
                            result.requestRespond.push(resData.data)
                        }   
                        if (saveResult.skipLead) {
                            result.skipLeads.push({
                                lead: saveResult.skipLead,
                                reason: saveResult.reason
                            });
                        }
                    } catch (error) {
                        result.errorSave.push(`Error processing contact ${lead.name}: ${error}`)
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
    public async complexAdd(leadComplex: ComplexAddLeadSchemaType){
        try {
            const response = await instance.post(`/leads/complex`, leadComplex);
            return response.data;
        } catch (error) {
            throw error
        }            
    }
    public async update(lead: UpdateLeadSchemaType){
        try {
            const response = await instance.patch(`/leads`, lead);
            return response.data;
        } catch (error) {
            throw error
        }        
    }
    public async updateOne(id: string, lead: UpdateOneLeadSchemaType){
        try {
            const response = await instance.patch(`/leads/${id}`, lead);
            return response.data;
        } catch (error) {
            throw error
        }        
    }

    public async updateWebHook(account: WebHookAccountType, update: WebhookLeadUpdateType){
        const db = this.dbHelper.db;
        let connection;
        
        try {
            connection = await db.connect();
            const insertData: WebhookLeadModel = {
                account: JSON.parse(JSON.stringify({account: account})),
                update: JSON.parse(JSON.stringify({update: update.update}))
            }
            await db.insert("webhooklead", insertData)
            return insertData;
        } catch (error) {
            throw error;
        } finally {
            if (connection) {
                await db.disconnect();
            }
        }
    }
    public async addWebHook(account: WebHookAccountType, add: WebHookLeadAddType){
        const db = this.dbHelper.db;
        let connection;
        
        try {
            connection = await db.connect();
            const insertData: WebhookLeadModel = {
                account: JSON.parse(JSON.stringify({account: account})),
                add: JSON.parse(JSON.stringify({add: add.add}))
            }
            await db.insert("webhooklead", insertData)
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