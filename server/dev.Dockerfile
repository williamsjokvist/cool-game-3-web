FROM golang:1.20-alpine

WORKDIR /app

EXPOSE 8080

RUN go install github.com/cosmtrek/air@latest

COPY . ./

RUN go mod download

CMD ["air", "-c", ".air.toml"]