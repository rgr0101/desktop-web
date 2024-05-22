// AddNumberModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import AddNumberModal from '../AddNumberModal';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () =>
      Promise.resolve(`
        <?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <AddResponse xmlns="http://tempuri.org/">
              <AddResult>5</AddResult>
            </AddResponse>
          </soap:Body>
        </soap:Envelope>
      `),
  })
);

afterEach(() => {
  fetch.mockClear();
});

test('renderiza AddNumberModal', () => {
  const onClose = jest.fn();
  render(<AddNumberModal onClose={onClose} />);

  const closeButton = screen.getByText(/cerrar/i);
  expect(closeButton).toBeInTheDocument();

  const number1Input = screen.getByPlaceholderText(/primer número/i);
  const number2Input = screen.getByPlaceholderText(/segundo número/i);
  const sumButton = screen.getByText(/sumar/i);

  expect(number1Input).toBeInTheDocument();
  expect(number2Input).toBeInTheDocument();
  expect(sumButton).toBeInTheDocument();

  fireEvent.change(number1Input, { target: { value: '2' } });
  fireEvent.change(number2Input, { target: { value: '3' } });
  fireEvent.click(sumButton);

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'https://cors-anywhere.herokuapp.com/http://www.dneonline.com/calculator.asmx',
    expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Content-Type': 'text/xml; charset=utf-8',
      }),
      body: expect.stringContaining('<intA>2</intA>'),
    })
  );
});

test('displays result after successful addition', async () => {
  render(<AddNumberModal onClose={() => {}} />);

  fireEvent.change(screen.getByPlaceholderText(/primer número/i), {
    target: { value: '2' },
  });
  fireEvent.change(screen.getByPlaceholderText(/segundo número/i), {
    target: { value: '3' },
  });
  fireEvent.click(screen.getByText(/sumar/i));

  await waitFor(() => {
    expect(screen.getByText(/resultado: 5/i)).toBeInTheDocument();
  });
});

test('handles fetch error', async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error('API Error')));

  render(<AddNumberModal onClose={() => {}} />);

  fireEvent.change(screen.getByPlaceholderText(/primer número/i), {
    target: { value: '2' },
  });
  fireEvent.change(screen.getByPlaceholderText(/segundo número/i), {
    target: { value: '3' },
  });
  fireEvent.click(screen.getByText(/sumar/i));

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
