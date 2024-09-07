ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM public.ecr.aws/docker/library/golang:1.23 AS catand-dev

RUN apt update && apt install -y ca-certificates && apt clean

RUN go install github.com/air-verse/air@latest
RUN go install github.com/go-delve/delve/cmd/dlv@latest
RUN go install github.com/vektra/mockery/v2@v2.41.0
RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.60.3

WORKDIR /app
EXPOSE 8080

COPY /catand/go.mod /catand/go.sum ./
RUN go mod download

CMD air -c .air.toml

ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM public.ecr.aws/docker/library/golang:1.23 AS catand-build

RUN go install github.com/vektra/mockery/v2@v2.41.0

WORKDIR /app
COPY catand/go.mod /app/go.mod
COPY catand/go.sum /app/go.sum
RUN go mod download

COPY catand /app

RUN make generate
RUN go build catand/cmd/catand

ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM public.ecr.aws/docker/library/debian:bookworm AS catand

RUN apt update && apt install -y ca-certificates curl && apt clean

WORKDIR /app
COPY --from=catand-build /app/catand /app/catand

COPY .docker/catand/catand.yaml catand.yaml

ENTRYPOINT ["/app/catand"]

EXPOSE 8080
