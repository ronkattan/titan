import { NextFunction, Request, Response } from 'express';
import { DictionaryService } from '../services/Dictionary.service';

export class SimilarWordsController {
    constructor(private dictionaryService: DictionaryService) {}

    public findSimilarWords(req: Request, res: Response, next: NextFunction): void {
        try {
            const word = req.query.word as string;
            const similarWords = this.dictionaryService.findSimilar(word);
            res.json({ similar: similarWords });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(
                    `Error finding similar words for "${req.query.word}": ${error.message}`,
                );
            } else {
                console.error(`An unexpected error occurred: ${error}`);
            }
            next(error);
        }
    }
}
