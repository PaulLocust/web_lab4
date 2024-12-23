import React, { useState } from "react";
import CanvasGraph from "../components/CanvasGraph";
import ParametersForm from "../components/ParametersForm";
import ResultsTable, { Result } from "../components/ResultsTable";
import Header from "../components/Header";

const MainPage: React.FC = () => {
    const [rValue, setRValue] = useState<number>(1); // Состояние для R
    const [results, setResults] = useState<Result[]>([]); // Состояние для результатов

    const handleCanvasClick = async (x: number, y: number, r: number) => {
        try {
            const response = await fetch("/api/check-point", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify({ x, y, r }),
            });
            const data = await response.json();
            const newResult: Result = {
                x,
                y,
                r,
                hit: data.hit, // Предполагаем, что сервер возвращает `hit` в ответе
            };
            setResults((prevResults) => [newResult, ...prevResults]); // Добавляем новую точку в начало
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const handleLogout = () => {
        // Обработка выхода из системы
        localStorage.removeItem("authToken");
        window.location.href = "/";
    };

    return (
        <div>
            <Header onLogout={handleLogout} showLogout={true} />
            <h1>График попаданий</h1>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
                <CanvasGraph rValue={rValue} points={results} onCanvasClick={handleCanvasClick} />
                <ParametersForm setResults={setResults} setR={setRValue} />
            </div>
            <ResultsTable results={results} />
        </div>
    );
};

export default MainPage;