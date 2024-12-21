import React, { useState } from "react";
import Header from "../components/Header";
import Graph from "../components/Graph";
import ParametersForm from "../components/ParametersForm";
import ResultsTable from "../components/ResultsTable";
import "../styles/main.css";

const MainPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]); // Используем any[] или создайте отдельный интерфейс для состояния

    const handleLogout = () => {
        // Здесь вы можете добавить логику для выхода из сессии
        // Например, очистка токена из localStorage или вызов API
        localStorage.removeItem("authToken"); // Пример удаления токена
        // Дополнительная логика, если необходимо
        // Например, редирект на страницу входа
        window.location.href = "/"; // или используйте react-router для навигации
    };

    return (
        <div>
            <Header onLogout={handleLogout} showLogout={true} /> {/* Передаем showLogout */}
            <main className="main">
                <div className="main__left-column">
                    <Graph />
                    <ParametersForm setResults={setResults} />
                </div>
                <ResultsTable results={results} />
            </main>
        </div>
    );
};

export default MainPage;