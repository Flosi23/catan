package vector

import "catand/pkg/catan/domain/entity/direction"

// Vector represents a vector in hexagonal space using axial coordinates
// It's defined by the coordinates Q, R
type Vector struct {
	Q int8
	R int8
}

// New creates a new point with the given q and r coordinates
func New(q, r int8) Vector {
	return Vector{q, r}
}

// Add adds two vectors together
func (v Vector) Add(b Vector) Vector {
	return Vector{v.Q + b.Q, v.R + b.R}
}

// Equals returns true if the two vectors are equal
func (v Vector) Equals(b Vector) bool {
	return v.Q == b.Q && v.R == b.R
}

// Neighbour returns the Vector of the neighbour in the given direction
func (v Vector) Neighbour(d direction.Direction) Vector {
	return v.Add(d.Vector())
}

// Neighbours returns the Vectors of the neighbours in all directions
func (v Vector) Neighbours() []Vector {
	var neighbours []Vector
	for _, d := range direction.All() {
		neighbours = append(neighbours, v.Neighbour(d))
	}
	return neighbours
}
