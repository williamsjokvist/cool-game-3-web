package models

import "database/sql"

type Account struct {
	ID                      int            `db:"id"`
	Name                    string         `db:"name"`
	HashedPassword          string         `db:"hashedPassword"`
	LoggedIn                int            `db:"loggedin"`
	LastLogin               sql.NullString `db:"lastlogin"`
	RegisterDate            string         `db:"registerDate"`
	Birthday                string         `db:"birthday"`
	Banned                  bool           `db:"banned"`
	BanReason               string         `db:"banreason"`
	GM                      bool           `db:"gm"`
	Email                   string         `db:"email"`
	IP                      string         `db:"ip"`
	EmailCode               sql.NullString `db:"emailcode"`
	ForumAccId              int            `db:"forumaccid"`
	HWID                    string         `db:"hwid"`
	MACS                    string         `db:"macs"`
	LastKnownIP             string         `db:"lastknownip"`
	LastPWEmail             string         `db:"lastpwemail"`
	TempBan                 string         `db:"tempban"`
	GReason                 sql.NullString `db:"greason"`
	Gender                  int            `db:"gender"`
	Guest                   bool           `db:"guest"`
	LastLoginInMilliseconds int            `db:"LastLoginInMilliseconds"`
	WebAdmin                bool           `db:"webadmin"`
	IPCheck                 sql.NullString `db:"ipcheck"`
	MuteDate                string         `db:"muteDate"`
	Mute                    bool           `db:"mute"`
	SessionID               sql.NullString `db:"sessionid"`
	MaxCharacters           bool           `db:"maxCharacters"`
	PIN                     sql.NullInt16  `db:"pin"`
	TOS                     bool           `db:"tos"`
	PINTime                 sql.NullString `db:"pintime"`
	Code                    sql.NullString `db:"code"`
	VoteStreak              int            `db:"voteStreak"`
	HighestVoteStreak       int            `db:"highestVoteStreak"`
	Beta                    int            `db:"beta"`
	DiscordUsername         sql.NullString `db:"discordUsername"`
	WhiteListed             int            `db:"whitelisted"`
	PurchasedPetWithMesos   int            `db:"purchasedPetWithMesos"`
}
