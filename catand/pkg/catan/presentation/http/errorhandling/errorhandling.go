package errorhandling

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/pkg/errors"

	"catand/pkg/catan/presentation/http/api/catand"
)

var ErrResourceNotFound = errors.New("resource not found")
var ErrMethodNotAllowed = errors.New("method not allowed")

func SendError(ctx context.Context, w http.ResponseWriter, statusCode int, err error) {
	errorCode := toErrorCode(statusCode, err)

	if errorCode == catand.TECHNICALERROR && !errors.Is(err, context.DeadlineExceeded) &&
		!errors.Is(err, context.Canceled) {
		slog.ErrorContext(
			ctx,
			"internal server error in HTTP request",
			"status",
			statusCode,
			"errorCode",
			errorCode,
			"error",
			err,
		)
	} else {
		slog.DebugContext(ctx, "error in HTTP request", "status", statusCode, "errorCode", errorCode, "error", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	err = json.NewEncoder(w).Encode(catand.Error{
		Code:   errorCode,
		Params: &[]string{err.Error()},
	})
	if err != nil {
		slog.ErrorContext(ctx, "failed to send error response", "error", err)
	}
}

func toErrorCode(statusCode int, err error) catand.ErrorCode {
	if errors.Is(err, ErrResourceNotFound) {
		return catand.VALIDATIONERROR
	}

	if statusCode == http.StatusBadRequest {
		return catand.VALIDATIONERROR
	}

	return catand.TECHNICALERROR
}
