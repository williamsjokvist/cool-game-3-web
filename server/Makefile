# Build dependencies:
# goversioninfo

build_dependencies: 
	go install github.com/josephspurrier/goversioninfo/cmd/goversioninfo@latest

windows:
	~/go/bin/goversioninfo build/versioninfo.json
	env GOOS=windows GOARCH=amd64 go build -o dist/cg3-site-server.exe
	cp config.toml dist/
	cp -r db dist/

linux:
	env GOOS=linux GOARCH=amd64 go build -o dist/cg3-site-server