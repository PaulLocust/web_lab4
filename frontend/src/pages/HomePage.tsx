import React from "react";
import "../styles/index.css";

const HomePage: React.FC = () => {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div>Саранча Павел Александрович P3209</div>
                    <div></div>
                </div>
            </header>
            <main>
                <a className="link-to-main-page" href="/main">
                    Переход на основную страницу (нажать)
                </a>
            </main>
        </>
    );
};

export default HomePage;