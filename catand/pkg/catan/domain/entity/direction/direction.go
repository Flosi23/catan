package direction

import "catand/pkg/catan/domain/entity/vector"

type Direction uint8

const (
	Left Direction = iota
	TopLeft
	TopRight
	Right
	BottomRight
	BottomLeft
)

// All returns all possible directions in Axial Space
func All() []Direction {
	return []Direction{
		Left,
		TopLeft,
		TopRight,
		Right,
		BottomRight,
		BottomLeft,
	}
}

// Vector returns the corresponding vector in Axial Space
// # Example
// for the Direction Left
func (d Direction) Vector() vector.Vector {
	switch d {
	case Left:
		return vector.New(-1, 0)
	case TopLeft:
		return vector.New(0, -1)
	case TopRight:
		return vector.New(1, -1)
	case Right:
		return vector.New(+1, 0)
	case BottomRight:
		return vector.New(0, +1)
	case BottomLeft:
		return vector.New(-1, +1)
	default:
		panic("invalid direction")
	}
}
