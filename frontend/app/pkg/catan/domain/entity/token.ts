export enum Token {
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
  Six = "six",
  Eight = "eight",
  Nine = "nine",
  Ten = "ten",
  Eleven = "eleven",
  Twelve = "twelve",
}

const TOKEN_PIPS_MAP: Record<Token, number> = {
  [Token.Two]: 1,
  [Token.Three]: 2,
  [Token.Four]: 3,
  [Token.Five]: 4,
  [Token.Six]: 5,
  [Token.Eight]: 5,
  [Token.Nine]: 4,
  [Token.Ten]: 3,
  [Token.Eleven]: 2,
  [Token.Twelve]: 1,
};

function pips(token: Token): number {
  return TOKEN_PIPS_MAP[token];
}

export const token = {
  pips,
};
