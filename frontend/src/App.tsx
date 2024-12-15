import {useState} from "react";

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Проверка на успешный ответ
            if (!response.ok) {
                const errorData = await response.json(); // Получаем ошибку как JSON
                setMessage(errorData.message || 'Error');
                return;
            }

            const data = await response.json();
            setMessage(data.message || 'Registration successful');
        } catch (error) {
            setMessage('Network error');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Проверка на успешный ответ
            if (!response.ok) {
                const errorData = await response.json(); // Получаем ошибку как JSON
                setMessage(errorData.message || 'Error');
                return;
            }

            const data = await response.json();
            setMessage(data.message || 'Login successful');
        } catch (error) {
            setMessage('Network error');
        }
    };

    return (
        <div>
            <h1>User Authentication</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;