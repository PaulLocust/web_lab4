import React, { useEffect, useState } from "react";
import { Result } from "./ResultsTable"; // Импортируем интерфейс Result
import { checkPoint } from "./checkPointService"; // Импортируем функцию проверки точки

interface GraphProps {
    results: Result[]; // Результаты для отображения на графике
    setResults: React.Dispatch<React.SetStateAction<Result[]>>; // Функция для обновления результатов
}

const Graph: React.FC<GraphProps> = ({ results, setResults }) => {
    const [r] = useState(1); // Значение R по умолчанию

    const drawPoint = (x: number, y: number, hit: boolean) => {
        const svg = document.getElementById("graph-svg");
        if (svg) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", (x * 170) / r + 200 + "px");
            circle.setAttribute("cy", (-y * 170) / r + 200 + "px");
            circle.setAttribute("r", "4");
            circle.style.fill = hit ? "#0ecc14" : "#d1220f"; // Зеленый для попадания, красный для промаха
            circle.style.stroke = "black";
            circle.style.strokeWidth = "1px";
            svg.appendChild(circle);
        }
    };

    const handleGraphClick = async (e: React.MouseEvent<SVGSVGElement>) => {
        const rect = (e.target as SVGSVGElement).getBoundingClientRect();
        const xValue = ((e.clientX - rect.left - rect.width / 2) / 135) * r;
        const yValue = ((rect.height / 2 - (e.clientY - rect.top)) / 135) * r;

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
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const checkData = (x: number, y: number, r: number) => {
        let resp = { isValid: true, reason: "Корректные данные" };

        if (isNaN(x) || isNaN(y) || isNaN(r)) {
            resp.isValid = false;
            resp.reason = "Невалидные данные";
        }
        if (y < -5) {
            resp.isValid = false;
            resp.reason = `Y должен быть больше или равен -5 (Y=${y})`;
        }
        if (y > 3) {
            resp.isValid = false;
            resp.reason = `Y должен быть меньше или равен 3 (Y=${y})`;
        }

        return resp;
    };

    useEffect(() => {
        const svg = document.getElementById("graph-svg");
        if (svg) {
            svg.innerHTML = ""; // Очищаем график перед перерисовкой
            if (results && Array.isArray(results)) {
                results.forEach((result) => {
                    drawPoint(result.x, result.y, result.hit);
                });
            }
        }
    }, [results, r]);

    return (
        <div className="main__block">
            <svg
                id="graph-svg"
                width="400"
                height="400"
                onClick={handleGraphClick}
                style={{ border: "1px solid black" }}
            >
                <rect width="100%" height="100%" fill="white" />
                {/* Здесь можно добавить дополнительные линии и метки для графика */}
            </svg>
        </div>
    );
};

export default Graph;