import React from "react";
import graphSvg from "../assets/graph.svg"; // Импортируем SVG файл

const Graph: React.FC = () => {
    return (
        <div className="main__block">
            <img src={graphSvg} alt="Graph" className="graph" />
        </div>
    );
};

export default Graph;