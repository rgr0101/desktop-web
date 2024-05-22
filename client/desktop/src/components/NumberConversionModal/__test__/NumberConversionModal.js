// NumberConversionModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import axios from 'axios';
import NumberConversionModal from '../NumberConversionModal';

jest.mock('axios');

beforeEach(() => {
    jest.clearAllMocks();
});

test('renderiza modal', () => {
    const onClose = jest.fn();
    render(<NumberConversionModal onClose={onClose} />);

    const closeButton = screen.getByText(/cerrar/i);
    expect(closeButton).toBeInTheDocument();

    const heading = screen.getByText(/convertir número a palabras/i);
    expect(heading).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/ingresar número/i);
    expect(input).toBeInTheDocument();

    const convertButton = screen.getByText(/convertir/i);
    expect(convertButton).toBeInTheDocument();
});

test('muestra todo el resultado', async () => {
    const onClose = jest.fn();
    const mockResponse = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <NumberToWordsResponse xmlns="http://www.dataaccess.com/webservicesserver/">
                    <NumberToWordsResult>one hundred twenty three</NumberToWordsResult>
                </NumberToWordsResponse>
            </soap:Body>
        </soap:Envelope>`;
    
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    render(<NumberConversionModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/ingresar número/i);
    const convertButton = screen.getByText(/convertir/i);

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(convertButton);

    await waitFor(() => {
        expect(screen.getByText(/resultado: one hundred twenty three/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

test('muestra error al fallar', async () => {
    const onClose = jest.fn();
    axios.post.mockRejectedValueOnce(new Error('API is down'));

    render(<NumberConversionModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/ingresar número/i);
    const convertButton = screen.getByText(/convertir/i);

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(convertButton);

    await waitFor(() => {
        expect(screen.getByText(/resultado: error/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/one hundred twenty three/i)).not.toBeInTheDocument();
});
