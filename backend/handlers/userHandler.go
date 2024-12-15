package handlers

import (
	"database/sql"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"web_lab4/backend/models"
)

func RegisterUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, `{"message": "Invalid request"}`, http.StatusBadRequest)
			return
		}

		// Хешируем пароль
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, `{"message": "Error hashing password"}`, http.StatusInternalServerError)
			return
		}

		// Сохраняем пользователя
		_, err = db.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", user.Username, string(hashedPassword))
		if err != nil {
			http.Error(w, `{"message": "Username already exists"}`, http.StatusConflict)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
	}
}

func LoginUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user models.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, `{"message": "Invalid request"}`, http.StatusBadRequest)
			return
		}

		var hashedPassword string
		err := db.QueryRow("SELECT password FROM users WHERE username = $1", user.Username).Scan(&hashedPassword)
		if err != nil {
			http.Error(w, `{"message": "User not found"}`, http.StatusUnauthorized)
			return
		}

		// Проверяем пароль
		if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(user.Password)); err != nil {
			http.Error(w, `{"message": "Invalid credentials"}`, http.StatusUnauthorized)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
	}
}
