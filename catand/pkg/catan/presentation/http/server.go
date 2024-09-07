package http

import (
	"context"
	"net"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/pkg/errors"

	"catand/pkg/catan/presentation/http/api/catand"
	"catand/pkg/catan/presentation/http/errorhandling"
	"catand/pkg/catan/presentation/http/handler"
	customMiddleware "catand/pkg/catan/presentation/http/middleware"
)

type Server struct {
	addr          string
	publicHandler *handler.PublicHandler
	server        http.Server
}

func New(
	publicHandler *handler.PublicHandler,
	addr string,
) *Server {
	return &Server{
		addr:          addr,
		publicHandler: publicHandler,
	}
}

func (s *Server) Serve(l net.Listener) error {
	publicValidator, err := customMiddleware.PublicValidator()
	if err != nil {
		return err
	}

	r := chi.NewRouter()
	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		errorhandling.SendError(r.Context(), w, http.StatusNotFound, errorhandling.ErrResourceNotFound)
	})
	r.MethodNotAllowed(func(w http.ResponseWriter, r *http.Request) {
		errorhandling.SendError(r.Context(), w, http.StatusMethodNotAllowed, errorhandling.ErrMethodNotAllowed)
	})
	badRequestErrorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		errorhandling.SendError(r.Context(), w, http.StatusBadRequest, err)
	}
	internalServerErrorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		errorhandling.SendError(r.Context(), w, http.StatusInternalServerError, err)
	}

	r.Use(middleware.RequestID)
	r.Use(customMiddleware.RequestInContext)
	r.Use(middleware.RealIP)

	r.Group(func(r chi.Router) {
		r.Use(publicValidator)
		strictHandler := catand.NewStrictHandlerWithOptions(s.publicHandler, nil, catand.StrictHTTPServerOptions{
			RequestErrorHandlerFunc:  badRequestErrorHandler,
			ResponseErrorHandlerFunc: internalServerErrorHandler,
		})
		catand.HandlerWithOptions(strictHandler, catand.ChiServerOptions{
			BaseRouter:       r,
			ErrorHandlerFunc: badRequestErrorHandler,
		})
	})

	s.server = http.Server{Handler: r, ReadHeaderTimeout: 10 * time.Second}

	return s.server.Serve(l)
}

func (s *Server) Start() error {
	l, err := net.Listen("tcp", s.addr)
	if err != nil {
		return err
	}

	err = s.Serve(l)
	if errors.Is(err, http.ErrServerClosed) {
		return nil
	}

	return err
}

func (s *Server) Stop() error {
	return s.server.Shutdown(context.Background())
}
