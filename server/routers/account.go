package routers

import (
	"fmt"
	"net/http"

	"github.com/GreenSoap/cool-game-3-web/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) AttachAccountRoutes(routerGroup *gin.RouterGroup) {
	accountGroup := routerGroup.Group("/accounts")
	accountGroup.GET("/", s.getAccounts)
}

func (s *Server) getAccounts(ctx *gin.Context) {
	accounts := []models.Account{}

	err := s.db.Select(&accounts, "SELECT * FROM accounts")

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error fetching accounts")
		return
	}

	ctx.JSON(http.StatusOK, accounts)
}
