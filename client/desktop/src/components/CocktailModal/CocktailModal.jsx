import { useState } from 'react';
import axios from 'axios';
import './CocktailModal.css';

const CocktailModal = ({ onClose }) => {
    const [cocktail, setCocktail] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const searchCocktail = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            setCocktail(response.data.drinks ? response.data.drinks[0] : null);
        } catch (error) {
            console.error('Error fetching cocktail:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cocktail-modal">
            <button className="close-button" onClick={onClose}>Cerrar</button>
            <h2>Buscar Cóctel</h2>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar cóctel"
                />
                <button onClick={searchCocktail}>Buscar</button>
            </div>
            {loading ? <p>Cargando...</p> : (
                cocktail ? (
                    <div>
                        <h3>{cocktail.strDrink}</h3>
                        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                        <p><strong>Categoría:</strong> {cocktail.strCategory}</p>
                        <p><strong>Tipo:</strong> {cocktail.strAlcoholic}</p>
                        <p><strong>Instrucciones:</strong> {cocktail.strInstructions}</p>
                        <p><strong>Ingredientes:</strong></p>
                        <ul>
                            {Array.from({ length: 15 }, (_, i) => i + 1).map(i => {
                                const ingredient = cocktail[`strIngredient${i}`];
                                const measure = cocktail[`strMeasure${i}`];
                                return ingredient ? <li key={i}>{measure} {ingredient}</li> : null;
                            })}
                        </ul>
                        {cocktail.strVideo && (
                            <a href={cocktail.strVideo} target="_blank" rel="noopener noreferrer">Ver en YouTube</a>
                        )}
                    </div>
                ) : <p>No se encontró ningún cóctel</p>
            )}
        </div>
    );
};

export default CocktailModal;
