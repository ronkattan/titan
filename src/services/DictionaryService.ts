import { preprocessDictionary } from '../utils/preprocessDictionary';

export class DictionaryService {
    private wordMap: Map<string, string[]>;
    private totalWords: number = 0;

    constructor(dictionaryPath: string) {
        this.wordMap = preprocessDictionary(dictionaryPath);
        this.totalWords = [...this.wordMap.values()].reduce((acc, words) => acc + words.length, 0);
    }

    public findSimilar(word: string): string[] {
        const key = word.split('').sort().join('');
        const similarWords = this.wordMap.get(key) || [];
        return similarWords.filter(w => w !== word);
    }

    public getTotalWords(): number {
        return this.totalWords;
    }
}
