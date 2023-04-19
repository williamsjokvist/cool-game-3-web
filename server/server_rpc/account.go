package routers_rpc

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/GreenSoap/cool-game-3-web/models"
	pb "github.com/GreenSoap/cool-game-3-web/proto"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
	var passwordBytes = []byte(password)
	hashedPasswordBytes, err := bcrypt.GenerateFromPassword(passwordBytes, bcrypt.MinCost)
	return string(hashedPasswordBytes), err
}

func (s *Server) CreateAccount(ctx context.Context, in *pb.CreateAccountParams) (*pb.CreateAccountResponse, error) {
	hashedPassword, err := hashPassword(in.Password)

	isSuccess := true

	if err != nil {
		fmt.Println(err)
		isSuccess = false
	}

	var account models.Account = models.Account{
		Name:                  in.Name,
		HashedPassword:        hashedPassword,
		Email:                 sql.NullString{String: in.Email, Valid: true},
		Birthday:              in.Birthday,
		DiscordUsername:       sql.NullString{String: in.DiscordUsername, Valid: true},
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
		isSuccess = false
	}

	return &pb.CreateAccountResponse{
		Success: isSuccess,
		Message: "Account created successfully",
	}, nil
}
