package main

import (
	"errors"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func connectToDatabase() (*sqlx.DB, error) {
	connStr := os.Getenv("MYSQL_URL")

	if connStr == "" {
		return nil, errors.New("MYSQL_URL is not set")
	}

	db, err := sqlx.Open("mysql", connStr)

	return db, err
}

func Setup() *gin.Engine {
	_, err := connectToDatabase()

	if err != nil {
		log.Fatal(err)
	}

	router := gin.Default()

	return router
}

func Run(addr ...string) *gin.Engine {
	router := Setup()
	router.Run(addr...)
	return router
}
