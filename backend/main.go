package main

import (
	"github.com/gin-gonic/gin"
	_ "net/http"
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

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	r.Run()

}
