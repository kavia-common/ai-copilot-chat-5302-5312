# AI Copilot Frontend

A modern, elegant React-based chat interface for AI assistance with markdown rendering and code syntax highlighting.

## Features

- **Chat UI**: Elegant, responsive chat interface with message bubbles
- **Markdown Support**: Full markdown rendering with GitHub-flavored markdown (GFM)
- **Code Highlighting**: Automatic syntax highlighting for code blocks using highlight.js
- **Champagne Theme**: Elegant cream & pearl design with sophisticated styling
- **Session Management**: Session-based interactions with the backend
- **Real-time Updates**: Smooth auto-scrolling and loading states

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set `REACT_APP_API_BASE_URL` to your backend URL:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will open at **http://localhost:3000**

## Environment Variables

- `REACT_APP_API_BASE_URL`: Backend API base URL (default: `http://localhost:3001`) - **Required**

## Port Configuration

- **Frontend**: Runs on port `3000` (http://localhost:3000)
- **Backend**: Expects backend on port `3001` (http://localhost:3001)

## Project Structure

```
src/
├── components/
│   ├── ChatWindow.tsx      # Main chat interface component
│   ├── MessageBubble.tsx   # Individual message styling
│   ├── MarkdownRenderer.tsx # Markdown with syntax highlighting
│   └── LoadingDots.tsx     # Loading animation
├── styles/
│   ├── global.css          # Global styles and layout
│   └── theme.css           # Champagne theme color variables
├── App.tsx                 # Root component
└── index.tsx               # Application entry point
```

## API Integration

The frontend communicates with the backend via REST API:

- `POST /api/sessions` - Create a new chat session
- `POST /api/chat` - Send a message and receive AI response
- `GET /api/sessions/{session_id}` - Get session history (optional)
- `POST /api/sessions/{session_id}/reset` - Reset session (optional)

### API Base URL

All API calls use the `REACT_APP_API_BASE_URL` environment variable. The frontend automatically falls back to `http://localhost:3001` if not set.

### Endpoint Usage

```typescript
// Session creation
POST ${REACT_APP_API_BASE_URL}/api/sessions

// Send message
POST ${REACT_APP_API_BASE_URL}/api/chat
Body: { session_id: string, message: string }
```

## Running the Application

### Development Mode

```bash
npm start
```

Runs on http://localhost:3000 with hot-reloading enabled.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Prerequisites

Ensure the backend is running on port 3001 before starting the frontend:

```bash
# In the backend directory
cd ../ai-copilot-chat-5302-5311/ai_copilot_backend
./start.sh
```

## Technologies

- React 18 with TypeScript
- Axios for API calls
- react-markdown for markdown rendering
- highlight.js for syntax highlighting
- CSS Variables for theming

## Troubleshooting

### CORS Errors

If you see CORS errors in the console, ensure:
1. Backend is running on port 3001
2. Backend CORS configuration includes `http://localhost:3000`
3. `REACT_APP_API_BASE_URL` is set correctly in `.env`

### API Connection Issues

1. Verify backend is running: `curl http://localhost:3001/healthz`
2. Check `.env` file has correct `REACT_APP_API_BASE_URL`
3. Restart the frontend after changing `.env`

### Session Creation Fails

The frontend creates a session automatically on load. If this fails:
1. Check browser console for errors
2. Verify backend `/api/sessions` endpoint is accessible
3. Check backend logs for errors

## License

Copyright © 2024. All rights reserved.
