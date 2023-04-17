package routers

import (
	"fmt"
	"net/http"

	data "github.com/GreenSoap/cool-game-3-web/data_access"
	"github.com/GreenSoap/cool-game-3-web/models"
	"github.com/gin-gonic/gin"
)

func (s *Server) AttachCharacterRoutes(routerGroup *gin.RouterGroup) {
	charactersGroup := routerGroup.Group("/characters")

	charactersGroup.GET("/", s.getCharacters)
	charactersGroup.GET("/online", s.getOnlineCharacters)
}

func (s *Server) getOnlineCharacters(ctx *gin.Context) {
	ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	ctx.Writer.Header().Set("Access-Control-Allow-Methods", "GET")

	characters := []models.Character{}
	err := s.db.Select(&characters,
		`SELECT 
		name, 
		level, 
		exp, 
		str, 
		dex, 
		luk, 
		fame,
		loggedIn, 
		siteJobRank, 
		siteJobRank, 
		siteOddJobRank,
		rank, 
		rankMove, 
		jobRank, 
		hp, 
		mp, 
		characters.int, 
		map, 
		maxmp, 
		maxhp, 
		meso, 
		job, 
		totalPlayTime, 
		rank, 
		hair, 
		face, 
		skincolor, 
		gender, 
		createdate
	FROM characters WHERE loggedIn = 1 AND hideFromRankings = 0 ORDER BY totalPlayTime DESC`)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error fetching online characters")
		return
	}

	for i := 0; i < len(characters); i++ {
		mapInfo := data.GetMapInfo(characters[i].Map)
		characters[i].StreetName = mapInfo.StreetName
		characters[i].MapName = mapInfo.MapName
		characters[i].JobName = data.GetJobNameById(characters[i].Job)
		characters[i].ExpRequired = data.GetExpRequiredByLevel(characters[i].Level)
	}

	ctx.JSON(http.StatusOK, characters)
}

func (s *Server) getCharacters(ctx *gin.Context) {
	characters := []models.Character{}

	err := s.db.Select(&characters,
		`SELECT
		name, 
		level, 
		exp, 
		str, 
		dex, 
		luk, 
		fame,
		loggedIn, 
		siteJobRank, 
		siteJobRank, 
		siteOddJobRank,
		rank, 
		rankMove, 
		jobRank, 
		hp, 
		mp, 
		characters.int, 
		map, 
		maxmp, 
		maxhp, 
		meso, 
		job, 
		totalPlayTime, 
		rank, 
		hair, 
		face, 
		skincolor, 
		gender, 
		createdate
	FROM characters WHERE hideFromRankings = 0 ORDER BY rank ASC`)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error fetching characters")
		return
	}

	for i := 0; i < len(characters); i++ {
		mapInfo := data.GetMapInfo(characters[i].Map)
		characters[i].StreetName = mapInfo.StreetName
		characters[i].MapName = mapInfo.MapName
		characters[i].JobName = data.GetJobNameById(characters[i].Job)
		characters[i].ExpRequired = data.GetExpRequiredByLevel(characters[i].Level)
	}

	ctx.JSON(http.StatusOK, characters)
}
