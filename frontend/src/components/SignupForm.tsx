import React, { useState } from "react";
import axios from "axios";

interface Props {
    onAuthSuccess: () => void;
}

const SignupForm: React.FC<Props> = ({ onAuthSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/signup", { username, password }, { withCredentials: true });
            onAuthSuccess();
        } catch (err) {
            setError("Ошибка: Не удалось зарегистрироваться.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <div className="form-group">
                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="submit-button">
                Зарегистрироваться
            </button>
        </form>
    );
};

export default SignupForm;