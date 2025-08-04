import z from 'zod'
import WebHookAccount from './account.contract'

export const WebhookLeadUpdate = z.object({
    update: z.array(z.object({
        id: z.string(),
        name: z.string(),
        status_id: z.string(),
        price: z.string(),
        responsible_user_id: z.string(),
        last_modified: z.string(),
        modified_user_id: z.string(),
        created_user_id: z.string(),
        date_create: z.string(),
        pipeline_id: z.string(),
        account_id: z.string(),
        created_at: z.string(),
        updated_at: z.string()
       
    }))
})
export type WebhookLeadUpdateType = z.infer<typeof WebhookLeadUpdate>

export const WebHookLeadAdd = z.object({
    add: z.array(z.object({
        id: z.string(),
        name: z.string(),
        status_id: z.string(),
        price: z.string(),
        responsible_user_id: z.string(),
        last_modified: z.string(),
        modified_user_id: z.string(),
        created_user_id: z.string(),
        date_create: z.string(),
        pipeline_id: z.string(),
        account_id: z.string(),
        created_at: z.string(),
        updated_at: z.string()
    }))
})
export type WebHookLeadAddType = z.infer<typeof WebHookLeadAdd>


const WebHookLead = z.object({
    account: WebHookAccount,
    leads: z.union([WebhookLeadUpdate, WebHookLeadAdd])
})

export type WebHookLeadType = z.infer<typeof WebHookLead>
export default WebHookLead