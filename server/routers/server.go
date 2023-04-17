package routers

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/BurntSushi/toml"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Server struct {
	db     *sqlx.DB
	router *gin.Engine
}

type configData struct {
	MysqlUrl string `toml:"mysql_url"`
	Port     int    `toml:"port"`
}

var Config configData

func initializeConfig() {
	configFile, err := ioutil.ReadFile("./config.toml")
	if err != nil {
		log.Fatal(err)
		return
	}

	if _, err := toml.Decode(string(configFile), &Config); err != nil {
		log.Fatal(err)
	}
}

func connectToDatabase(url string) (*sqlx.DB, error) {
	connStr := url

	if connStr == "" {
		return nil, errors.New("mysql_url is missing from the config file")
	}

	db, err := sqlx.Open("mysql", connStr)

	return db, err
}

func CreateServer() *Server {
	initializeConfig()
	db, err := connectToDatabase(Config.MysqlUrl)

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

func (s *Server) getNotice(ctx *gin.Context) {
	noticeFile, err := ioutil.ReadFile("./db/notice.txt")
	if err != nil {
		ctx.JSON(http.StatusOK, "")
		return
	}

	ctx.JSON(http.StatusOK, string(noticeFile))
}

func (s *Server) helloWorld(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, "Cool Game 3 Web API")
}

func (s *Server) Run() {
	routers := s.router.Group("/")

	routers.GET("/", s.helloWorld)
	routers.GET("/notice", s.getNotice)
	s.AttachAccountRoutes(routers)
	s.AttachCharacterRoutes(routers)

	if Config.Port == 0 {
		log.Fatal("port is missing from the config file")
		return
	}

	port := fmt.Sprintf(":%v", Config.Port)
	fmt.Println("Server starting on port " + port + "...")

	err := s.router.Run(port)
	if err != nil {
		log.Fatal(err)
	}
}
