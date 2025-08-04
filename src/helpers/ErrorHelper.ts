import { ZodError } from 'zod';
import { AxiosError } from 'axios';

class ErrorHelper extends Error {
    public name: string;
    public statusCode?: number;
    public details?: string | string[];

    constructor(
        message: string, 
        name: string, 
        statusCode?: number, 
        details?: string | string[]
    ) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorHelper);
        }
    }

    static fromZodError(zodError: ZodError): ErrorHelper {
        const messages = zodError.issues.map((issue) => JSON.stringify(issue));

        return new this(
            'Validation Error',
            'ZodError',
            400,
            messages.length > 0 ? messages : 'Unknown validation error'
        );
    }

    static fromAxiosError(axiosError: AxiosError): ErrorHelper {
        const response = axiosError.response;
        const details = response?.data ? (typeof response.data === 'string' ? response.data : JSON.stringify(response.data)) : undefined;
        
        return new this(
            axiosError.message,
            'AxiosError',
            axiosError.response?.status,
            details
        );
    }
}

export function handleError(error: unknown): ErrorHelper {
    if (error instanceof AxiosError) {
        return ErrorHelper.fromAxiosError(error);
    } else if (error instanceof ZodError) {
        return ErrorHelper.fromZodError(error);
    } else {
        return new ErrorHelper('Internal server error', 'InternalError', 500, `${error}`);
    }
}

export default ErrorHelper