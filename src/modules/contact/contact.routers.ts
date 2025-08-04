import { Router } from 'express';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import type DataBaseHelper from '../../helpers/DataBaseHelper';

export class ContactRouters {
    public router: Router;
    private controller: ContactController;
    private service: ContactService;

    constructor(db: DataBaseHelper){
        this.service = new ContactService(db)
        this.controller = new ContactController(this.service)

        this.router = Router();        
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/get', (req, res) => this.controller.getAll(req,res));
        this.router.get('/get/:id', (req, res) => this.controller.getByID(req,res));
        this.router.get('/chats', (req, res) => this.controller.getChat(req,res));
        this.router.post('/chats', (req, res) => this.controller.addChat(req,res));
        this.router.post('/add', (req, res) => this.controller.add(req,res));
        this.router.patch('/update', (req, res) => this.controller.updateAll(req,res));
        this.router.patch('/update/:id', (req, res) => this.controller.updateOne(req,res));
    }

}