import { Request, Response } from 'express';

import { DictionaryService } from '../services/DictionaryService';

export class SimilarWordsController {
    constructor(private dictionaryService: DictionaryService) {}

    public findSimilarWords(req: Request, res: Response): void {
        const { word } = req.query;
        const similarWords = this.dictionaryService.findSimilar(word as string);
        res.json({ similar: similarWords });
    }
}
