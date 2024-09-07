package main

import (
	"log/slog"

	"github.com/lmittmann/tint"
	"github.com/mattn/go-isatty"
	"github.com/pkg/errors"

	"catand/pkg/catan/presentation/http"
	"catand/pkg/catan/presentation/http/handler"

	// the port pprof is using is not exposed outside the container (gosec,G108)
	//nolint:gosec
	_ "net/http/pprof"
	"os"
)

func main() {
	initLogger(slog.LevelDebug)
	slog.Info("starting catand...")

	if err := start(); err != nil {
		slog.Error("failed to start catand", "error", err)
		os.Exit(1)
	}

	slog.Info("catand started successfully")
}

//nolint:funlen
func start() error {
	cfg, err := readConfig()
	if err != nil {
		return errors.WithMessage(err, "failed to read config")
	}

	var logLevel slog.Level
	if err = logLevel.UnmarshalText([]byte(cfg.Logging.Level)); err != nil {
		return errors.WithMessage(err, "failed to parse log level")
	}
	initLogger(logLevel)

	publicHandler := handler.NewPublicHandler()

	// initialize & start http server
	httpServer := http.New(
		publicHandler,
		cfg.HTTP.Addr,
	)

	return httpServer.Start()
}

func initLogger(level slog.Level) {
	logFile := os.Stdout
	stdoutHandler := tint.NewHandler(logFile, &tint.Options{
		AddSource: true,
		Level:     level,
		NoColor:   !isatty.IsTerminal(logFile.Fd()),
	})
	logger := slog.New(stdoutHandler)
	slog.SetDefault(logger)
}
