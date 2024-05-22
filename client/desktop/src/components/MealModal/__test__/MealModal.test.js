// MealModal.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // para usar matchers como toBeInTheDocument
import MealModal from '../MealModal';
import axios from 'axios';

jest.mock('axios');

const mockMeal = {
    strMeal: 'Spaghetti Carbonara',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strInstructions: 'Bring a large pot of salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.',
    strIngredient1: 'Spaghetti',
    strMeasure1: '200g',
    strIngredient2: 'Egg',
    strMeasure2: '2',
    strIngredient3: 'Parmesan cheese',
    strMeasure3: '50g',
    strIngredient4: null,
    strMeasure4: null,
    strYoutube: 'https://www.youtube.com/watch?v=3AAdKl1UYZs'
};

test('renderizaz el modal', () => {
    const onClose = jest.fn();
    render(<MealModal onClose={onClose} />);

    const closeButton = screen.getByText(/cerrar/i);
    expect(closeButton).toBeInTheDocument();

    const heading = screen.getByText(/buscar meal/i);
    expect(heading).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/buscar meal/i);
    expect(input).toBeInTheDocument();

    const searchButton = screen.getByText(/buscar/i);
    expect(searchButton).toBeInTheDocument();
});

test('muestra el meal encontrado', async () => {
    axios.get.mockResolvedValueOnce({ data: { meals: [mockMeal] } });

    const onClose = jest.fn();
    render(<MealModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar meal/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Carbonara' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(mockMeal.strMeal)).toBeInTheDocument();
    });

    expect(screen.getByText(mockMeal.strCategory)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.strArea)).toBeInTheDocument();
    expect(screen.getByText(mockMeal.strInstructions)).toBeInTheDocument();
    expect(screen.getByText(/200g Spaghetti/)).toBeInTheDocument();
    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});

test('muestra no meal encontrado', async () => {
    axios.get.mockResolvedValueOnce({ data: { meals: null } });

    const onClose = jest.fn();
    render(<MealModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar meal/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Unknown Meal' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/no se encontró ninguna comida/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});

test('maneja exito', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const onClose = jest.fn();
    render(<MealModal onClose={onClose} />);

    const input = screen.getByPlaceholderText(/buscar meal/i);
    const searchButton = screen.getByText(/buscar/i);

    fireEvent.change(input, { target: { value: 'Carbonara' } });
    fireEvent.click(searchButton);

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/no se encontró ninguna comida/i)).toBeInTheDocument();
});
