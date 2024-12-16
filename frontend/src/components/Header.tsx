import React from "react";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div>Саранча Павел Александрович Р3209</div>
                <div></div>
                <div>
                    <a href="/" style={{ color: "purple" }}>Вернуться</a>
                </div>
            </div>
        </header>
    );
};

export default Header;