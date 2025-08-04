import z from 'zod'
import WebHookAccount from './account.contract'

export const WebHookContactUpdate = z.object({
    update: z.array(z.object({
        id: z.string(),
        name: z.string(),
        responsible_user_id: z.string(),
        date_create: z.string(),
        last_modified: z.string(),
        account_id: z.string(),
        tags: z.array(z.object({
            id: z.string(),
            name: z.string(),
        })),
        created_at:  z.string(),
        updated_at: z.string(),
        type: z.literal('contact'),
    }))
})
export type WebHookContactUpdateType = z.infer<typeof WebHookContactUpdate>

export const WebHookContactAdd = z.object({
    add: z.array(z.object({
        id: z.string(),
        responsible_user_id: z.string(),
        date_create: z.string(),
        last_modified: z.string(),
        account_id: z.string(),
        created_at:  z.string(),
        updated_at: z.string(),
        type: z.literal('contact'),
    }))
})
export type WebHookContactAddType = z.infer<typeof WebHookContactAdd>


const WebHookContact = z.object({
    account: WebHookAccount,
    contacts: z.union([WebHookContactUpdate, WebHookContactAdd])
})
export type WebHookContactType = z.infer<typeof WebHookContact>
export default WebHookContact