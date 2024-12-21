import React, { useState } from "react";
import ParametersForm from "./ParametersForm";
import Graph from "./Graph";
import { Result } from "./ResultsTable";

const ParentComponent: React.FC = () => {
    const [results, setResults] = useState<Result[]>([]); // Состояние для результатов
    const [r, setR] = useState(1); // Состояние для R

    return (
        <div>
            <ParametersForm setResults={setResults} setR={setR} /> {/* Передаем setR в ParametersForm */}
            <Graph results={results} r={r} setResults={setResults} /> {/* Передаем r в Graph */}
        </div>
    );
};

export default ParentComponent;