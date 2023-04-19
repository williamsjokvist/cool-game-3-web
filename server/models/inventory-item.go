package models

import "database/sql"

type InventoryItem struct {
	CharacterID    int           `db:"characterid"`
	Id             int           `db:"inventoryitemid"`
	CSStorageId    sql.NullInt16 `db:"csstorageid"`
	StorageId      sql.NullInt16 `db:"storageid"`
	ItemId         int           `db:"itemid"`
	PetId          int           `db:"petid"`
	Locked         int           `db:"locked"`
	InventoryTypeq int           `db:"inventorytype"`
	Position       int           `db:"position"`
	Quantity       int           `db:"quantity"`
	Owner          string        `db:"owner"`
	Expiration     int           `db:"expiration"`
	Sn             int           `db:"sn"`
	GiftFrom       string        `db:"giftfrom"`
	SealExpiration int           `db:"sealexpiration"`
}
