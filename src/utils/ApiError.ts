export class ApiError extends Error{
    constructor(public statusCode: Number, public message: string){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}