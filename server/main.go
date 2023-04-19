package main

import (
	data "github.com/GreenSoap/cool-game-3-web/data_access"
	grpc_server "github.com/GreenSoap/cool-game-3-web/server_rpc"
)

func main() {
	data.InitializeData()
	grpc_server.CreateServer()
	// gin.SetMode(gin.ReleaseMode)
	// http_server := http_server.CreateServer()
	// http_server.Run()
}
