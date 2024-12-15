package models

import "gorm.io/gorm"

type Point struct {
	gorm.Model
	X      float64 `gorm:"not null"`
	Y      float64 `gorm:"not null"`
	R      float64 `gorm:"not null"`
	Result bool    `gorm:"not null"`
	UserId int     `gorm:"not null"`
}
