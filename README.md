# AffordMed URL Shortener

A simple full-stack URL shortener with statistics, built with Node.js/Express (backend) and React + Material UI (frontend).

## Project Structure

```
AffordMed-URL-Shortener/
├── LoggingMiddleware/
├── BackendTestSubmission/
├── FrontendTestSubmission/
└── README.md
```

## Getting Started

### Backend

1. Open a terminal and navigate to `AffordMed-URL-Shortener/BackendTestSubmission`.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm start
   ```

   The backend runs on [http://localhost:5000](http://localhost:5000).

### Frontend

1. Open another terminal and navigate to `AffordMed-URL-Shortener/FrontendTestSubmission`.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend React app:
   ```sh
   npm start
   ```

   The frontend runs on [http://localhost:3000](http://localhost:3000).

## .env Usage

No .env file is required by default. If you want to change the backend port, set the `PORT` environment variable before starting the backend.

## Features

- Shorten up to 5 URLs at once, with optional custom shortcode and expiry (in minutes)
- View statistics for each short URL: original URL, creation/expiry, total clicks, click history (timestamp, referrer, country)
- All logs are handled by a custom middleware (no console.log)
- No authentication required

## API Endpoints

- `POST /shorturls` — Create a short URL
- `GET /shorturls/:shortcode` — Get statistics for a short URL
- `GET /:shortcode` — Redirect to the original URL

## CORS

CORS is enabled on the backend to allow requests from the frontend.

## Logging

- Backend logs are stored in `LoggingMiddleware/logs.txt`
- Frontend logs are kept in memory (see `src/services/logger.js`)

## Notes

- This project is for demonstration and educational purposes.
- No business logic is in the frontend; all shortening/statistics are handled by the backend.
