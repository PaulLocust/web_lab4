# Конфигурация подключения к бд
DB_HOST 	:= localhost
DB_PORT 	:= 5432
DB_USER 	:= postgres
DB_PASSWORD := root
DB_NAME 	:= web_lab4
DB_SSLMODE  := disable

# Строка подключения к базе данных
DB_URL := "postgresql://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=$(DB_SSLMODE)"
MIGRATIONS_DIR := ./backend/db/migration

.PHONY: migration_up migration_down migration_fix

migration_up:
	migrate -path $(MIGRATIONS_DIR) -database $(DB_URL) -verbose up

migration_down:
	migrate -path $(MIGRATIONS_DIR) -database $(DB_URL) -verbose down

migration_fix:
ifndef VERSION
	$(error VERSION не задан. Используйте: make migration_fix VERSION=<номер_версии>)
endif
	migrate -path $(MIGRATIONS_DIR) -database $(DB_URL) force $(VERSION)