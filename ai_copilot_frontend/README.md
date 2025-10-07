# AI Copilot Frontend (React)

Elegant chat UI that connects to a backend REST API to provide an AI copilot experience with markdown and code highlighting.

## Features
- Chat interface with message bubbles and auto-scroll
- Preset chips: Write, Summarize, Brainstorm, Code
- Minimal markdown rendering (bold, italics, inline and fenced code blocks)
- Basic code syntax highlighting via CSS classes (no extra deps)
- Champagne theme (light) and Dark theme toggle
- Stateless sessions by default; ready for session endpoint when available

## Environment Variables
Set one of the following to configure the backend base URL:
- REACT_APP_BACKEND_URL (preferred)
- REACT_APP_API_URL

Note: REACT_APP_GEMINI_API_KEY is not used on the client by default. Do not expose sensitive keys in client-side code.

You can create a .env file in this directory:
```
REACT_APP_BACKEND_URL=http://localhost:8000
# or
# REACT_APP_API_URL=http://localhost:8000
```

## Development
- npm start
- Open http://localhost:3000

## Tests
- npm test
The test suite checks that the header title appears and that the input textbox is present.

## Backend Contract (assumed)
POST {baseUrl}/chat
Body: { message: string, context?: any, preset?: 'write'|'summarize'|'brainstorm'|'code', sessionId?: string }
Response: { reply: string }

If a POST /session route is provided by the backend, the frontend exposes createSession() in src/services/api.js for easy integration.

## Structure
- src/components: Header, ThemeToggle, ChatWindow, MessageBubble, ChatInput, TypingIndicator
- src/hooks/useChatApi.js: message state and API logic
- src/services/api.js: base URL and chat requests
- src/utils/markdown.js: minimal markdown renderer
- src/utils/theme.js: theme definitions and applier
- src/styles: theme.css and chat.css

## Security
Avoid putting API keys in client-side code. Use a server-side proxy to interact with providers like Gemini.

## Styling
Champagne theme palette:
- primary #D97706
- secondary #F3F4F6
- success #10B981
- error #EF4444
- background #FFFBEB
- surface #FFFFFF
- text #374151

Header/background use a subtle gradient from amber-50 to amber-200.
