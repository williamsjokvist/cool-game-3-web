package routers

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/GreenSoap/cool-game-3-web/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (s *Server) AttachAccountRoutes(routerGroup *gin.RouterGroup) {
	accountGroup := routerGroup.Group("/account")
	accountGroup.POST("/", s.createAccount)
}

type AccountCreationBody struct {
	Name            string `json:"name"`
	Password        string `json:"password"`
	Email           string `json:"email"`
	Birthday        string `json:"birthday"`
	DiscordUsername string `json:"discordUsername"`
}

// Hash password using the bcrypt hashing algorithm
func hashPassword(password string) (string, error) {
	var passwordBytes = []byte(password)
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword(passwordBytes, bcrypt.MinCost)
	return string(hashedPasswordBytes), err
}

func (s *Server) createAccount(ctx *gin.Context) {
	var reqBody AccountCreationBody
	err := ctx.BindJSON(&reqBody)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, "Error parsing account")
		return
	}

	hashedPassword, err := hashPassword(reqBody.Password)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error hashing password")
		return
	}

	var account models.Account = models.Account{
		Name:                  reqBody.Name,
		HashedPassword:        hashedPassword,
		Email:                 sql.NullString{String: reqBody.Email, Valid: true},
		Birthday:              reqBody.Birthday,
		DiscordUsername:       sql.NullString{String: reqBody.DiscordUsername, Valid: true},
		GM:                    0,
		WebAdmin:              false,
		Banned:                false,
		TOS:                   true,
		MaxCharacters:         3,
		WhiteListed:           0,
		PurchasedPetWithMesos: 0,
		Beta:                  0,
		VoteStreak:            0,
		HighestVoteStreak:     0,
		Mute:                  false,
		Guest:                 false,
		IP:                    ctx.ClientIP(),
		LastKnownIP:           ctx.ClientIP(),
		LoggedIn:              0,
	}

	_, err = s.db.NamedExec(`
		INSERT INTO accounts 
		(
			name, 
			hashedPassword, 
			email, 
			gm,
			webadmin,
			tos,
			birthday,
			discordUsername,
			ip,
			lastknownip,
			loggedin,
			maxCharacters,
			whitelisted, 
			purchasedPetWithMesos,
			beta,
			voteStreak,
			highestVoteStreak,
			mute,
			guest
		) 
		VALUES (
			:name, 
			:hashedPassword, 
			:email, 
			:gm, 
			:webadmin, 
			:tos, 
			:birthday, 
			:discordUsername,
			:ip,
			:lastknownip,
			:loggedin,
			:maxCharacters,
			:whitelisted,
			:purchasedPetWithMesos,
			:beta,
			:voteStreak,
			:highestVoteStreak,
			:mute,
			:guest
		)`, account)

	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "Error creating account")
		return
	}

	ctx.JSON(http.StatusOK, account)
}
