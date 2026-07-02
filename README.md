# TaskFlow — Smart Task Tracker Web Application

TaskFlow is a premium, high-performance task management application built using the MERN stack (MongoDB, Express, React, Node.js). It features a modern glassmorphic dark user interface with dynamic updates, robust form validation, statistics visualization, sorting, filtering, and live search.
## 🌐 Live Demo

### Frontend (Vercel)
🔗 https://task-tracker-application-alpha.vercel.app/

### Backend API (Render)
🔗 https://task-tracker-application-1-9ewh.onrender.com/

## Features

- **Full CRUD Support**: Create, read, update, and delete tasks dynamically.
- **Form Validation**: Comprehensive front-end and back-end schema validation (using Express Validator).
- **Glassmorphism Dark UI**: Implements a sleek dark theme with radial gradient backdrops and responsive design for mobile, tablet, and desktop viewports.
- **Visual Analytics**: Interactive task count status dashboard cards.
- **Advanced Filtering and Sorting**: Filter tasks by status and priority, and sort by newest, oldest, alphabetical title, due date, or priority.
- **Live Search**: Client-side debounced search input querying titles and descriptions.
- **Toast Notification System**: Dynamic, non-intrusive alerts for all user actions.

## Tech Stack

- **Frontend**: React.js (Vite), Axios, Vanilla CSS Variables
- **Backend**: Node.js, Express.js, Express Validator
- **Database**: MongoDB + Mongoose ODM

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation & Local Setup

1. **Clone or Extract the Directory**
   ```bash
   cd Task_Tracker_Application
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tasktracker
   NODE_ENV=development
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## API Documentation

All request parameters and payloads must use `application/json` format.

| Method | Endpoint | Action | Query Params / Body Payload |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Get all tasks | `status`, `priority`, `sort`, `search` |
| **GET** | `/api/tasks/:id` | Get single task | |
| **POST** | `/api/tasks` | Create task | `{ title, description, status, priority, dueDate }` |
| **PUT** | `/api/tasks/:id` | Update task | `{ title, description, status, priority, dueDate }` |
| **DELETE** | `/api/tasks/:id` | Delete task | |
| **GET** | `/api/tasks/stats/summary` | Get task statistics counts | |
