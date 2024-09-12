package tile

import (
	"catand/pkg/catan/domain/entity/token"
	"catand/pkg/catan/domain/entity/vector"
)

type Type uint8

const (
	Empty Type = iota
	Land
	Water
)

type Resource uint8

const (
	Brick Resource = iota
	Wood
	Wheat
	Ore
	Sheep
	Gold
)

type Tile struct {
	Type Type
	Pos  vector.Vector
}

// New creates a new tile with the given type and position
func New(t Type, p vector.Vector) Tile {
	return Tile{Type: t, Pos: p}
}

type ResourceTile struct {
	Tile
	Resource Resource
	Token    token.Token
}

// NewResource creates a new resource tile which will always be of type "Land"
func NewResource(r Resource, t token.Token, p vector.Vector) ResourceTile {
	return ResourceTile{Tile: New(Land, p), Resource: r, Token: t}
}
