# AI Copilot Frontend

A modern, responsive React-based chat interface for the AI Copilot application. Features elegant Champagne-themed UI with markdown rendering, syntax highlighting, and real-time chat capabilities powered by Google's Gemini AI.

## Project Overview

The AI Copilot Frontend provides an intuitive, chat-style interface for interacting with AI. Built with React and styled with a sophisticated Champagne theme, it offers a seamless user experience for tasks like writing, coding assistance, brainstorming, and problem-solving. The application emphasizes clean design, accessibility, and performance.

## Features

### Core Functionality

- **Real-Time Chat Interface**: Instant message exchange with AI assistant
- **Session Management**: Automatic session creation and conversation tracking
- **Markdown Support**: Rich text formatting in AI responses
- **Syntax Highlighting**: Beautiful code rendering with language detection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Graceful error messages with user-friendly feedback
- **Conversation History**: View complete chat history within a session
- **Clear Chat**: Reset conversations with a single click

### User Interface

- **Champagne Theme**: Elegant, sophisticated color scheme with cream and pearl highlights
- **Message Bubbles**: Distinct styling for user and AI messages
- **Auto-Scroll**: Automatically scrolls to newest messages
- **Loading States**: Visual feedback during AI response generation
- **Empty State**: Helpful prompts when starting a new conversation
- **Timestamps**: Message timing for conversation context

### Technical Features

- **No Heavy Dependencies**: Lightweight with minimal external libraries
- **Fast Loading**: Optimized bundle size and performance
- **Clean Architecture**: Well-organized component structure
- **Type Safety**: PropTypes validation for components
- **Accessibility**: ARIA labels and keyboard navigation support
- **Code Splitting**: Efficient loading with React lazy loading

## Architecture

### Technology Stack

- **Framework**: React 18.2.0
- **Build Tool**: Create React App 5.0.1
- **Styling**: Pure CSS (no UI frameworks)
- **Markdown**: markdown-to-jsx 7.3.2
- **Syntax Highlighting**: react-syntax-highlighter 15.5.0
- **UUID Generation**: uuid 9.0.1

### Architecture Overview

```
┌─────────────────────────────────────────┐
│           React Application             │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │      App.js (Entry Point)         │ │
│  │                                   │ │
│  │  ┌─────────────────────────────┐ │ │
│  │  │    ChatInterface            │ │ │
│  │  │  - Session Management       │ │ │
│  │  │  - Message State            │ │ │
│  │  │  - API Communication        │ │ │
│  │  │                             │ │ │
│  │  │  ┌───────────┐ ┌──────────┐│ │ │
│  │  │  │ Message   │ │ InputBox ││ │ │
│  │  │  │ Bubble    │ │          ││ │ │
│  │  │  └───────────┘ └──────────┘│ │ │
│  │  └─────────────────────────────┘ │ │
│  └───────────────────────────────────┘ │
│                 │                       │
│                 ▼                       │
│  ┌───────────────────────────────────┐ │
│  │      API Service Layer            │ │
│  │  - sendMessage()                  │ │
│  │  - getSessionHistory()            │ │
│  │  - deleteSession()                │ │
│  │  - checkHealth()                  │ │
│  └───────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │
                  ▼ HTTP/REST
        ┌────────────────────┐
        │  Backend API       │
        │  (FastAPI)         │
        └────────────────────┘
```

### Component Structure

```
src/
├── App.js                      # Main application component
├── App.css                     # Global styles and theme
├── index.js                    # React DOM entry point
├── components/
│   ├── ChatInterface.js        # Main chat container
│   ├── ChatInterface.css       # Chat layout styles
│   ├── MessageBubble.js        # Individual message display
│   ├── MessageBubble.css       # Message styling
│   ├── InputBox.js             # User input component
│   └── InputBox.css            # Input styling
├── services/
│   └── apiService.js           # Backend API communication
└── utils/
    └── markdownRenderer.js     # Markdown processing
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 14.0 or higher
- npm 6.0 or higher (comes with Node.js)
- A running instance of the AI Copilot Backend

## Environment Variables

### Required Configuration

Create a `.env` file in the `ai_copilot_frontend` directory:

```bash
# Backend API URL
REACT_APP_API_URL=http://localhost:3001
```

### Environment Variable Details

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `REACT_APP_API_URL` | Yes | URL of the backend API server | `http://localhost:3001` |

**Important**: All React environment variables must be prefixed with `REACT_APP_` to be accessible in the application.

### How to Set REACT_APP_API_URL

The `REACT_APP_API_URL` variable tells the frontend where to find the backend API.

**For Local Development**:
```bash
REACT_APP_API_URL=http://localhost:3001
```

**For Production**:
```bash
REACT_APP_API_URL=https://your-api-domain.com
```

**For Preview Environments**:
```bash
REACT_APP_API_URL=https://preview-api.yourdomain.com
```

### Example .env File

Create a file named `.env` in the `ai_copilot_frontend` directory:

```bash
# AI Copilot Frontend Environment Variables

# Backend API Configuration
REACT_APP_API_URL=http://localhost:3001

# Optional: Enable debug mode
REACT_APP_DEBUG=false
```

### Example .env.example File

For version control, include a `.env.example` file:

```bash
# AI Copilot Frontend Environment Variables Template

# Backend API Configuration
# Update this URL to point to your backend server
REACT_APP_API_URL=http://localhost:3001
```

### Environment-Specific Configuration

**Development** (`.env.development`):
```bash
REACT_APP_API_URL=http://localhost:3001
```

**Production** (`.env.production`):
```bash
REACT_APP_API_URL=https://api.production.com
```

React will automatically use the appropriate file based on the build command.

## Installation and Setup

### Step 1: Clone the Repository

```bash
cd ai-copilot-chat-5302-5312
```

### Step 2: Navigate to Frontend Directory

```bash
cd ai_copilot_frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- Markdown rendering libraries
- Syntax highlighting components
- UUID generation
- Testing utilities

### Step 4: Configure Environment Variables

```bash
# Create .env file
cp .env.example .env

# Edit .env and set your backend URL
# REACT_APP_API_URL=http://localhost:3001
```

### Step 5: Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0
```

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm start
```

The application will open automatically at: `http://localhost:3000`

Features in development mode:
- Hot module replacement (instant updates)
- Source maps for debugging
- Detailed error messages
- React DevTools support

### Production Build

Create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with:
- Minified JavaScript and CSS
- Optimized images and assets
- Production-ready HTML
- Service worker for offline support

### Serve Production Build Locally

```bash
# Install serve globally (one-time)
npm install -g serve

# Serve the build folder
serve -s build -l 3000
```

### Running Tests

Execute the test suite:

```bash
# Run tests in interactive watch mode
npm test

# Run tests once (CI mode)
CI=true npm test

# Run tests with coverage
npm test -- --coverage
```

### Preview in Different Environments

The application supports preview URLs for development and testing:

**Default Local**: `http://localhost:3000`

**Custom Port**:
```bash
PORT=3001 npm start
```

**Network Access** (access from other devices):
```bash
HOST=0.0.0.0 npm start
```

## Application Usage

### Starting a Conversation

1. Open the application in your browser
2. Type your message in the input box at the bottom
3. Press Enter or click the send button (📤)
4. Wait for the AI to respond

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Tab**: Navigate between elements

### Message Features

**User Messages**:
- Displayed on the right side
- Orange gradient background
- Shows "👤 You" label

**AI Responses**:
- Displayed on the left side
- White background with border
- Shows "🤖 AI Copilot" label
- Supports markdown formatting
- Includes syntax-highlighted code blocks

### Clearing Conversations

Click the "🗑️ Clear" button in the header to:
- Delete all messages in the current session
- Start a fresh conversation
- Generate a new session ID

**Note**: This action cannot be undone!

### Tips for Best Experience

1. **Be Specific**: Provide clear, detailed prompts for better responses
2. **Use Context**: Reference previous messages in the conversation
3. **Code Requests**: Specify the programming language for code examples
4. **Long Responses**: AI may take longer for complex queries
5. **Error Handling**: If an error occurs, try rephrasing your question

## Theming and Customization

### Champagne Theme

The application uses an elegant Champagne color scheme:

| Color | Value | Usage |
|-------|-------|-------|
| Primary | `#D97706` | Buttons, headers, accents |
| Background | `#FFFBEB` | Main background |
| Surface | `#FFFFFF` | Cards, message bubbles |
| Text | `#374151` | Primary text color |
| Secondary | `#F3F4F6` | Borders, dividers |
| Success | `#10B981` | Success states |
| Error | `#EF4444` | Error messages |

### Customizing Colors

Edit CSS variables in `src/App.css` or component CSS files:

```css
/* Example: Change primary color */
.chat-title {
  color: #your-color-here;
}

.send-button {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Component Styling

Each component has its own CSS file for easy customization:

- `ChatInterface.css`: Main layout and header
- `MessageBubble.css`: Message styling and positioning
- `InputBox.css`: Input area and send button

### Responsive Breakpoints

The application is responsive with breakpoints at:

- **Desktop**: > 768px (default styles)
- **Tablet/Mobile**: ≤ 768px (adjusted spacing, font sizes)

Example customization:

```css
@media (max-width: 768px) {
  .chat-title {
    font-size: 20px;
  }
}
```

## Project Structure

```
ai_copilot_frontend/
├── public/
│   ├── index.html              # HTML template
│   ├── favicon.ico             # App icon
│   └── manifest.json           # PWA manifest
├── src/
│   ├── App.js                  # Main app component
│   ├── App.css                 # Global styles
│   ├── App.test.js             # App tests
│   ├── index.js                # React entry point
│   ├── index.css               # Base CSS
│   ├── setupTests.js           # Test configuration
│   ├── components/
│   │   ├── ChatInterface.js    # Main chat container
│   │   ├── ChatInterface.css   # Chat styles
│   │   ├── MessageBubble.js    # Message component
│   │   ├── MessageBubble.css   # Message styles
│   │   ├── InputBox.js         # Input component
│   │   └── InputBox.css        # Input styles
│   ├── services/
│   │   └── apiService.js       # API client
│   └── utils/
│       └── markdownRenderer.js # Markdown processor
├── package.json                # Dependencies
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
└── README.md                   # This file
```

## API Integration

### Backend Connection

The frontend communicates with the backend via the `apiService.js` module.

### Available API Functions

#### sendMessage()

Send a chat message to the backend:

```javascript
import { sendMessage } from './services/apiService';

const response = await sendMessage(sessionId, "Hello, AI!");
console.log(response.reply);
```

#### getSessionHistory()

Retrieve conversation history:

```javascript
import { getSessionHistory } from './services/apiService';

const history = await getSessionHistory(sessionId);
console.log(history);
```

#### deleteSession()

Delete a session:

```javascript
import { deleteSession } from './services/apiService';

await deleteSession(sessionId);
```

#### checkHealth()

Check backend health:

```javascript
import { checkHealth } from './services/apiService';

const isHealthy = await checkHealth();
console.log(isHealthy ? "Backend is up" : "Backend is down");
```

### Error Handling

The API service handles various error scenarios:

- Network errors (backend down)
- HTTP errors (4xx, 5xx)
- Invalid responses
- Timeout issues

Errors are caught and displayed in the UI with user-friendly messages.

## Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use descriptive variable names
- Add comments for complex logic
- Keep components small and focused

### Adding New Components

1. Create component file in `src/components/`
2. Create corresponding CSS file
3. Import and use in parent component
4. Add PropTypes for type checking
5. Write tests for the component

### State Management

The application uses React hooks for state:

- `useState`: Component-level state
- `useEffect`: Side effects and lifecycle
- `useRef`: DOM references and mutable values

For larger applications, consider Redux or Context API.

### Best Practices

1. **Component Naming**: Use PascalCase for component names
2. **File Organization**: Group related files together
3. **CSS Naming**: Use descriptive, semantic class names
4. **Props Validation**: Always define PropTypes
5. **Error Boundaries**: Implement error boundaries for robustness

## Testing

### Running Tests

```bash
# Interactive watch mode
npm test

# Run once
CI=true npm test

# With coverage
npm test -- --coverage --watchAll=false
```

### Test Structure

Tests use Jest and React Testing Library:

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat interface', () => {
  render(<App />);
  const element = screen.getByText(/AI Copilot/i);
  expect(element).toBeInTheDocument();
});
```

### Writing Tests

1. Test user interactions
2. Verify component rendering
3. Check error states
4. Validate API calls (mock responses)
5. Test accessibility

## Troubleshooting

### Common Issues

#### 1. Backend Connection Failed

**Error**: "Failed to send message" or network errors

**Solution**:
- Verify backend is running at the URL specified in `REACT_APP_API_URL`
- Check `.env` file exists and has correct URL
- Test backend health: `curl http://localhost:3001/`
- Check CORS settings on backend
- Restart frontend after changing `.env`

#### 2. Environment Variables Not Working

**Error**: API calls go to wrong URL or undefined

**Solution**:
```bash
# Environment variables must start with REACT_APP_
# ✅ Correct
REACT_APP_API_URL=http://localhost:3001

# ❌ Incorrect
API_URL=http://localhost:3001

# Restart development server after changes
npm start
```

#### 3. Port Already in Use

**Error**: "Port 3000 is already in use"

**Solution**:
```bash
# Use a different port
PORT=3001 npm start

# Or kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 4. Module Not Found Errors

**Error**: `Cannot find module 'react'`

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

#### 5. Build Fails

**Error**: Build errors during `npm run build`

**Solution**:
```bash
# Clear cache
npm cache clean --force

# Remove build directory
rm -rf build

# Reinstall and rebuild
npm install
npm run build
```

#### 6. Markdown Not Rendering

**Problem**: Code blocks or formatting not displaying correctly

**Solution**:
- Check console for JavaScript errors
- Verify `markdown-to-jsx` is installed
- Check syntax highlighter styles are imported
- Review `markdownRenderer.js` configuration

#### 7. White Screen / Blank Page

**Problem**: Application loads but shows nothing

**Solution**:
- Open browser console for errors
- Check if `public/index.html` has `<div id="root">`
- Verify `src/index.js` renders to `root` element
- Check for JavaScript errors in components
- Clear browser cache

#### 8. Styling Issues

**Problem**: Styles not applying or looking incorrect

**Solution**:
- Check CSS files are imported in components
- Verify class names match between JS and CSS
- Clear browser cache
- Check for CSS syntax errors
- Inspect elements in browser DevTools

### Debugging Tips

1. **Use React DevTools**:
   - Install React DevTools browser extension
   - Inspect component props and state
   - Track component re-renders

2. **Console Logging**:
   ```javascript
   console.log('Session ID:', sessionId);
   console.log('Messages:', messages);
   ```

3. **Network Tab**:
   - Open browser DevTools (F12)
   - Check Network tab for API requests
   - Verify request/response data

4. **Check Backend Logs**:
   - Look at backend console output
   - Verify API is receiving requests
   - Check for backend errors

### Getting Help

- Review [React documentation](https://react.dev/)
- Check [Create React App docs](https://create-react-app.dev/)
- Inspect browser console for error messages
- Verify backend is running and accessible
- Check environment variables are set correctly

## Performance Optimization

### Best Practices

1. **Code Splitting**: Use React.lazy() for large components
2. **Memoization**: Use React.memo() for expensive components
3. **Debouncing**: Debounce user input for API calls
4. **Image Optimization**: Compress and lazy-load images
5. **Bundle Analysis**: Use webpack-bundle-analyzer

### Analyzing Bundle Size

```bash
npm run build
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```

### Production Optimizations

The production build includes:
- Minified code
- Tree shaking (unused code removal)
- Asset optimization
- Gzip compression support

## Accessibility

### Features

- **ARIA Labels**: All interactive elements have labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Images have descriptive alt attributes

### Testing Accessibility

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Add to src/index.js in development
if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}
```

## Deployment

### Building for Production

```bash
# Create optimized build
npm run build

# Output will be in build/ directory
```

### Deployment Platforms

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

#### Static Hosting (AWS S3, Azure, etc.)

Simply upload the contents of the `build/` folder to your static hosting service.

### Environment-Specific Builds

```bash
# Development build
npm run build

# Production build with custom env
REACT_APP_API_URL=https://api.prod.com npm run build
```

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure tests pass
6. Submit a pull request

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests added for new features
- [ ] All tests passing
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Accessibility considerations addressed

## Browser Support

The application supports:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

For older browsers, consider adding polyfills.

## License

[Specify your license here]

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.

---

**Happy Coding! 🚀**
