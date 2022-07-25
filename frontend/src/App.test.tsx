import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Burns Depression Checklist/i);
  expect(titleElement.length).toBeGreaterThan(0);
});
