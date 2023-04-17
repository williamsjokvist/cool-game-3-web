FROM golang:1.20-alpine

WORKDIR /cg3-web-server

RUN GOBIN=/usr/local/bin/ go install github.com/josephspurrier/goversioninfo/cmd/goversioninfo@latest

COPY . ./

RUN go mod download

RUN /usr/local/bin/goversioninfo dist/versioninfo.json
RUN env GOOS=windows GOARCH=amd64 go build -o dist/cg3-site-server.exe
RUN env GOOS=linux GOARCH=amd64 go build -o dist/cg3-site-server

