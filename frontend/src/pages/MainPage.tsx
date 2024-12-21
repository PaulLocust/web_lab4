import React, { useState } from "react";
import Header from "../components/Header";
import Graph from "../components/Graph";
import ParametersForm from "../components/ParametersForm";
import ResultsTable from "../components/ResultsTable";
import "../styles/main.css";

// Определяем интерфейс для результата, чтобы улучшить типизацию
interface Result {
    x: number;
    y: number;
    r: number;
    hit: boolean;
}

const MainPage: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]); // Используем интерфейс Result для состояния

    const handleLogout = () => {
        // Логика выхода из сессии
        localStorage.removeItem("authToken"); // Удаляем токен
        window.location.href = "/"; // Редирект на страницу входа
    };

    return (
        <div>
            <Header onLogout={handleLogout} showLogout={true} />
            <main className="main">
                <div className="main__left-column">
                    <Graph results={results} setResults={setResults} /> {/* Передаем пропсы в Graph */}
                    <ParametersForm setResults={setResults} /> {/* Передаем setResults в ParametersForm */}
                </div>
                <ResultsTable results={results} /> {/* Передаем результаты в таблицу */}
            </main>
        </div>
    );
};

export default MainPage;