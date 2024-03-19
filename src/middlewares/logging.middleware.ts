import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Received request on ${req.method} ${req.path}`);
    next();
};
