import { Request, Response } from "express";
import { LeadService } from "./lead.service";
import BaseController from "../../common/classes/BaseController";
import { AddLeadSchema } from "./contracts/add.lead";
import { ComplexAddLeadSchema } from "./contracts/complexAdd.lead";
import {  UpdateLeadSchema, UpdateOneLeadSchema } from "./contracts/update.lead";


export class LeadController extends BaseController {
    constructor(private readonly leadService: LeadService){
        super()
    }

    public async getAll(_: Request, res: Response){
        try {
            const data = await this.leadService.getAll();
            return res.json(data); 
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async getByID(req: Request, res: Response){
        const { id } = req.params
        try {
            const data = await this.leadService.getByID(id);
            return res.json(data); 
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async add(req: Request, res: Response){
        try {
            const validatedData = AddLeadSchema.parse(req.body);
            const lead = await this.leadService.add(validatedData);
            
            return res.status(201).json({
                message: "Lead added successfully",
                lead,
             });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async complexAdd(req: Request, res: Response){
         try {
            const validatedData = ComplexAddLeadSchema.parse(req.body);
            const lead = await this.leadService.complexAdd(validatedData);
            
            return res.status(201).json({
                message: "Complex lead added successfully",
                lead,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async update(req: Request, res: Response){
        try {
            const validatedData = UpdateLeadSchema.parse(req.body);
            const lead = await this.leadService.update(validatedData);
            
            return res.status(201).json({
                message: "Lead update successfully",
                lead,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async updateOne(req: Request, res: Response){
        const { id } = req.params
        try {
            const validatedData = UpdateOneLeadSchema.parse(req.body);
            const lead = await this.leadService.updateOne(id, validatedData);
            
            return res.status(201).json({
                message: "Lead update successfully",
                lead,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
}