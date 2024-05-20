import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tech from "./tech.png";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5555/auth/login', {
                username,
                password
            });
            const token = response.data.token;
            localStorage.setItem('token', token); // Almacena el token JWT en el almacenamiento local
            // Redirigir al usuario a la ruta '/desktop' después del inicio de sesión exitoso
            navigate('/desktop');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='login-welcome__img'>
                    <img src={tech} alt='Technology' />
                </div>

                <h2>BIENVENIDO</h2>

                {error && <p>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='username'>Usuario</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className='btm_submit' type='submit'>
                        INGRESAR
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
