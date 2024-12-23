import React, { useState } from "react";
import { Result } from "./ResultsTable";
import { checkPoint } from "./checkPointService";

interface FormProps {
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    setR: React.Dispatch<React.SetStateAction<number>>;
}

const ParametersForm: React.FC<FormProps> = ({ setResults, setR }) => {
    const [x, setX] = useState<string>("0");
    const [y, setY] = useState<string>("0");
    const [r, setLocalR] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка на наличие точки в начале или в конце значения
        if (x.startsWith('.') || x.endsWith('.') || y.startsWith('.') || y.endsWith('.')) {
            setError("Некорректное действие с точкой.");
            return;
        }

        // Преобразование значений x и y
        const xValue = parseFloat(x);
        const yValue = parseFloat(y);

        // Проверка на корректность ввода
        if (isNaN(xValue)) {
            setError("X должен быть числом.");
            return;
        }
        if (isNaN(yValue)) {
            setError("Y должен быть числом.");
            return;
        }

        // Проверка ограничений
        if (xValue < -3 || xValue > 3) {
            setError("X должен быть в диапазоне [-3, 3]");
            return;
        }
        if (yValue < -5 || yValue > 3) {
            setError("Y должен быть в диапазоне [-5, 3]");
            return;
        }
        if (r < 1 || r > 3) {
            setError("R должен быть в диапазоне [1, 3]");
            return;
        }

        setError(null); // Сброс ошибки, если все проверки пройдены

        try {
            const response = await checkPoint({ x: xValue, y: yValue, r });
            const newPoint: Result = {
                x: xValue,
                y: yValue,
                r,
                hit: response.data.result // Предполагаем, что в ответе есть свойство 'hit'
            };
            setResults(prevResults => [newPoint, ...prevResults]); // Добавляем новую точку в начало
        } catch (error) {
            console.error("Ошибка при отправке формы:", error);
            setError("Произошла ошибка при отправке данных.");
        }
    };

    const handleRChange = (value: number) => {
        setLocalR(value);
        setR(value);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Проверка на допустимые символы (числа, точка, минус) и ограничение на 6 знаков после запятой
        const regex = /^-?\d*\.?\d{0,6}$/; // Регулярное выражение для проверки

        // Устанавливаем значение только если оно корректно или пустое
        if (regex.test(value) || value === "") {
            setter(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Параметры</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <label>Выберите X: </label>
                <input
                    type="text"
                    value={x}
                    onChange={handleInputChange(setX)}
                />
            </div>

            <div>
                <label>Выберите Y: </label>
                <input
                    type="text"
                    value={y}
                    onChange={handleInputChange(setY)}
                />
            </div>

            <div>
                <label>Выберите R: </label>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    {[1, 1.5, 2, 2.5, 3].map((value) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => handleRChange(value)}
                            style={{
                                padding: "10px 15px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: r === value ? "#007BFF" : "#f0f0f0",
                                color: r === value ? "#fff" : "#000",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                            }}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" style={{ marginTop: "20px" }}>Проверить</button>
        </form>
    );
};

export default ParametersForm;