import React, { useState } from "react";

interface FormProps {
    onSubmit: (x: number, y: number, r: number) => void;
}

const ParametersForm: React.FC<FormProps> = ({ onSubmit }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(x, y, r);
    };

    return (
        <form className="main__block" onSubmit={handleSubmit}>
            <h3>Параметры</h3>
            <div className="row">
                <label>Выберите X: </label>
                <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))}/>
            </div>
            <div className="row">
                <label>Выберите Y: </label>
                <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} step="0.1"/>
            </div>
            <div className="row">
                <label>Выберите R: </label>
                {[1, 1.5, 2, 2.5, 3].map((value) => (
                    <label key={value}>
                        <input
                            type="radio"
                            value={value}
                            checked={r === value}
                            onChange={() => setR(value)}
                        />
                        {value}
                    </label>
                ))}
            </div>
            <button type="submit" className="main__block submit_button">Проверить</button>
        </form>
    );
};

export default ParametersForm;