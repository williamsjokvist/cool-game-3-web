package main

import (
	data "github.com/GreenSoap/cool-game-3-web/data_access"
	"github.com/GreenSoap/cool-game-3-web/routers"
	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)

	data.InitializeMapData()
	data.InitializeJobs()
	data.InitializeExpTable()
	server := routers.CreateServer()
	server.Run()
}
