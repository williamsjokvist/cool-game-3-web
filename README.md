# cool-game-3-web

### Generating protobufs

`$ export PATH="$PATH:$(go env GOPATH)/bin"`
`$ protoc --go_out=. --go_opt=paths=source_relative \
  --go-grpc_out=. --go-grpc_opt=paths=source_relative cool-game-web.proto` 


### Deployment 

`npx vercel build && npx vercel deploy --prebuilt`