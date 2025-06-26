# 🔗 AffordMed URL Shortener

![Shortener UI](https://github.com/user-attachments/assets/0b01a1a8-bf10-4a8e-8914-695689ef61d0)

![image](https://github.com/user-attachments/assets/560e4400-4821-4595-99d3-ef8eb1995fff)

A fully functional, full-stack **URL Shortener Microservice** with analytics — built using **Node.js + Express** for the backend and **React + Material UI** for the frontend. Designed for robust production-like environments with proper logging, error handling, and a clean UI.

---

## 🗂 Project Structure

```

AffordMed-URL-Shortener/
├── LoggingMiddleware/         # Custom middleware (no console.log used)
├── BackendTestSubmission/     # Node.js + Express backend
├── FrontendTestSubmission/    # React + Material UI frontend
└── README.md

````

---

## 🚀 Getting Started

### 🧩 Backend

1. Navigate to the backend folder:
   ```bash
   cd AffordMed-URL-Shortener/BackendTestSubmission
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The backend runs on: [http://localhost:5000](http://localhost:5000)

---

### 🌐 Frontend

1. Navigate to the frontend folder:

   ```bash
   cd AffordMed-URL-Shortener/FrontendTestSubmission
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

   The frontend runs on: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Variables

* No `.env` file is required by default.
* To change the backend port, set the `PORT` environment variable manually before starting the backend.

---

## ✅ Features

* 🔗 Shorten up to **5 URLs concurrently**
* 🕒 Custom or default (30 min) expiry time for short URLs
* 🧠 Optional **custom shortcodes** with uniqueness check
* 📊 Full statistics:

  * Original long URL
  * Short link creation and expiry timestamps
  * Total clicks
  * Click logs with:

    * Timestamp
    * Referrer
    * Country (mocked/coarse geo)
* 🧾 Centralized custom logging middleware (no console.log used)
* 🛡 No user authentication required — API is open for use

---

## 📡 API Endpoints

| Method | Endpoint                | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| `POST` | `/shorturls`            | Create a new shortened URL           |
| `GET`  | `/shorturls/:shortcode` | Fetch statistics for a shortened URL |
| `GET`  | `/:shortcode`           | Redirect to original long URL        |

---

## 🌍 CORS Support

* Backend allows CORS requests from `http://localhost:3000` by default.

---

## 🧾 Logging System

* ✅ Backend logs stored in: `LoggingMiddleware/logs.txt`
* ✅ Frontend interaction logs (button clicks, page loads) are stored in memory and sent to backend using `src/services/logger.js`
* ❌ No `console.log` or inbuilt loggers used anywhere

---

## 📌 Notes

* Built for demo & educational use (e.g., hackathons, assignments, hiring tests)
* Pure JavaScript (no TypeScript)
* Clean React architecture with `components/`, `pages/`, and `services/`
* Backend follows MVC structure with routing, controllers, models, services, and middlewares
* All core logic resides in the backend; the frontend is API-driven only

---

## 🙌 Acknowledgements

Built as part of the **AffordMed Campus Hiring Evaluation Test** to demonstrate full-stack skills and microservice architecture with strong logging and UI principles.

---
