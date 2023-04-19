package routers_rpc

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"

	"github.com/BurntSushi/toml"
	pb "github.com/GreenSoap/cool-game-3-web/proto"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"google.golang.org/grpc"
)

type Server struct {
	db *sqlx.DB
	pb.UnimplementedCoolGame3WebServer
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

func connectToDatabase() *sqlx.DB {
	connStr := Config.MysqlUrl
	if connStr == "" {
		log.Fatal("mysql_url is missing from the config file")
	}
	db, err := sqlx.Open("mysql", connStr)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	} else {
		fmt.Println("connected to database")
	}
	return db
}

func CreateServer() {
	initializeConfig()
	db := connectToDatabase()

	if Config.Port == 0 {
		log.Fatal("port is missing from the config file")
	}

	lis, _ := net.Listen("tcp", fmt.Sprintf(":%d", Config.Port))

	s := grpc.NewServer()
	pb.RegisterCoolGame3WebServer(s, &Server{db: db})

	log.Printf("server listening on %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
