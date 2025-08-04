import { Router, type Request, type Response } from 'express';
import { WebHookService } from './webhook.service';
import WebHookController from './webhook.controller';
import { ContactService } from '../../modules/contact/contact.service';
import { LeadService } from '../../modules/lead/lead.service';
import type DataBaseHelper from 'helpers/DataBaseHelper';

class WebHookRouters {
    public router: Router;
    private controller: WebHookController;
    private service: WebHookService;

    constructor(db: DataBaseHelper){
        this.service = new WebHookService(new ContactService(db), new LeadService(db));
        this.controller = new WebHookController(this.service)

        this.router = Router();        
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.handle.bind(this));
    }

    private handle(req: Request, res: Response) {
        return this.controller.handle(req, res)
    }
}

export default WebHookRouters