import { Request, Response } from 'express';
import { DictionaryService } from '../services/dictionary.service';
import { getStats } from '../middlewares/stats.middleware';

export class StatsController {
    constructor(private dictionaryService: DictionaryService) {}

    public async getStats(req: Request, res: Response): Promise<void> {
        const stats = getStats();

        res.json({
            totalWords: this.dictionaryService.getTotalWords(),
            totalRequests: stats.totalRequests,
            avgProcessingTimeNs: stats.avgProcessingTimeNs
        });
    }
}
