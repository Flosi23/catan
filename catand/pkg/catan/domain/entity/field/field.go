package field

import "catand/pkg/catan/domain/entity/tile"

type Field struct {
	Tiles []tile.Tile
}

// New creates a new field with the given tiles
func New(t []tile.Tile) Field {
	return Field{
		Tiles: t,
	}
}
