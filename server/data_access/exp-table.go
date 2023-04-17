package data

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

type Exp struct {
	Level int `json:"level"`
	Exp   int `json:"exp"`
}

type ExpTable struct {
	Levels []Exp `json:"levels"`
}

var expTable map[int]int

func InitializeExpTable() {
	expTable = make(map[int]int)
	file, err := ioutil.ReadFile("./db/exp-table.json")
	if err != nil {
		log.Fatal(err)
		return
	}

	var expTableJson ExpTable
	err = json.Unmarshal(file, &expTableJson)
	if err != nil {
		log.Fatal(err)
		return
	}

	for _, expObj := range expTableJson.Levels {
		fmt.Println(expObj)
		expTable[expObj.Level] = expObj.Exp
	}
}

func GetExpRequiredByLevel(level int) int {
	return expTable[level]
}
