import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title and input', () => {
  render(<App />);
  const headerTitle = screen.getByText(/AI Copilot/i);
  expect(headerTitle).toBeInTheDocument();

  const textbox = screen.getByLabelText(/Message input/i);
  expect(textbox).toBeInTheDocument();
});
