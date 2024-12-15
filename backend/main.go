package main

import (
	"github.com/gin-gonic/gin"
	_ "net/http"
	"web_lab4/backend/db"
	"web_lab4/backend/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	dbCon := db.ConnectToDb()
	db.SyncDatabase(dbCon)
}

func main() {

	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080

	//// Подключение к базе данных
	//if err := db.Init(); err != nil {
	//	log.Fatal("Database connection error:", err)
	//}
	//
	//router := gin.Default()
	//
	//// Регистрация маршрутов
	//router.POST("/api/register", gin.WrapF(handlers.RegisterUser(db.DB)))
	//router.POST("/api/login", gin.WrapF(handlers.LoginUser(db.DB)))
	//
	//log.Println("Server is running on http://localhost:8080")
	//log.Fatal(router.Run(":8080"))
}
