package routers_rpc

import (
	"context"
	"fmt"

	data "github.com/GreenSoap/cool-game-3-web/data_access"
	"github.com/GreenSoap/cool-game-3-web/models"
	pb "github.com/GreenSoap/cool-game-3-web/proto"
)

func (s *Server) GetCharacters(ctx context.Context, in *pb.GetCharacterParams) (*pb.Characters, error) {
	onlyOnline := fmt.Sprintf("%d", func() int {
		if in.IsOnline {
			return 1
		} else {
			return 0
		}
	}())

	query := fmt.Sprintf(`
		SELECT 
			name, 
			level, 
			exp, 
			str, 
			dex, 
			luk, 
			fame,
			loggedIn, 
			siteOverallRank,
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
	FROM characters WHERE loggedIn = %v AND hideFromRankings = 0 ORDER BY rank ASC`, onlyOnline)

	characters := []models.Character{}
	err := s.db.Select(&characters, query)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	pbCharacters := []*pb.Character{}

	for i := 0; i < len(characters); i++ {
		dbChar := characters[i]
		mapInfo := data.GetMapInfo(dbChar.Map)

		pbChar := pb.Character{
			StreetName:    mapInfo.StreetName,
			MapName:       mapInfo.MapName,
			Name:          dbChar.Name,
			Islander:      dbChar.Islander,
			CreateDate:    dbChar.CreateDate,
			Level:         int32(dbChar.Level),
			Exp:           int32(dbChar.Exp),
			Str:           int32(dbChar.Str),
			Dex:           int32(dbChar.Dex),
			Int:           int32(dbChar.Int),
			Luk:           int32(dbChar.Luk),
			Fame:          int32(dbChar.Fame),
			LoggedIn:      int32(dbChar.LoggedIn),
			TotalPlayTime: int32(dbChar.TotalPlayTime),
			HP:            int32(dbChar.HP),
			MP:            int32(dbChar.MP),
			MaxHP:         int32(dbChar.MaxHP),
			MaxMP:         int32(dbChar.MaxMP),
			Meso:          int32(dbChar.Meso),
			Rank:          int32(dbChar.Rank),
			SkinColor:     int32(dbChar.SkinColor),
			Hair:          int32(dbChar.Hair),
			Face:          int32(dbChar.Face),
			ExpRequired:   int64(data.GetExpRequiredByLevel(dbChar.Level)),
			JobName:       data.GetJobNameById(dbChar.Job),
		}

		pbCharacters = append(pbCharacters, &pbChar)
	}

	return &pb.Characters{Characters: pbCharacters}, nil
}
