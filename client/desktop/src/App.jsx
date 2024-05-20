import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
import Desktop from './components/Desktop/Desktop';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/desktop" element={<Desktop />} />
            </Routes>
        </Router>
    );
}

export default App;
