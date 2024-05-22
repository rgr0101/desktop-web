// Desktop.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Desktop from '../Desktop';
import Modal from 'react-modal';

Modal.setAppElement('body');

test('renderiza Desktop', () => {
  render(<Desktop />);

  expect(screen.getByText(/APLICACIONES DISPONIBLES/i)).toBeInTheDocument();
  expect(screen.getByText(/Tareas/i)).toBeInTheDocument();
  expect(screen.getByText(/Chuck Norris/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar Meal/i)).toBeInTheDocument();
  expect(screen.getByText(/Buscar Cóctel/i)).toBeInTheDocument();
  expect(screen.getByText(/Convertir Número/i)).toBeInTheDocument();
  expect(screen.getByText(/Sumar Número/i)).toBeInTheDocument();
  expect(screen.getByText(/Multiplicar Número/i)).toBeInTheDocument();
});

test('opens and closes Task Modal', () => {
  render(<Desktop />);

  const openButton = screen.getByText(/Tareas/i);
  fireEvent.click(openButton);

  expect(screen.getByText(/Task Modal/i)).toBeInTheDocument();

  const closeButton = screen.getByRole('button', { name: /close-button/i });
  fireEvent.click(closeButton);

  expect(screen.queryByText(/Task Modal/i)).not.toBeInTheDocument();
});
