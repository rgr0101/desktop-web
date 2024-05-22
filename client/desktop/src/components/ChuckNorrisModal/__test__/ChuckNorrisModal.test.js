// ChuckNorrisModal.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import ChuckNorrisModal from '../ChuckNorrisModal';
import axios from 'axios';

jest.mock('axios');

test('renderiza el modal', () => {
  const onClose = jest.fn();
  render(<ChuckNorrisModal onClose={onClose} />);

  const closeButton = screen.getByText(/cerrar/i);
  expect(closeButton).toBeInTheDocument();

  const loadingText = screen.getByText(/cargando/i);
  expect(loadingText).toBeInTheDocument();
});

test('muestra la frase', async () => {
  const joke = 'Chuck Norris can divide by zero.';
  axios.get.mockResolvedValueOnce({ data: { value: joke } });

  const onClose = jest.fn();
  render(<ChuckNorrisModal onClose={onClose} />);

  await waitFor(() => {
    expect(screen.getByText(joke)).toBeInTheDocument();
  });

  // Verify loading state is not present
  expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});

test('manejo error', async () => {
  axios.get.mockRejectedValueOnce(new Error('API Error'));

  const onClose = jest.fn();
  render(<ChuckNorrisModal onClose={onClose} />);

  await waitFor(() => {
    // Loading state should not be present after fetch error
    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
  });

  // Verify that the joke is not present in the DOM
  expect(screen.queryByText(/Chuck Norris/i)).not.toBeInTheDocument();
});
