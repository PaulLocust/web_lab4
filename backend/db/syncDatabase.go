package db

import (
	"web_lab4/backend/models"
)

func SyncDatabase() {
	err := DBCon.AutoMigrate(&models.User{}, &models.Point{})
	if err != nil {
		return
	}

}
