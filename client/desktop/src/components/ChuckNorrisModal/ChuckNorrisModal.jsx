import { useState, useEffect } from 'react';
import axios from 'axios';
import './ChuckNorrisModal.css';

const ChuckNorrisModal = ({ onClose }) => {
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const response = await axios.get('https://api.chucknorris.io/jokes/random');
                setJoke(response.data.value);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoke();
    }, []);

    return (
        <div className="chuck-norris-modal">
            <button className='close-button' onClick={onClose}>Cerrar</button>
            <h2>Chuck Norris Broma</h2>
            {loading ? <p>Cargando...</p> : <p>{joke}</p>}
        </div>
    );
};

export default ChuckNorrisModal;
