import React from "react";

interface Props {
    isLogin: boolean;
    toggleAuth: () => void;
}

const ToggleAuth: React.FC<Props> = ({ isLogin, toggleAuth }) => {
    return (
        <div className="toggle-auth">
            <span>
                {isLogin
                    ? "Нет аккаунта?"
                    : "Уже есть аккаунт?"}{" "}
            </span>
            <button type="button" onClick={toggleAuth}>
                {isLogin ? "Регистрация" : "Вход"}
            </button>
        </div>
    );
};

export default ToggleAuth;