package middleware

import (
	"context"
	"net/http"

	"catand/pkg/catan/presentation/http/errorhandling"

	"github.com/pkg/errors"

	middleware "github.com/oapi-codegen/nethttp-middleware"

	"catand/pkg/catan/presentation/http/api/catand"
)

func PublicValidator() (func(next http.Handler) http.Handler, error) {
	spec, err := catand.GetSwagger()
	if err != nil {
		return nil, err
	}

	validator := middleware.OapiRequestValidatorWithOptions(spec, &middleware.Options{
		ErrorHandler: func(w http.ResponseWriter, message string, statusCode int) {
			// Context is not available here, so we pass an empty context
			errorhandling.SendError(context.TODO(), w, statusCode, errors.New(message))
		},
	})

	return validator, nil
}
