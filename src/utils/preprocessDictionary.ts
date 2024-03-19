import fs from 'fs';

export function preprocessDictionary(dictionaryPath: string): Map<string, string[]> {
    const fileContent = fs.readFileSync(dictionaryPath, 'utf-8');
    const words = fileContent.split('\n');

    const wordMap: Map<string, string[]> = new Map();

    words.forEach(word => {
        const key = word.split('').sort().join('');
        const existingWords = wordMap.get(key) || [];
        wordMap.set(key, [...existingWords, word]);
    });

    return wordMap;
}
