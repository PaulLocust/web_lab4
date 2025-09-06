import React from "react";

interface HeaderProps {
    onLogout?: () => void; // Сделаем функцию необязательной
    showLogout?: boolean; // Пропс для отображения кнопки выхода
}

const Header: React.FC<HeaderProps> = ({ onLogout, showLogout }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div>Саранча Павел Александрович P3209 (Лаб-4) Вариант: 983678</div>
                {showLogout && onLogout && ( // Отображаем кнопку только если showLogout true и onLogout передан
                    <button onClick={onLogout}>Выйти</button>
                )}
            </div>
        </header>
    );
};

export default Header;