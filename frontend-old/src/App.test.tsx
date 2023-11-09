import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@burns-depression/App';

describe('App', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test.skip('renders title', () => {
    render(<App />);
    const titleElement = screen.getAllByText(/Burns Depression Quiz/i);
    expect(titleElement.length).toBeGreaterThan(0);
  });
});
