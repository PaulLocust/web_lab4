package controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"web_lab4/backend/db"
	"web_lab4/backend/helpers"
	"web_lab4/backend/models"
)

func CheckPoint(c *gin.Context) {

	// Get the x/y/r off req body
	var body struct {
		X      float64 `json:"x" binding:"gte=-5,lte=3"` // X должен быть в диапазоне [-5, 3]
		Y      float64 `json:"y" binding:"gte=-3,lte=3"` // Y должен быть в диапазоне [-3, 3]
		R      float64 `json:"r" binding:"gte=-5,lte=3"` // R должен быть в диапазоне [-5, 3]
		Result bool    `json:"result"`
		UserId int     `json:"userId"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body/check validation rules",
		})

		return
	}

	// Check the point and set the result variable for body
	body.Result = helpers.Hit(body.X, body.Y, body.R)

	user, _ := c.Get("user")
	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Приводим интерфейс к нужному типу (models.User)
	currentUser, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User type assertion failed"})
		return
	}
	body.UserId = int(currentUser.ID)
	// Create point
	point := models.Point{X: body.X, Y: body.Y, R: body.R, Result: body.Result, UserId: body.UserId}

	result := db.DBCon.Create(&point)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create point",
		})

		return
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{})
}
