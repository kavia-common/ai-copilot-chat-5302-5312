import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders AI Copilot chat application', () => {
  render(<App />);
  
  // Check for chat title
  const titleElement = screen.getByText(/AI Copilot/i);
  expect(titleElement).toBeInTheDocument();
  
  // Check for welcome message
  const welcomeElement = screen.getByText(/Welcome to AI Copilot!/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders message input', () => {
  render(<App />);
  
  // Check for input placeholder
  const inputElement = screen.getByPlaceholderText(/Type your message/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders send button', () => {
  render(<App />);
  
  // Check for send button
  const sendButton = screen.getByLabelText(/Send message/i);
  expect(sendButton).toBeInTheDocument();
});
