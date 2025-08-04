import { Request, Response } from "express";
import { ContactService } from "./contact.service";
import { AddContactSchema } from "./contracts/add.contract";
import { UpdateAllContactSchema, UpdateOneContactSchema } from "./contracts/update.contract";
import { AddChatContactSchema } from "./contracts/addChat.contract";
import BaseController from "../../common/classes/BaseController";



export class ContactController extends BaseController {
    constructor(private readonly contactService: ContactService){
        super()
    }

    public async getAll(_: Request, res: Response){
        try {
            const data = await this.contactService.getAll();
            return res.json(data); 
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async getByID(req: Request, res: Response){
        const { id } = req.params;

        try {
            const contact = await this.contactService.getByID(id);
            return res.json(contact);
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async add(req: Request, res: Response){
        try {
            const validatedData = AddContactSchema.parse(req.body);
            const contact = await this.contactService.add(validatedData);

            return res.status(201).json({
                message: "Contact added successfully",
                contact,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async updateAll(req: Request, res: Response){
        try {
            const validatedData = UpdateAllContactSchema.parse(req.body);
            const contact = await this.contactService.updateAll(validatedData);

            return res.status(201).json({
                message: "Contact update successfully",
                contact,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async updateOne(req: Request, res: Response){
        const { id } = req.params;
        try {
            const validatedData = UpdateOneContactSchema.parse(req.body);
            const contact = await this.contactService.updateOne(id, validatedData);

            return res.status(201).json({
                message: "Contact update successfully",
                contact,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async addChat(req: Request, res: Response){
        try {
            const validatedData = AddChatContactSchema.parse(req.body);
            const contact = await this.contactService.addChat(validatedData);

            return res.status(201).json({
                message: "Add chats successfully",
                contact,
            });
        } catch (error) {
            this.respondError(error, res)
        }
    }
    public async getChat(_: Request, res: Response){
        try {
            const data = await this.contactService.getChats();
            return res.json(data); 
        } catch (error) {
            this.respondError(error, res)
        }
    }
}