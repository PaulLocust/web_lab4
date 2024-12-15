package db

import (
	"web_lab4/backend/models"
)

func SyncDatabase() {
	err := DBCon.AutoMigrate(&models.User{})
	if err != nil {
		return
	}
}
