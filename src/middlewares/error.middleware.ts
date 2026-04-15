import { Response, Request, NextFunction } from "express"


export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction)=>{
   const statusCode: number =  err.statusCode || 500;
   const message: string = err.message || "internal server error"
   res.status(statusCode).json({
    success: false,
    message,
    stack: err?.stack
   })
}