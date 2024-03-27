import { NextFunction, Request, Response } from 'express';
import { DictionaryService } from '../services/dictionary.service';

export class SimilarWordsController {
    constructor(private dictionaryService: DictionaryService) {}

    public async findSimilarWords(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const word = req.query.word as string;
            const similarWords = await this.dictionaryService.findSimilar(word);
            res.json({ similar: similarWords });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(
                    `Error finding similar words for "${req.query.word}": ${error.message}`,
                );
            } else {
                console.error(`An unexpected error occurred: ${error}`);
            }
            next(error); // Pass the error to Express error handling middleware
        }
    }
}
