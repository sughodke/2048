import { render, screen } from '@testing-library/react';
import App from './App';

test('renders instructions', () => {
  render(<App />);
  const element = screen.getByText(/instructions/i);
  expect(element).toBeInTheDocument();
});

test('renders 4 row table', () => {
  render(<App />);
  const elements = document.querySelectorAll('.App-board tr')
  expect(elements).toHaveLength(4)
})
