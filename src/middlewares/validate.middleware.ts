import { Request, Response, NextFunction } from 'express';

export const validateWord = (req: Request, res: Response, next: NextFunction) => {
    const word = req.query.word as string;

    if (!word) {
        console.error('A "word" query parameter is required.');
        return res.status(400).json({ error: 'A "word" query parameter is required.' });
    }

    if (!/^[a-z]+$/.test(word)) {
        console.error(`Invalid input - "${word}" is not a valid word.`);
        return res.status(400).json({
            error: `Invalid input. Please provide a word containing only lowercase English letters instaed of "${word}".`,
        });
    }

    next();
};
