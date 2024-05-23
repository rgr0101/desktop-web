// App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders LoginForm component for the root route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Asume que LoginForm contiene un texto "Login" (ajusta según tu componente real)
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('renders Desktop component for the /desktop route', () => {
  render(
    <MemoryRouter initialEntries={['/desktop']}>
      <App />
    </MemoryRouter>
  );

  // Asume que Desktop contiene un texto "Desktop" (ajusta según tu componente real)
  expect(screen.getByText(/Desktop/i)).toBeInTheDocument();
});
