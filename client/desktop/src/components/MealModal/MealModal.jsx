import { useState } from 'react';
import axios from 'axios';
import './MealModal.css';

const MealModal = ({ onClose }) => {
    const [meal, setMeal] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const searchMeal = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            setMeal(response.data.meals ? response.data.meals[0] : null);
        } catch (error) {
            console.error('Error fetching meal:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="meal-modal">
            <button className='close-button' onClick={onClose}>Cerrar</button>
            <h2>Buscar Meal</h2>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar meal"
                />
                <button onClick={searchMeal}>Buscar</button>
            </div>
            {loading ? <p>Cargando...</p> : (
                meal ? (
                    <div>
                        <h3>{meal.strMeal}</h3>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <p><strong>Categoría:</strong> {meal.strCategory}</p>
                        <p><strong>Área:</strong> {meal.strArea}</p>
                        <p><strong>Instrucciones:</strong> {meal.strInstructions}</p>
                        <p><strong>Ingredientes:</strong></p>
                        <ul>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                                const ingredient = meal[`strIngredient${i}`];
                                const measure = meal[`strMeasure${i}`];
                                return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
                            })}
                        </ul>
                        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">Ver en YouTube</a>
                    </div>
                ) : <p>No se encontró ninguna comida</p>
            )}
        </div>
    );
};

export default MealModal;
