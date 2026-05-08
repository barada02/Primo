# Primo

Primo is an AI-powered personal productivity, goal, and habit-tracking application.

## How to Resume / Start the Application

To run the application locally, you will need two separate terminal windows—one for the frontend and one for the backend.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- MongoDB (running locally or a MongoDB Atlas URI)

### 2. Environment Setup
Create a `.env` file in the \`server/\` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
# Add your Gemini/Google Generative AI key if needed
```

### 3. Start the Backend Server
Open a terminal and navigate to the \`server\` directory:
```bash
cd server
npm install    # if you haven't installed dependencies yet
npm run dev    # starts the backend on http://localhost:5000 using nodemon
```

### 4. Start the Frontend Application
Open a second terminal and stay in the root directory:
```bash
npm install    # if you haven't installed dependencies yet
npm run dev    # starts the Vite React frontend
```

Once both are running, open the local URL provided by Vite (usually \`http://localhost:5173\`) in your browser.
