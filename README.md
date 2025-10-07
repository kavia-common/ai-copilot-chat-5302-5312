# AI Copilot Chat - Frontend Container

This directory contains the **frontend container** for the AI Copilot Chat application.

## Quick Start

1. Navigate to the frontend directory:
```bash
cd ai_copilot_frontend
```

2. Follow the setup instructions in [ai_copilot_frontend/README.md](ai_copilot_frontend/README.md)

## Container Details

- **Framework**: React
- **Port**: 3000
- **UI**: Modern chat interface with Champagne theme
- **Features**: Markdown rendering, syntax highlighting, responsive design

## Key Features

- Real-time chat interface with AI assistant
- Full markdown support with GitHub-flavored markdown
- Beautiful syntax highlighting for code blocks
- Session management with browser storage
- Elegant, responsive design
- Mobile-friendly UI

## Environment Setup

The frontend requires a `.env` file with the following variables:

- `REACT_APP_BACKEND_URL` - Backend API URL (e.g., http://localhost:3001)

See the [frontend README](ai_copilot_frontend/README.md) for detailed setup instructions.

## Related Containers

- **Backend**: [../ai-copilot-chat-5302-5311](../ai-copilot-chat-5302-5311) - FastAPI backend with Gemini integration

## Dependencies

This frontend communicates with the backend API. Ensure the backend is running before starting the frontend.

## Development

```bash
cd ai_copilot_frontend
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

For complete setup and usage instructions, see the [frontend README](ai_copilot_frontend/README.md).
