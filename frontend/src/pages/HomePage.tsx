import React, { useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import ToggleAuth from "../components/ToggleAuth";
import "../styles/index.css";

const HomePage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleAuthSuccess = () => {
        window.location.href = "/main"; // Перенаправление на основную страницу
    };

    return (
        <>
            <Header showLogout={false} /> {/* Передаем showLogout как false */}
            <main className="auth-container">
                <div className="auth-card">
                    {isLogin ? (
                        <LoginForm onAuthSuccess={handleAuthSuccess} />
                    ) : (
                        <SignupForm onAuthSuccess={handleAuthSuccess} />
                    )}
                    <ToggleAuth isLogin={isLogin} toggleAuth={() => setIsLogin(!isLogin)} />
                </div>
            </main>
        </>
    );
};

export default HomePage;