package routers

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Server struct {
	db     *sqlx.DB
	router *gin.Engine
}

func connectToDatabase() (*sqlx.DB, error) {
	connStr := os.Getenv("MYSQL_URL")

	if connStr == "" {
		return nil, errors.New("MYSQL_URL is not set")
	}

	db, err := sqlx.Open("mysql", connStr)

	return db, err
}

func CreateServer() *Server {
	db, err := connectToDatabase()

	if err != nil {
		log.Fatal(err)
	} else {
		fmt.Println("Connected to database")
	}

	router := gin.Default()

	return &Server{
		db:     db,
		router: router,
	}
}

func (s *Server) helloWorld(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, "Cool Game 3 Web API")
}

func (s *Server) Run(addr ...string) {
	routers := s.router.Group("/")

	routers.GET("/", s.helloWorld)
	s.AttachAccountRoutes(routers)
	s.AttachCharacterRoutes(routers)
	s.router.Run(addr...)
}
