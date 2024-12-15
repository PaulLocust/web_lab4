package initializers

import (
	"log"
	"os"
	"strconv"
)

type Config struct {
	Host     string
	User     string
	Password string
	DBName   string
	Port     int
	SSLMode  string
}

func LoadEnvDbConfig() *Config {
	// Загрузка переменных окружения из файла .env

	port, err := strconv.Atoi(os.Getenv("DB_PORT"))
	if err != nil {
		log.Fatalf("Invalid DB_PORT: %v", err)
	}

	return &Config{
		Host:     os.Getenv("DB_HOST"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   os.Getenv("DB_NAME"),
		Port:     port,
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}
}
