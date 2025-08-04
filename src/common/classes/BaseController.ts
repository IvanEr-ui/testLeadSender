import { Response } from 'express';
import { handleError } from '../../helpers/ErrorHelper';

class BaseController {
    constructor(){}

    protected respondError(error: any, res: Response){
        const herror = handleError(error);
        console.error("Error updating contact:", herror);
        let details;
        try {
            if (typeof herror.details === 'string') {
                details = JSON.parse(herror.details);
            } else {
                details = herror.details;
            }
        } catch (e) {
            details = { message: herror.details || 'Unknown error' };
        }
    
        return res.status(herror.statusCode || 500).json({ message: herror.message, details: details });
    }
}

export default BaseController