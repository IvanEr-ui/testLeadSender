
import z from 'zod'
import WebHookContact from './contact.contract'
import WebHookLead from './lead.contract'

const WebHooksSchemas = z.union([WebHookContact, WebHookLead])
export type WebHooksTypes = z.infer<typeof WebHooksSchemas>

export default WebHooksSchemas