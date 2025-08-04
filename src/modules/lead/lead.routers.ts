import { Router } from 'express';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import type DataBaseHelper from '../../helpers/DataBaseHelper';

export class LeadRouters {
    public router: Router;
    private controller: LeadController;
    private service: LeadService;

    constructor(db: DataBaseHelper){
        this.service = new LeadService(db)
        this.controller = new LeadController(this.service)

        this.router = Router();        
        this.initializeRoutes(); 
    }

    private initializeRoutes() {
        this.router.get('/get', (req,res) => this.controller.getAll(req,res));
        this.router.get('/get/:id', (req,res) => this.controller.getByID(req,res));
        this.router.post('/add', (req,res) => this.controller.add(req,res));
        this.router.post('/complex', (req,res) => this.controller.complexAdd(req,res));
        this.router.patch('/update', (req,res) => this.controller.update(req,res));
        this.router.patch('/update/:id', (req,res) => this.controller.updateOne(req,res));
    }
}