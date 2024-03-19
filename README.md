# Titan Similar Words Finder by [Ron Kattan](mailto:ron.kattan@gmail.com)

## Getting Started
These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Ensure you have Node.js and npm (or pnpm) installed on your system. Check your versions with:

```bash
node --version
npm --version
```
### Installing
To set up your development environment, follow these steps:

1. **Clone the repository**
```bash
git clone https://github.com/ronkattan/titan.git
cd titan
```
2. **Install dependencies**

With npm:
```bash
npm install
```
Or with pnpm:
```bash
pnpm install
```
3. **Build the project**

This compiles the TypeScript source to JavaScript in the `dist` directory and copies necessary resources.
With npm:
```bash
npm run build
```
Or with pnpm:
```bash
pnpm run build
```
4. **Start the server**

Run the following command to start the server:
```bash
npm start
```
Or with pnpm:
```bash
pnpm start
```

The server will default to port 8000. Access the API at `http://localhost:8000`.

## API Endpoints
- **GET /api/v1/similar?word=<word>**: Finds all dictionary words that are permutations of the specified word.
    - Example: [http://localhost:8000/api/v1/similar?word=listen](http://localhost:8000/api/v1/similar?word=listen)
    - Example: [http://localhost:8000/api/v1/similar?word=apple](http://localhost:8000/api/v1/similar?word=apple)

- **GET /api/v1/stats**: Provides general service statistics, such as total dictionary words, total requests, and average request handling time.
    - Example: [http://localhost:8000/api/v1/stats](http://localhost:8000/api/v1/stats)

## Algorithm Explanation
The service employs a preprocessing step and an efficient retrieval mechanism:

1. **Preprocessing**: At startup, it reads a dictionary file, creating a key for each word by sorting its letters alphabetically. Words with identical keys are permutations. These are stored in a `Map` for quick access.

2. **Query Handling**: For a given word, the service:
    - Generates its key.
    - Retrieves all matching words from the `Map`.
    - Excludes the query word from the results and returns the rest.

This method optimizes for both quick retrieval and efficient memory use, crucial for handling high request volumes.

## Built With

- [Node.js](https://nodejs.org/) - Runtime environment.
- [Express](https://expressjs.com/) - Web application framework.
- [TypeScript](https://www.typescriptlang.org/) - Used for static type checking.