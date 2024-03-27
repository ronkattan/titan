import {
    generateKeyFreqEncoding,
    generateKeySort,
    generatePrimeKey,
    preprocessDictionary,
} from '../utils/preprocess-dictionary';

export class DictionaryService {
    private wordMap: Map<string, string[]>;
    private queryCache: Map<string, string[]>;
    private readonly totalWords: number = 0;

    constructor(dictionaryPath: string) {
        this.wordMap = preprocessDictionary(dictionaryPath);
        this.totalWords = [...this.wordMap.values()].reduce((acc, words) => acc + words.length, 0);
        this.queryCache = new Map();
    }

    async findSimilar(word: string) {
        if (this.queryCache.has(word)) {
            return this.queryCache.get(word);
        }

        const benchmarks: {
            Method: string;
            Time: string; // Convert to milliseconds
            'Memory Usage': string; // Convert to Megabytes
        }[] = [];

        const measure = (name: string, func: (word: string) => any) => {
            const startHrTime = process.hrtime.bigint();
            const startMemUsage = process.memoryUsage().heapUsed;
            func(word);
            const endHrTime = process.hrtime.bigint();
            const endMemUsage = process.memoryUsage().heapUsed;

            benchmarks.push({
                Method: name,
                Time: `${Number(endHrTime - startHrTime) / 1e6} ms`, // Convert to milliseconds
                'Memory Usage': `${((endMemUsage - startMemUsage) / 1024).toFixed(2)} KB`, // Convert to Megabytes
            });
        };

        measure(`generateKeySort(${word})`, generateKeySort);
        measure(`generateKeyFreqEncoding(${word})`, generateKeyFreqEncoding);
        measure(`generatePrimeKey(${word})`, generatePrimeKey);

        benchmarks.sort((a, b) => {
            const timeA = parseFloat(a.Time.split(' ')[0]);
            const timeB = parseFloat(b.Time.split(' ')[0]);
            return timeA - timeB;
        });

        const key = generatePrimeKey(word);
        const similarWords = this.wordMap.get(key.toString()) || [];
        const result = similarWords.filter((w: string) => w !== word);
        this.queryCache.set(word, result);

        console.table(benchmarks);
        return result;
    }

    public getTotalWords(): number {
        return this.totalWords;
    }
}
