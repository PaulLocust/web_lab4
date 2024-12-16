import React, { useState } from "react";
import Header from "../components/Header";
import Graph from "../components/Graph";
import ParametersForm from "../components/ParametersForm";
import ResultsTable from "../components/ResultsTable";
import "../styles/main.css";

interface Result {
    x: number;
    y: number;
    r: number;
    hit: boolean;
}

const MainPage: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]);

    const checkHit = (x: number, y: number, r: number): boolean => {
        return (
            (x >= 0 && y >= 0 && y <= -x + r) || // Треугольник
            (x <= 0 && y <= 0 && x * x + y * y <= (r / 2) * (r / 2)) || // Четверть круга
            (x >= 0 && y <= 0 && x <= r / 2 && y >= -r) // Прямоугольник
        );
    };

    const handleSubmit = (x: number, y: number, r: number) => {
        const hit = checkHit(x, y, r);
        const newResult = { x, y, r, hit };
        setResults((prev) => [...prev, newResult]);
    };

    return (
        <div>
            <Header />
            <main className="main">
                <div className="main__left-column">
                    <Graph />
                    <ParametersForm onSubmit={handleSubmit} />
                </div>
                <ResultsTable results={results} />
            </main>
        </div>
    );
};

export default MainPage;