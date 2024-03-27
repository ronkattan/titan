import fs from 'fs';
import {
    generateKeySort,
    generateKeyFreqEncoding,
    generatePrimeKey,
} from '../utils/preprocess-dictionary';

interface BenchmarkResult {
    name: string;
    time: number;
    memoryUsage: string;
    memoryComplexity: string;
}

function benchmarkFunction(
    func: (word: string) => string | number,
    words: string[],
): [bigint, NodeJS.MemoryUsage] {
    const startMemUsage = process.memoryUsage();
    const start = process.hrtime.bigint();
    words.forEach((word) => func(word));
    const end = process.hrtime.bigint();
    const endMemUsage = process.memoryUsage();

    const memUsage: NodeJS.MemoryUsage = {
        rss: endMemUsage.rss - startMemUsage.rss,
        heapTotal: endMemUsage.heapTotal - startMemUsage.heapTotal,
        heapUsed: endMemUsage.heapUsed - startMemUsage.heapUsed,
        external: endMemUsage.external - startMemUsage.external,
        arrayBuffers: (endMemUsage.arrayBuffers || 0) - (startMemUsage.arrayBuffers || 0),
    };

    return [end - start, memUsage];
}

function formatMemoryUsage(memUsage: NodeJS.MemoryUsage): string {
    return `RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`;
}

async function runBenchmark(): Promise<void> {
    const dictionaryPath = 'src/data/words_clean.txt';
    const fileContent = fs.readFileSync(dictionaryPath, 'utf-8');
    const words = fileContent.split('\n');

    const benchmarkResults: BenchmarkResult[] = [];

    const methods = [
        { name: 'Sorting', func: generateKeySort, complexity: 'O(n log n)' },
        { name: 'Frequency Encoding', func: generateKeyFreqEncoding, complexity: 'O(n)' },
        { name: 'Prime Key', func: generatePrimeKey, complexity: 'O(n)' },
    ];

    for (const { name, func, complexity } of methods) {
        const [time, memUsage] = await benchmarkFunction(func, words);
        benchmarkResults.push({
            name,
            time: Number(time) / 1e6,
            memoryUsage: formatMemoryUsage(memUsage),
            memoryComplexity: complexity,
        });
    }

    benchmarkResults.sort((a, b) => a.time - b.time);
    console.table(benchmarkResults);
    console.log(`
Memory Usage Terms:
- RSS (Resident Set Size): The portion of a process's memory that is held in RAM. It's an indicator of how much physical memory a process is consuming.

Memory Complexity Notation:
- O(n log n): Indicates the complexity grows linearithmically with the input size.
- O(n): Indicates the complexity grows linearly with the input size.
    `);
}

runBenchmark();
