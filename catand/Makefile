all:

generate:
	@go generate ./...
	@go run github.com/vektra/mockery/v2@v2.41.0

fmt:
	@gofmt -s -w .
	@go run golang.org/x/tools/cmd/goimports@latest -local catand -w .
	@go run github.com/segmentio/golines@latest -w -m 120 .

test:
	@go test -v -race ./...

build:
	@go build -o ./tmp catand/cmd/catand

lint:
	@golangci-lint run

fix:
	@golangci-lint run --fix
