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

2. Edit `.env` and set `REACT_APP_API_BASE_URL` to your backend URL (e.g., `http://localhost:3001`)

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will open at http://localhost:3000

## Environment Variables

- `REACT_APP_API_BASE_URL`: Backend API base URL (required)

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

## Technologies

- React 18 with TypeScript
- Axios for API calls
- react-markdown for markdown rendering
- highlight.js for syntax highlighting
- CSS Variables for theming
