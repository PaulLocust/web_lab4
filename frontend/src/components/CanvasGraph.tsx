import React, { useRef, useEffect } from 'react';

interface Point {
    x: number;
    y: number;
    r: number;
    hit: boolean;
}

interface CanvasGraphProps {
    rValue: number;
    points: Point[];
    onCanvasClick: (x: number, y: number, r: number) => void;
}

const CanvasGraph: React.FC<CanvasGraphProps> = ({ rValue, points, onCanvasClick }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const GRAPH_MIN = 30;
    const GRAPH_MAX = 370;
    const GRAPH_SIZE = GRAPH_MAX - GRAPH_MIN;
    const CENTER = 200;

    const drawGraph = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawAxes(ctx);
        if (rValue) {
            drawArea(ctx, rValue);
        }
        drawPoints(ctx, points);
    };

    const drawAxes = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(0, CENTER);
        ctx.lineTo(400, CENTER);
        ctx.moveTo(CENTER, 0);
        ctx.lineTo(CENTER, 400);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(390, 195);
        ctx.lineTo(400, 200);
        ctx.lineTo(390, 205);
        ctx.moveTo(195, 10);
        ctx.lineTo(200, 0);
        ctx.lineTo(205, 10);
        ctx.stroke();

        const step = GRAPH_SIZE / (2 * rValue);
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';

        for (let i = -rValue; i <= rValue; i++) {
            const x = CENTER + i * step;
            const y = CENTER - i * step;

            if (i !== 0) {
                ctx.beginPath();
                ctx.moveTo(x, CENTER - 5);
                ctx.lineTo(x, CENTER + 5);
                ctx.stroke();
                ctx.textAlign = 'center';
                ctx.fillText(i.toString(), x, CENTER + 15);

                ctx.beginPath();
                ctx.moveTo(CENTER - 5, y);
                ctx.lineTo(CENTER + 5, y);
                ctx.stroke();
                ctx.textAlign = 'left';
                ctx.fillText(i.toString(), CENTER + 10, y + 3);
            }
        }
    };

    const drawArea = (ctx: CanvasRenderingContext2D, rValue: number) => {
        const step = GRAPH_SIZE / (2 * rValue);
        ctx.fillStyle = 'rgba(22, 56, 178, 0.5)';

        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        ctx.arc(CENTER, CENTER, rValue * step / 2, Math.PI / 2, Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.fillRect(
            CENTER - rValue * step,
            CENTER - rValue * step,
            rValue * step,
            rValue * step
        );

        ctx.beginPath();
        ctx.moveTo(CENTER, CENTER);
        ctx.lineTo(CENTER + rValue * step, CENTER);
        ctx.lineTo(CENTER, CENTER - rValue * step / 2);
        ctx.closePath();
        ctx.fill();
    };

    const drawPoints = (ctx: CanvasRenderingContext2D, points: Point[]) => {
        points.forEach(point => {
            const { pixelX, pixelY } = graphToPixelCoordinates(point.x, point.y, rValue);
            ctx.fillStyle = point.hit ? 'rgb(22, 178, 56)' : 'rgb(209, 34, 15)';
            ctx.beginPath();
            ctx.arc(pixelX, pixelY, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    const pixelToGraphCoordinates = (x: number, y: number, rValue: number) => {
        const step = GRAPH_SIZE / (2 * rValue);
        const graphX = (x - CENTER) / step;
        const graphY = (CENTER - y) / step;

        return { graphX, graphY };
    };

    const graphToPixelCoordinates = (x: number, y: number, rValue: number) => {
        const step = GRAPH_SIZE / (2 * rValue);
        const pixelX = CENTER + x * step;
        const pixelY = CENTER - y * step;

        return { pixelX, pixelY };
    };

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const { graphX: x, graphY: y } = pixelToGraphCoordinates(xClick, yClick, rValue);

        onCanvasClick(x, y, rValue);
    };

    useEffect(() => {
        drawGraph();
    }, [rValue, points]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width="400"
                height="400"
                style={{
                    display: 'block',
                    margin: 'auto',
                    border: '1px solid black',
                    cursor: 'pointer',
                }}
                onClick={handleCanvasClick}
            />
        </div>
    );
};

export default CanvasGraph;