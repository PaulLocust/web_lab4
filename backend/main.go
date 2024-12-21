package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "net/http"
	"time"
	"web_lab4/backend/controllers"
	"web_lab4/backend/db"
	"web_lab4/backend/initializers"
	"web_lab4/backend/middleware"
)

func init() {
	initializers.LoadEnvVariables()
	db.ConnectToDb()
	db.SyncDatabase()
}

func main() {

	r := gin.Default()

	// Настройка CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},                   // Разрешить только ваш фронтенд
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},            // Разрешить методы
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, // Разрешить заголовки
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,           // Разрешить отправку куки
		MaxAge:           12 * time.Hour, // Кэшировать настройки CORS
	}))

	authorized := r.Group("/api")
	authorized.Use(middleware.RequireAuth)

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	authorized.GET("/validate", controllers.Validate)
	authorized.POST("/check-point", controllers.CheckPoint)
	r.Run()

}
