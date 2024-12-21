import React, { useState } from "react";
import { Result } from "./ResultsTable.tsx";
import { checkPoint } from "./checkPointService.ts"; // Импортируем Result из ResultsTable

interface FormProps {
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
}

const ParametersForm: React.FC<FormProps> = ({ setResults }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(1);
    const [error, setError] = useState<string | null>(null); // Состояние для хранения сообщения об ошибке

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка ограничений
        if (x < -3 || x > 3) {
            setError("X должен быть в диапазоне [-3, 3]");
            return;
        }
        if (y < -5 || y > 3) {
            setError("Y должен быть в диапазоне [-5, 3]");
            return;
        }
        if (r < 1 || r > 3) {
            setError("R должен быть в диапазоне [1, 3]");
            return;
        }

        setError(null); // Сбросить ошибку, если все проверки пройдены

        try {
            const response = await checkPoint({ x, y, r });
            const newPoint: Result = { // Используем интерфейс Result
                x,
                y,
                r,
                hit: response.data.result // Предполагаем, что в ответе есть свойство 'hit'
            };
            setResults(prevResults => [...prevResults, newPoint]); // Добавляем новую точку в результаты
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
            // Обработайте ошибку (например, покажите сообщение пользователю)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Параметры</h3>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Отображение сообщения об ошибке */}
            <div>
                <label>Выберите X: </label>
                <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(Number(e.target.value))}
                    min="-3"
                    max="3"
                    step="0.1" // Добавляем шаг для более точного ввода
                />
            </div>
            <div>
                <label>Выберите Y: </label>
                <input
                    type="number"
                    value={y}
                    onChange={(e) => setY(Number(e.target.value))}
                    min="-5"
                    max="3"
                    step="0.1" // Добавляем шаг для более точного ввода
                />
            </div>
            <div>
                <label>Выберите R: </label>
                {[1, 1.5, 2, 2.5, 3].map((value) => (
                    <label key={value}>
                        <input
                            type="radio"
                            value={value}
                            checked={r === value}
                            onChange={() => setR(value)}
                        />
                        {value}
                    </label>
                ))}
            </div>
            <button type="submit">Проверить</button>
        </form>
    );
};

export default ParametersForm;