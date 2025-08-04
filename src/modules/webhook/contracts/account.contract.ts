import z from 'zod'

const WebHookAccount =  z.object({
    subdomain: z.string(),
    id: z.string(),
    _links: z.object({
        self: z.string()
    })
})

export type WebHookAccountType = z.infer<typeof WebHookAccount>
export default WebHookAccount