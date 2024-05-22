// MultiplyNumberModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import MultiplyNumberModal from '../MultiplyNumberModal';

global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () =>
            Promise.resolve(`<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <MultiplyResponse xmlns="http://tempuri.org/">
                        <MultiplyResult>20</MultiplyResult>
                    </MultiplyResponse>
                </soap:Body>
            </soap:Envelope>`),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

test('renderiza modal', () => {
    const onClose = jest.fn();
    render(<MultiplyNumberModal onClose={onClose} />);

    const closeButton = screen.getByText(/cerrar/i);
    expect(closeButton).toBeInTheDocument();

    const heading = screen.getByText(/multiplicar números/i);
    expect(heading).toBeInTheDocument();

    const input1 = screen.getByPlaceholderText(/primer número/i);
    expect(input1).toBeInTheDocument();

    const input2 = screen.getByPlaceholderText(/segundo número/i);
    expect(input2).toBeInTheDocument();

    const multiplyButton = screen.getByText(/multiplicar/i);
    expect(multiplyButton).toBeInTheDocument();
});

test('muestra resultado', async () => {
    const onClose = jest.fn();
    render(<MultiplyNumberModal onClose={onClose} />);

    const input1 = screen.getByPlaceholderText(/primer número/i);
    const input2 = screen.getByPlaceholderText(/segundo número/i);
    const multiplyButton = screen.getByText(/multiplicar/i);

    fireEvent.change(input1, { target: { value: '4' } });
    fireEvent.change(input2, { target: { value: '5' } });
    fireEvent.click(multiplyButton);

    await waitFor(() => {
        expect(screen.getByText(/resultado: 20/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
});

test('muestra error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    const onClose = jest.fn();
    render(<MultiplyNumberModal onClose={onClose} />);

    const input1 = screen.getByPlaceholderText(/primer número/i);
    const input2 = screen.getByPlaceholderText(/segundo número/i);
    const multiplyButton = screen.getByText(/multiplicar/i);

    fireEvent.change(input1, { target: { value: '4' } });
    fireEvent.change(input2, { target: { value: '5' } });
    fireEvent.click(multiplyButton);

    await waitFor(() => {
        expect(screen.getByText(/error multiplying numbers/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/resultado/i)).not.toBeInTheDocument();
});
