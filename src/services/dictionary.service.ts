import { preprocessDictionary } from '../utils/preprocess-dictionary';

export class DictionaryService {
    private wordMap: Map<string, string[]>;
    private queryCache: Map<string, string[]>;
    private readonly totalWords: number = 0;

    constructor(dictionaryPath: string) {
        this.wordMap = preprocessDictionary(dictionaryPath);
        this.totalWords = [...this.wordMap.values()].reduce((acc, words) => acc + words.length, 0);
        this.queryCache = new Map();
    }

    findSimilar(word: string) {
        if (this.queryCache.has(word)) {
            return this.queryCache.get(word);
        }

        const key = word.split('').sort().join('');
        const similarWords = this.wordMap.get(key) || [];
        const result = similarWords.filter((w: string) => w !== word);

        this.queryCache.set(word, result);

        return result;
    }

    public getTotalWords(): number {
        return this.totalWords;
    }
}

