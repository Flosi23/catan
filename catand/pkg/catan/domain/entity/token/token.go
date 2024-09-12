package token

type Token uint8

const (
	Two Token = iota
	Three
	Four
	Five
	Six
	Eight
	Nine
	Ten
	Eleven
	Twelve
)

// Pips returns the "pips" of the token. Pips is the probability of the token value being rolled
// using two dice.
// # Example
// The token with value 6 has 5 pips, because there are 5 ways to roll a 6 with two dice
func (t Token) Pips() uint8 {
	switch t {
	case Two:
		return 1
	case Three:
		return 2
	case Four:
		return 3
	case Five:
		return 4
	case Six:
		return 5
	case Eight:
		return 5
	case Nine:
		return 4
	case Ten:
		return 3
	case Eleven:
		return 2
	case Twelve:
		return 1
	default:
		panic("invalid token")
	}
}
