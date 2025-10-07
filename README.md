# AI Copilot Chat Application

A modern AI-powered chat application featuring a React frontend with elegant Champagne theme and a FastAPI backend powered by Google Gemini API.

## Project Structure

This project consists of two main containers:

- **ai_copilot_frontend** - React-based chat interface (port 3000)
- **ai_copilot_backend** - FastAPI backend service (port 3001)

## Quick Start

### Prerequisites

- Node.js 16+ and npm (for frontend)
- Python 3.9+ and pip (for backend)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Setup Backend

```bash
cd ai-copilot-chat-5302-5311/ai_copilot_backend

# Copy and configure environment
cp .env.example .env
# Edit .env and add your GOOGLE_GEMINI_API_KEY

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .

# Start backend server
./start.sh
# Or: python -m uvicorn app.main:app --host 0.0.0.0 --port 3001 --reload
```

Backend will run on **http://localhost:3001**

### 2. Setup Frontend

```bash
cd ai-copilot-chat-5302-5312/ai_copilot_frontend

# Copy and configure environment
cp .env.example .env
# Verify REACT_APP_API_BASE_URL=http://localhost:3001

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend will run on **http://localhost:3000**

## Configuration

### Frontend Environment Variables

Create `ai_copilot_frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

### Backend Environment Variables

Create `ai_copilot_backend/.env`:

```env
GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
MODEL_NAME=gemini-1.5-flash
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
PORT=3001
HOST=0.0.0.0
LOG_LEVEL=info
```

## Port Configuration

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Backend API**: http://localhost:3001/api/*
- **API Docs**: http://localhost:3001/docs

## API Integration

The frontend and backend communicate via REST API:

### Endpoints Used

1. **Create Session**: `POST /api/sessions`
   - Creates a new chat session
   - Returns session_id

2. **Send Message**: `POST /api/chat`
   - Body: `{ session_id: string, message: string }`
   - Returns AI-generated response

3. **Get Session** (optional): `GET /api/sessions/{session_id}`
   - Retrieves conversation history

4. **Reset Session** (optional): `POST /api/sessions/{session_id}/reset`
   - Clears session messages

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (frontend development)
- `http://localhost:3001` (same-origin)

## Features

- ✨ Elegant Champagne-themed UI
- 💬 Real-time chat interface
- 📝 Markdown rendering with syntax highlighting
- 🎨 Code block syntax highlighting
- 💾 Session-based conversation management
- 🔄 Auto-scroll to latest messages
- ⚡ Fast and responsive

## Development

### Running Both Services

**Terminal 1 - Backend:**
```bash
cd ai-copilot-chat-5302-5311/ai_copilot_backend
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 3001 --reload
```

**Terminal 2 - Frontend:**
```bash
cd ai-copilot-chat-5302-5312/ai_copilot_frontend
npm start
```

### Testing the Integration

1. Open http://localhost:3000 in your browser
2. The frontend will automatically create a session
3. Type a message and press Enter or click Send
4. The AI response will appear in the chat

## Troubleshooting

### CORS Errors

If you see CORS errors:
1. Verify backend is running on port 3001
2. Check `ALLOWED_ORIGINS` in backend `.env` includes `http://localhost:3000`
3. Restart backend after changing `.env`

### Frontend Can't Connect to Backend

1. Verify backend is running: `curl http://localhost:3001/healthz`
2. Check `REACT_APP_API_BASE_URL` in frontend `.env`
3. Restart frontend with `npm start` after changing `.env`

### API Key Issues

1. Ensure `GOOGLE_GEMINI_API_KEY` is set in backend `.env`
2. Verify the API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Check backend logs for API errors

### Session Not Found

Sessions are in-memory and cleared on backend restart. Refresh the frontend page to create a new session.

## Documentation

- Frontend README: `ai_copilot_frontend/README.md`
- Backend README: `ai_copilot_backend/README.md`
- Backend API Docs: http://localhost:3001/docs (when running)

## License

Copyright © 2024. All rights reserved.
