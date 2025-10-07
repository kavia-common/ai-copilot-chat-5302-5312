import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat interface', () => {
  render(<App />);
  const titleElement = screen.getByText(/AI Copilot Chat/i);
  expect(titleElement).toBeInTheDocument();
});
