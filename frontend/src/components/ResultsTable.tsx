import React from "react";

interface Result {
    x: number;
    y: number;
    r: number;
    hit: boolean;
}

interface TableProps {
    results: Result[];
}

const ResultsTable: React.FC<TableProps> = ({ results }) => {
    return (
        <div className="main__block">
            <h3 className="result-title">Результат</h3>
            <div id="result">
                <table style={{ width: "100%", textAlign: "center" }}>
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Попал?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.map((res, index) => (
                        <tr key={index}>
                            <td>{res.x}</td>
                            <td>{res.y}</td>
                            <td>{res.r}</td>
                            <td style={{ color: res.hit ? "green" : "red" }}>
                                {res.hit ? "Да" : "Нет"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsTable;