import React, { useEffect, useRef } from "react";
import { Result } from "./ResultsTable"; // Importing the Result interface
import { checkPoint } from "./checkPointService"; // Importing the function to check point validity
import graphSvg from "../assets/graph.svg"; // Importing the SVG file for background

interface GraphProps {
    results: Result[]; // Array of results to display on the graph
    setResults: React.Dispatch<React.SetStateAction<Result[]>>; // Function to update results
    r: number; // Value of R passed as a prop
}

const Graph: React.FC<GraphProps> = ({ results, setResults, r }) => {
    const svgRef = useRef<SVGSVGElement | null>(null); // Reference for the SVG element

    // Function to draw a point on the graph
    const drawPoint = (x: number, y: number, hit: boolean) => {
        if (svgRef.current) {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            // Transform coordinates
            const svgWidth = 400; // Width of the graph
            const svgHeight = 400; // Height of the graph
            const centerX = svgWidth / 2; // Center X
            const centerY = svgHeight / 2; // Center Y

            // Scale coordinates
            const scaledX = (x / r) * (svgWidth / 2) + centerX; // Transform x
            const scaledY = (-y / r) * (svgHeight / 2) + centerY; // Transform y, invert Y

            circle.setAttribute("cx", `${scaledX}`); // Set X coordinate
            circle.setAttribute("cy", `${scaledY}`); // Set Y coordinate
            circle.setAttribute("r", "4"); // Set radius
            circle.style.fill = hit ? "#0ecc14" : "#d1220f"; // Green for hit, red for miss
            circle.style.stroke = "black"; // Stroke color
            circle.style.strokeWidth = "1px"; // Stroke width
            svgRef.current.appendChild(circle); // Add circle to SVG
        }
    };

    // Function to handle clicks on the graph
    const handleGraphClick = async (e: React.MouseEvent<SVGSVGElement>) => {
        if (svgRef.current) {
            const rect = svgRef.current.getBoundingClientRect();
            const svgWidth = rect.width;
            const svgHeight = rect.height;

            // Calculate coordinates relative to the center of the SVG
            const xValue = ((e.clientX - rect.left) - svgWidth / 2) / (svgWidth / 2) * r;
            const yValue = (svgHeight / 2 - (e.clientY - rect.top)) / (svgHeight / 2) * r;

            // Validate the coordinates
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
                setResults((prevResults) => [...prevResults, newPoint]); // Update results
                drawPoint(xValue, yValue, response.data.result); // Draw the point
            } catch (error) {
                console.error("Error while sending data:", error);
            }
        } else {
            console.error("Failed to get SVG element");
        }
    };

    // Function to validate the data
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

    // Effect to redraw points when results or R changes
    useEffect(() => {
        if (svgRef.current) {
            const points = svgRef.current.querySelectorAll("circle");
            points.forEach(point => point.remove()); // Remove existing points

            results.forEach((result) => {
                drawPoint(result.x, result.y, result.hit); // Redraw points
            });
        }
    }, [results, r]);

    return (
        <div className="main__block">
            <svg
                ref={svgRef}
                width="400"
                height="400"
                onClick={handleGraphClick}
                style={{ position: "relative", cursor: "pointer", border: "1px solid black" }}
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