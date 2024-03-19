import express from 'express';
import path from 'path';

import { statsMiddleware, getStats } from './middlewares/statsMiddleware';
import { DictionaryService } from './services/DictionaryService';
import { SimilarWordsController } from './controllers/SimilarWordsController';

const app = express();
app.use(statsMiddleware);

const dictionaryPath = path.join(__dirname, 'data', 'words_clean.txt');
const dictionaryService = new DictionaryService(dictionaryPath);
const similarWordsController = new SimilarWordsController(dictionaryService);

app.get('/api/v1/similar', (req, res) => similarWordsController.findSimilarWords(req, res));

app.get('/api/v1/stats', (req, res) => {
    const stats = getStats();
    res.json({
        totalWords: dictionaryService.getTotalWords(),
        totalRequests: stats.totalRequests,
        avgProcessingTimeNs: stats.avgProcessingTimeNs,
    });
});
export default app;
