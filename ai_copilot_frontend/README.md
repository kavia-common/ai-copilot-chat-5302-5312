# AI Copilot Frontend

React-based web application providing an elegant chat interface for the AI Copilot. Features markdown rendering, code syntax highlighting, and the Champagne theme.

## Features

- **Chat Interface**: Modern, elegant chat UI with message bubbles
- **Markdown Support**: Full markdown rendering with GitHub Flavored Markdown
- **Code Highlighting**: Syntax highlighting for code blocks
- **Champagne Theme**: Elegant design with warm amber tones and soft gradients
- **Responsive Design**: Mobile-friendly and adaptive layout
- **Session Management**: Maintains conversation context per session
- **Error Handling**: Graceful error display with user-friendly messages

## Prerequisites

- Node.js 14+
- npm or yarn
- AI Copilot backend running on port 3001

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (see Environment Variables section below)

## Running Locally

### Development Server

```bash
npm start
```

The app will be available at http://localhost:3000

### Production Build

```bash
# Build the app
npm run build

# The build folder can be served with any static server
npx serve -s build
```

## Environment Variables

Create a `.env` file in the `ai_copilot_frontend` directory:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_BASE` | Backend API base URL | No | `http://localhost:3001` |

### Example .env file

```env
REACT_APP_API_BASE=http://localhost:3001
```

See `.env.example` for a template.

## Project Structure

```
ai_copilot_frontend/
├── public/              # Static files
├── src/
│   ├── api/
│   │   └── client.js    # API client for backend communication
│   ├── components/
│   │   ├── ChatWindow.jsx      # Main chat container
│   │   ├── ChatWindow.css
│   │   ├── MessageBubble.jsx   # Message display component
│   │   ├── MessageBubble.css
│   │   ├── MessageInput.jsx    # Message input component
│   │   └── MessageInput.css
│   ├── styles/
│   │   └── theme.css    # Global Champagne theme styles
│   ├── App.jsx          # Root component
│   └── index.js         # Entry point
├── package.json
├── .env                 # Environment variables (not in git)
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Theme - Champagne

The application uses the elegant Champagne theme with:
- **Primary Color**: #D97706 (Warm amber)
- **Background**: #FFFBEB (Cream)
- **Surface**: #FFFFFF (White)
- **Text**: #374151 (Charcoal gray)
- **Gradient**: Amber tones from 50 to 200

The theme provides a sophisticated, graceful aesthetic with soft pastels, gentle gradients, and refined rounded components for a polished, luxurious feel.

## Features in Detail

### Markdown Rendering
- Full GitHub Flavored Markdown support
- Tables, task lists, strikethrough
- Automatic link detection
- Blockquotes and lists

### Code Highlighting
- Syntax highlighting for 180+ languages
- Language detection and badges
- Dark code theme (Atom One Dark)
- Inline code styling

### Message Input
- Multiline support
- **Enter** to send
- **Shift+Enter** for new line
- Auto-resizing textarea
- Character limit handling

### Error Handling
- Network error detection
- API error messages
- Dismissible error banners
- Graceful degradation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
Ejects from Create React App (one-way operation).

## Troubleshooting

### Cannot connect to backend
- Ensure the backend is running on the configured port (default: 3001)
- Check `REACT_APP_API_BASE` environment variable
- Verify CORS is properly configured on the backend

### Markdown not rendering
- Check browser console for errors
- Ensure `react-markdown` and plugins are installed
- Verify message content is valid markdown

### Code highlighting not working
- Ensure `rehype-highlight` is installed
- Check that code blocks use proper markdown syntax
- Verify highlight.js CSS is imported

## Support

For issues or questions, please refer to the main project documentation.
