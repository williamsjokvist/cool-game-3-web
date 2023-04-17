package data

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

type xmlMap struct {
	XMLName     xml.Name       `xml:"imgdir"`
	Name        string         `xml:"name,attr"`
	Directories []xmlDirectory `xml:"imgdir"`
}

type xmlDirectory struct {
	Name        string         `xml:"name,attr"`
	Strings     []xmlString    `xml:"string"`
	Directories []xmlDirectory `xml:"imgdir"`
}

type xmlString struct {
	Name  string `xml:"name,attr"`
	Value string `xml:"value,attr"`
}

type MapInfo struct {
	StreetName string
	MapName    string
}

var mapInfoMap map[int]MapInfo

func InitializeMapData() {

	mapInfoMap = make(map[int]MapInfo)

	// read the Map.img.xml file
	mapData, err := ioutil.ReadFile("./db/Map.img.xml")
	if err != nil {
		log.Fatal(err)
		return
	}

	// Parse the map data using encoding/xml
	var mapDataXML xmlMap
	err = xml.Unmarshal(mapData, &mapDataXML)

	// Loop through map types "maple, event" etc.

	fmt.Println("Initializing Map Data")
	for _, imgDir := range mapDataXML.Directories {

		// Loop through maps
		for _, childImgDir := range imgDir.Directories {
			mapId, err := strconv.Atoi(childImgDir.Name)

			if err != nil {
				fmt.Println("Error getting the map ID")
			}

			// Loop through the strings in the map and save the streetName and mapName
			var streetName string = ""
			var mapName string = ""

			for _, str := range childImgDir.Strings {
				switch str.Name {
				case "streetName":
					streetName = str.Value
					break
				case "mapName":
					mapName = str.Value
					break
				}
			}

			// Store the map data in a map
			mapInfoMap[mapId] = MapInfo{
				streetName,
				mapName,
			}

			fmt.Println(mapInfoMap[mapId].StreetName, " - ", mapInfoMap[mapId].MapName)
		}
	}
}

func GetMapInfo(mapId int) MapInfo {
	return mapInfoMap[mapId]
}
