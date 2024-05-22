// CocktailModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import CocktailModal from '../CocktailModal';
import axios from 'axios';

jest.mock('axios');

const mockCocktail = {
    strDrink: 'Margarita',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg',
    strCategory: 'Ordinary Drink',
    strAlcoholic: 'Alcoholic',
    strInstructions: 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten..',
    strIngredient1: 'Tequila',
    strMeasure1: '1 1/2 oz ',
    strIngredient2: 'Triple sec',
    strMeasure2: '1/2 oz ',
    strIngredient3: 'Lime juice',
    strMeasure3: '1 oz ',
    strIngredient4: null,
    strMeasure4: null,
    strVideo: null,
};

test('renderiza cocktail componente', () => {
    const onClose = jest.fn();
    render(<CocktailModal onClose={onClose} />);

    const closeButton = screen.getByText(/cerrar/i);
    expect(closeButton).toBeInTheDocument();

    const heading = screen.getByText(/buscar cóctel/i);
    expect(heading).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/buscar cóctel/i);
    expect(input).toBeInTheDocument();

    const searchButton = screen.getByText(/buscar/i);
    expect(searchButton).toBeInTheDocument();
});

test('muestra loading', async () => {
    axios.get.mockResolvedValueOnce({ data: { drinks: [mockCocktail] } });

    const onClose = jest.fn();
    render(<CocktailModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar cóctel/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Margarita' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(mockCocktail.strDrink)).toBeInTheDocument();
    });

    expect(screen.getByText(mockCocktail.strCategory)).toBeInTheDocument();
    expect(screen.getByText(mockCocktail.strAlcoholic)).toBeInTheDocument();
    expect(screen.getByText(mockCocktail.strInstructions)).toBeInTheDocument();
    expect(screen.getByText(/1 1\/2 oz Tequila/)).toBeInTheDocument();
    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});

test('muestra no concktail encontrado', async () => {
    axios.get.mockResolvedValueOnce({ data: { drinks: null } });

    const onClose = jest.fn();
    render(<CocktailModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar cóctel/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Unknown Cocktail' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/no se encontró ningún cóctel/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});

test('manejo error de fetch', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const onClose = jest.fn();
    render(<CocktailModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar cóctel/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Margarita' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/no se encontró ningún cóctel/i)).toBeInTheDocument();
});
