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

-   **GET /api/v1/similar?word=<word>**: Finds all dictionary words that are permutations of the specified word.

    -   Example: [http://localhost:8000/api/v1/similar?word=listen](http://localhost:8000/api/v1/similar?word=listen)
    -   Example: [http://localhost:8000/api/v1/similar?word=apple](http://localhost:8000/api/v1/similar?word=apple)

    **Validation:** The word parameter cannot be empty and must consist only of lowercase English letters. Requests not adhering to this pattern will be rejected.

-   **GET /api/v1/stats**: Provides general service statistics, such as total dictionary words, total requests, and average request handling time.

    -   Example: [http://localhost:8000/api/v1/stats](http://localhost:8000/api/v1/stats)

**Note:** Those endpoints are the only authorized routes. Accessing any other endpoints will result in a 404 Not Found response.

## CPU and Memory Optimization

- **Preprocessing & In-Memory Storage**: At startup, the dictionary is preprocessed and stored efficiently. This reduces the need for heavy computation with each request, saving both CPU time and memory.

- **Efficient Data Lookup**: The application uses a smart lookup system that allows for quick access to data, significantly speeding up the process of finding similar words.

- **Simplified Input**: By accepting only lowercase English letters, the app simplifies its processing, leading to quicker response times.

These approaches ensure the application runs smoothly, even under heavy use.

## Handling High Request Volumes

- **Built on Node.js & Express**: Using Node.js and Express, the application can efficiently manage many requests at once, keeping the service responsive.

- **Stateless Design**: The server treats each request separately, enhancing its ability to scale and maintain performance under increased loads.

This setup ensures that the service remains fast and reliable, ready to handle numerous requests without a drop in performance.

## Algorithm Explanation

The service employs a preprocessing step and an efficient retrieval mechanism:

1. **Preprocessing**: At startup, it reads a dictionary file, creating a key for each word by sorting its letters alphabetically. Words with identical keys are permutations. These are stored in a `Map` for quick access.

2. **Query Handling**: For a given word, the service:
    - Generates its key.
    - Retrieves all matching words from the `Map`.
    - Excludes the query word from the results and returns the rest.

This method optimizes for both quick retrieval and efficient memory use, crucial for handling high request volumes.

## Built With

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
