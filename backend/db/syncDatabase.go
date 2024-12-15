package db

import (
	"gorm.io/gorm"
	"web_lab4/backend/models"
)

func SyncDatabase(dbCon *gorm.DB) {
	dbCon.AutoMigrate(&models.User{})
}
