package routers

import (
	"fmt"
	"net/http"

	"github.com/GreenSoap/cool-game-3-web/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) AttachCharacterRoutes(routerGroup *gin.RouterGroup) {
	charactersGroup := routerGroup.Group("/characters")

	charactersGroup.GET("/", s.getCharacters)
	charactersGroup.GET("/online", s.getOnlineCharacters)
}

// TODO - Filter out GM accounts
func (s *Server) getOnlineCharacters(ctx *gin.Context) {

	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET")

	characters := []models.Character{}
	err := s.db.Select(&characters, "SELECT * FROM characters WHERE loggedIn = 1 AND hideFromRankings = 0 ORDER BY rank DESC")

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error fetching online characters")
		return
	}

	ctx.JSON(http.StatusOK, characters)
}

func (s *Server) getCharacters(ctx *gin.Context) {
	characters := []models.Character{}

	err := s.db.Select(&characters, "SELECT * FROM characters WHERE hideFromRankings = 0 ORDER BY rank DESC")

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error fetching characters")
		return
	}

	ctx.JSON(http.StatusOK, characters)
}

func (s *Server) getCharactersByRank(ctx *gin.Context) {
	/*characters := []models.Character{}

	 orderBy, isOrderBy := ctx.GetQuery("orderBy")

	if isOrderBy {

	} else {
		err := s.db.Select(&characters, "SELECT * FROM characters ORDER BY rank DESC")

		if err != nil {
			fmt.Println(err)
			ctx.JSON(http.StatusInternalServerError, "Error fetching characters")
			return
		}

		ctx.JSON(http.StatusOK, characters)
	}*/
}
