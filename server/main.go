package main

import "github.com/GreenSoap/cool-game-3-web/routers"

func main() {
	server := routers.CreateServer()
	server.Run()
}
