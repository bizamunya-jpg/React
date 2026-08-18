import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the live monitor and lets an operator add a note', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /live monitor/i })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText(/new note/i), { target: { value: 'Checked sensors' } });
  fireEvent.click(screen.getByRole('button', { name: /add note/i }));
  expect(screen.getByText('Checked sensors')).toBeInTheDocument();
});
