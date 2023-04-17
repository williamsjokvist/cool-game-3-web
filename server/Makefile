# Build dependencies:
# goversioninfo

build_dependencies: 
	go install github.com/josephspurrier/goversioninfo/cmd/goversioninfo@latest

windows:
	goversioninfo build/versioninfo.json
	env GOOS=windows GOARCH=amd64 go build -o build/cg3-site-server.exe

linux:
	env GOOS=linux GOARCH=amd64 go build -o build/cg3-site-server