package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"math"
	"net/http"
	"web_lab4/backend/db"
	"web_lab4/backend/helpers"
	"web_lab4/backend/models"
)

// Кастомная валидация для R (проверка, что R кратно 0.5)
func customRValidation(fl validator.FieldLevel) bool {
	r := fl.Field().Float()
	return r >= 1 && r <= 3 && math.Mod(r, 0.5) == 0
}

func CheckPoint(c *gin.Context) {

	// Get the x/y/r from the req body
	var body struct {
		X float64 `json:"x" validate:"gte=-3,lte=3"`                  // X должен быть в диапазоне [-3, 3]
		Y float64 `json:"y" validate:"gte=-5,lte=3"`                  // Y должен быть в диапазоне [-5, 3]
		R float64 `json:"r" validate:"gte=1,lte=3,customRValidation"` // R должен быть в диапазоне [1, 3] и кратен 0.5
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body/check validation rules",
		})

		return
	}

	// Check the point
	hitResult := helpers.Hit(body.X, body.Y, body.R)

	// Get userId and set it to body
	user, _ := c.Get("user")
	currentUser := user.(models.User)
	userId := int(currentUser.ID)

	// Create point model
	point := models.Point{X: body.X, Y: body.Y, R: body.R, Result: hitResult, UserId: userId}

	result := db.DBCon.Create(&point)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create point",
		})

		return
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"result": hitResult,
	})
}
