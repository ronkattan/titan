import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

import { loggingMiddleware } from './middlewares/logging.middleware';
import { statsMiddleware, getStats } from './middlewares/stats.middleware';
import { validateWord } from './middlewares/validate.middleware';

import { DictionaryService } from './services/Dictionary.service';
import { SimilarWordsController } from './controllers/SimilarWords.controller';

const app = express();
app.use(loggingMiddleware);
app.use(statsMiddleware);

const dictionaryPath = path.join(__dirname, 'data', 'words_clean.txt');
const dictionaryService = new DictionaryService(dictionaryPath);
const similarWordsController = new SimilarWordsController(dictionaryService);

app.get('/api/v1/similar', validateWord, (req, res, next) =>
    similarWordsController.findSimilarWords(req, res, next),
);

app.get('/api/v1/stats', (req, res) => {
    const stats = getStats();
    res.json({
        totalWords: dictionaryService.getTotalWords(),
        totalRequests: stats.totalRequests,
        avgProcessingTimeNs: stats.avgProcessingTimeNs,
    });
});

app.all('*', (req, res) => {
    console.error(`404 Not Found - The requested URL ${req.path} was not found on this server.`);
    res.status(404).send('404 Not Found - The requested URL was not found on this server.');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error occurred in ${req.method} ${req.path} - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default app;
