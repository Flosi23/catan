package handler

import (
	"context"

	"catand/pkg/catan/presentation/http/api/catand"
)

type PublicHandler struct {
}

var _ catand.StrictServerInterface = &PublicHandler{}

func NewPublicHandler() *PublicHandler {
	return &PublicHandler{}
}

func (p PublicHandler) DoTest(_ context.Context, _ catand.DoTestRequestObject) (catand.DoTestResponseObject, error) {
	return catand.DoTest200JSONResponse{
		Test: "test",
	}, nil
}
