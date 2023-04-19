package data

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

type Job struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type JobList struct {
	Jobs []Job `json:"jobs"`
}

var jobMap map[int]string

func initializeJobs() {
	jobMap = make(map[int]string)
	file, err := ioutil.ReadFile("./db/jobs.json")
	if err != nil {
		log.Fatal(err)
		return
	}

	var jobList JobList
	err = json.Unmarshal(file, &jobList)
	if err != nil {
		log.Fatal(err)
		return
	}

	for _, job := range jobList.Jobs {
		jobId, err := strconv.Atoi(job.Id)
		if err != nil {
			log.Fatal(err)
			return
		}

		jobMap[jobId] = job.Name
		fmt.Println(jobId, " - ", job.Name)
	}
}

func GetJobNameById(id int) string {
	return jobMap[id]
}
