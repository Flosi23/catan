package field

import (
	"catand/pkg/catan/domain/entity/field"
	"catand/pkg/catan/domain/entity/tile"
	"catand/pkg/catan/domain/entity/vector"
	"fmt"
	"math"
)

type Service interface {
	// GenerateEmptyField generates an empty field
	GenerateEmptyField(width uint8, height uint8) (field.Field, error)
}

type Impl struct{}

var _ Service = Impl{}

// GenerateEmptyField generates an empty field with the given width and height
// The height is the number of rows in the field and the width the length of the longest row
func (i Impl) GenerateEmptyField(width uint8, height uint8) (field.Field, error) {
	if height%2 == 0 {
		return field.Field{}, fmt.Errorf("height must be odd")
	}

	tiles := make([]tile.Tile, 0)

	minQ := -int8(math.Floor(float64((height - 1) / 2)))
	maxQ := int8(math.Ceil(float64((height - 1) / 2)))

	minR := -int8(math.Floor(float64(width-1) / 2))
	maxR := int8(math.Ceil(float64(width-1) / 2))

	for q := minQ; q <= maxQ; q++ {
		for r := minR; r <= maxR; r++ {
			tiles = append(tiles, tile.New(tile.Empty, vector.New(q, r)))
		}
	}

	return field.New(tiles), nil
}
