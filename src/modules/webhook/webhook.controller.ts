import BaseController from "../../common/classes/BaseController";
import WebHookContact from "./contracts/contact.contract";
import WebHookLead from "./contracts/lead.contract";

import type { WebHookService } from "./webhook.service";
import type { Request, Response } from 'express';

class WebHookController extends BaseController  {
    constructor(private readonly webhookService: WebHookService) {
        super()
    }

    public handle(req: Request, res: Response) {
        console.log(req.body)
        try {
            if (req.body.hasOwnProperty("contacts")) {
                const contacts = WebHookContact.parse(req.body);
                this.webhookService.handleContact(contacts);
            }
            if (req.body.hasOwnProperty("leads")) {
                const leads = WebHookLead.parse(req.body);
                this.webhookService.handleLead(leads);
            }
            res.status(200).json({ message: 'Webhook processed successfully' });
        } catch (error) {
            this.respondError(error, res)
        }
    }
}

export default WebHookController;
