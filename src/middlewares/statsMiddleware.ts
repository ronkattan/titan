import { NextFunction, Request, Response } from 'express';

let totalRequests = 0;
let totalProcessingTimeNs = BigInt(0);

export const statsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.path !== '/api/v1/stats') {
        const startTime = process.hrtime.bigint();

        res.on('finish', () => {
            const endTime = process.hrtime.bigint();
            totalProcessingTimeNs += endTime - startTime;
            totalRequests++;
        });
    }
    next();
};

export const getStats = () => ({
    totalWords: 0,
    totalRequests,
    avgProcessingTimeNs: totalRequests > 0 ? Number(totalProcessingTimeNs / BigInt(totalRequests)) : 0,
});
