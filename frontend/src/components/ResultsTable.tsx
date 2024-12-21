// ResultsTable.tsx
import React from "react";

export interface Result {
    x: number;
    y: number;
    r: number;
    hit: boolean;
}

interface ResultsTableProps {
    results: Result[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
    return (
        <div>
            <h3>Результаты</h3>
            <table>
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Попадание</th>
                </tr>
                </thead>
                <tbody>
                {results.map((result, index) => (
                    <tr key={index}>
                        <td>{result.x}</td>
                        <td>{result.y}</td>
                        <td>{result.r}</td>
                        <td>{result.hit ? "Да" : "Нет"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;