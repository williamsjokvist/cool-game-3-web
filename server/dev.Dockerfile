FROM golang:1.20-alpine

WORKDIR /cg3-web-server

RUN go install github.com/cosmtrek/air@latest

COPY . ./

RUN go mod download

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]