import axios from 'axios';

const createRequestPromise = async (word: string): Promise<void> => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/similar?word=${word}`);
        console.log(`Response for "${word}":`, response.data);
    } catch (error: any) {
        console.error(`Error fetching similar words for "${word}":`, error.message);
    }
};

const createStatsRequestPromise = async (): Promise<void> => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/stats');
        console.log('Response for /api/v1/stats:', response.data);
    } catch (error: any) {
        console.error('Error fetching stats:', error.message);
    }
};

const sendSimultaneousRequests = async (): Promise<void> => {
    console.log('Sending two simultaneous requests to the server...');

    await Promise.all([
        createRequestPromise('apple'),
        createRequestPromise('stressed'),
        createRequestPromise('banana'),
        createRequestPromise('stressed'),
        createStatsRequestPromise(),
        createRequestPromise('apple'),
        createRequestPromise('banana'),
        createStatsRequestPromise(),
    ]);
};

sendSimultaneousRequests().then(() => console.log('All requests have been processed.'));
