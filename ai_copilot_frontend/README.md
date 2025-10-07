# AI Copilot Frontend

Modern, responsive React-based chat interface for the AI Copilot application. Features a clean, elegant design with markdown rendering, syntax highlighting for code blocks, and real-time chat interactions.

## Features

- 💬 **Real-time Chat Interface**: Smooth, responsive chat experience
- 📝 **Markdown Support**: Full markdown rendering with GitHub-flavored markdown
- 🎨 **Syntax Highlighting**: Beautiful code highlighting for multiple languages
- 🎯 **Session Management**: Persistent sessions across page reloads
- ✨ **Elegant Theme**: Champagne-themed UI with warm amber tones
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Minimal dependencies for quick loading

## Prerequisites

- Node.js 14 or higher
- npm or yarn package manager
- Running backend server (see backend README)

## Setup Instructions

### 1. Install Dependencies

Using npm:
```bash
cd ai_copilot_frontend
npm install
```

Using yarn:
```bash
cd ai_copilot_frontend
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in the `ai_copilot_frontend` directory:

```env
# Backend API URL
# For local development, use the local backend URL
# For production, use your deployed backend URL
REACT_APP_BACKEND_URL=http://localhost:3001
```

**Environment Variable Details:**

- **REACT_APP_BACKEND_URL** (required): The base URL of your backend API. This tells the frontend where to send chat requests.
  - Local development: `http://localhost:3001`
  - Production: `https://your-backend-domain.com`

**Important**: React environment variables must be prefixed with `REACT_APP_` to be accessible in the application.

### 3. Run the Application

#### Development Mode (with hot-reload)

Using npm:
```bash
npm start
```

Using yarn:
```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000)

#### Production Build

Build the optimized production bundle:

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

The production-ready files will be in the `build/` directory.

### 4. Run Tests

Using npm:
```bash
npm test
```

Using yarn:
```bash
yarn test
```

For CI environments (non-interactive):
```bash
CI=true npm test
```

## Project Structure

```
ai_copilot_frontend/
├── src/
│   ├── components/
│   │   ├── ChatInterface.js      # Main chat container
│   │   ├── ChatInterface.css     # Chat interface styles
│   │   ├── MessageBubble.js      # Individual message component
│   │   ├── MessageBubble.css     # Message bubble styles
│   │   ├── InputBox.js           # Chat input component
│   │   └── InputBox.css          # Input box styles
│   ├── services/
│   │   └── api.js                # Backend API integration
│   ├── utils/
│   │   └── sessionManager.js     # Session management utilities
│   ├── App.js                    # Root component
│   ├── App.css                   # Global styles
│   ├── index.js                  # Application entry point
│   └── index.css                 # Base styles
├── public/                       # Static assets
├── package.json                  # Dependencies & scripts
├── .env                          # Environment variables (create this)
└── README.md                     # This file
```

## Key Components

### ChatInterface
The main chat container that manages:
- Message history
- Session state
- API communication
- User interactions

### MessageBubble
Displays individual messages with:
- Markdown rendering (via react-markdown)
- Code syntax highlighting (via react-syntax-highlighter)
- Timestamp display
- Role-based styling (user/assistant/system)

### InputBox
Chat input with:
- Auto-resizing textarea
- Enter to send, Shift+Enter for new line
- Loading states
- Disabled state during message processing

## Environment Configuration

### Local Development
```env
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Production
```env
REACT_APP_BACKEND_URL=https://your-production-backend.com
```

### Preview/Staging
```env
REACT_APP_BACKEND_URL=https://staging-backend.example.com
```

## Available Scripts

### `npm start` / `yarn start`
Runs the app in development mode with hot-reload.
- Opens browser at [http://localhost:3000](http://localhost:3000)
- Auto-reloads on code changes
- Shows lint errors in console

### `npm test` / `yarn test`
Launches the test runner in interactive watch mode.
- Re-runs tests on file changes
- Shows coverage information

### `npm run build` / `yarn build`
Creates an optimized production build.
- Minifies code
- Optimizes assets
- Generates source maps
- Output in `build/` directory

### `npm run eject` / `yarn eject`
**Warning**: This is a one-way operation!
- Ejects from Create React App
- Exposes all configuration files
- Only use if you need full control

## Features & Usage

### Session Management
- Sessions are automatically created and stored in browser sessionStorage
- Each session maintains conversation history
- "New Chat" button creates a fresh session
- Sessions persist across page reloads (until browser tab is closed)

### Markdown Support
The chat supports full markdown syntax:

````markdown
# Headings
**Bold** and *italic* text
- Bullet lists
1. Numbered lists
`inline code`
```python
# Code blocks with syntax highlighting
def hello():
    print("Hello, world!")
```
> Blockquotes
[Links](https://example.com)
