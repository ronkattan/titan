import fs from 'fs';

export function generateKeySort(word: string): string {
    return word.split('').sort().join('');
}

export function generateKeyFreqEncoding(word: string): string {
    const counts = new Array(26).fill(0);
    const baseCharCode = 'a'.charCodeAt(0);

    for (let char of word) {
        counts[char.charCodeAt(0) - baseCharCode]++;
    }

    return counts.join('');
}

export function generatePrimeKey(word: string): number {
    const baseCharCode = 'a'.charCodeAt(0);
    const primes = [
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89,
        97,
    ];

    return word.split('').reduce((acc, char) => acc * primes[char.charCodeAt(0) - baseCharCode], 1);
}

export function preprocessDictionary(dictionaryPath: string): Map<string, string[]> {
    const fileContent = fs.readFileSync(dictionaryPath, 'utf-8');
    const words = fileContent.split('\n');

    const wordMap: Map<string, string[]> = new Map();

    words.forEach((word: string) => {
        const key = generatePrimeKey(word);
        const existingWords = wordMap.get(key.toString()) || [];
        wordMap.set(String(key), [...existingWords, word]);
    });

    return wordMap;
}
