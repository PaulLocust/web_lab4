import React, { useEffect, useRef } from "react";
import { Result } from "./ResultsTable";
import { checkPoint } from "./checkPointService";
import graphSvg from "../assets/graph.svg";

interface GraphProps {
    results: Result[];
    setResults: React.Dispatch<React.SetStateAction<Result[]>>;
    r: number;
}

const Graph: React.FC<GraphProps> = ({ results, setResults, r }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    // Размеры графика и центр
    const CENTER = 200; // Координаты центра (200, 200) в пикселях

    // Функция для преобразования кликов в графические координаты
    const pixelToGraphCoordinates = (x: number, y: number, rect: DOMRect, r: number) => {
        // Положение клика относительно верхнего левого угла SVG
        const clickX = x - rect.left;
        const clickY = y - rect.top;

        // Преобразуем кликовые координаты в графические относительно центра
        const graphX = ((clickX - CENTER) / (CENTER - 30)) * r;
        const graphY = ((CENTER - clickY) / (CENTER - 30)) * r;

        return { graphX, graphY };
    };

    // Преобразуем графические координаты в пиксели
    const graphToPixelCoordinates = (x: number, y: number, r: number) => {
        const pixelX = (x / r) * (CENTER - 30) + CENTER;
        const pixelY = CENTER - (y / r) * (CENTER - 30);

        return { pixelX, pixelY };
    };

    // Рисуем точку
    const drawPoint = (x: number, y: number, hit: boolean) => {
        if (svgRef.current) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            // Преобразуем графические координаты в пиксельные
            const { pixelX, pixelY } = graphToPixelCoordinates(x, y, r);

            circle.setAttribute("cx", `${pixelX}`);
            circle.setAttribute("cy", `${pixelY}`);
            circle.setAttribute("r", "4");
            circle.style.fill = hit ? "#0ecc14" : "#d1220f";
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1px";
            svgRef.current.appendChild(circle);
        }
    };

    // Обработка кликов
    const handleGraphClick = async (e: React.MouseEvent<SVGSVGElement>) => {
        if (svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();

            // Преобразуем координаты клика в графические координаты
            const { graphX: xValue, graphY: yValue } = pixelToGraphCoordinates(e.clientX, e.clientY, rect, r);

            console.log(`Click Position: (${e.clientX}, ${e.clientY})`);
            console.log(`Calculated Graph Coordinates: (X: ${xValue}, Y: ${yValue})`);

            const validation = checkData(xValue, yValue, r);
            if (!validation.isValid) {
                alert(validation.reason);
                return;
            }

            try {
                const response = await checkPoint({ x: xValue, y: yValue, r });
                const newPoint: Result = {
                    x: xValue,
                    y: yValue,
                    r,
                    hit: response.data.result,
                };
                setResults((prevResults) => [...prevResults, newPoint]);
                drawPoint(xValue, yValue, response.data.result);
            } catch (error) {
                console.error("Error while sending data:", error);
            }
        } else {
            console.error("Failed to get SVG element");
        }
    };

    // Валидация данных
    const checkData = (x: number, y: number, r: number) => {
        let resp = { isValid: true, reason: "Valid data" };

        if (isNaN(x) || isNaN(y) || isNaN(r)) {
            resp.isValid = false;
            resp.reason = "Invalid data";
        }
        if (y < -5) {
            resp.isValid = false;
            resp.reason = `Y must be greater than or equal to -5 (Y=${y})`;
        }
        if (y > 3) {
            resp.isValid = false;
            resp.reason = `Y must be less than or equal to 3 (Y=${y})`;
        }

        return resp;
    };

    // Перерисовка точек при изменении результатов или R
    useEffect(() => {
        if (svgRef.current) {
            const points = svgRef.current.querySelectorAll("circle");
            points.forEach(point => point.remove()); // Удаляем существующие точки

            results.forEach((result) => {
                drawPoint(result.x, result.y, result.hit); // Рисуем все точки
            });
        }
    }, [results, r]);

    return (
        <div className="main__block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <svg
                ref={svgRef}
                width="400"
                height="400"
                onClick={handleGraphClick}
                style={{ cursor: "pointer", border: "1px solid black" }}
            >
                <defs>
                    <pattern id="graph-pattern" patternUnits="userSpaceOnUse" width="400" height="400">
                        <image href={graphSvg} width="400" height="400" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#graph-pattern)" />
            </svg>
        </div>
    );
};

export default Graph;