import { Label } from "@components/ui/label";
import { Counter } from "@components/ui/counter";

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

const TOKEN_DISPLAY_NAME: Record<Token, string> = {
  [Token.Two]: "Two",
  [Token.Three]: "Three",
  [Token.Four]: "Four",
  [Token.Five]: "Five",
  [Token.Six]: "Six",
  [Token.Eight]: "Eight",
  [Token.Nine]: "Nine",
  [Token.Ten]: "Ten",
  [Token.Eleven]: "Eleven",
  [Token.Twelve]: "Twelve",
};

interface TileTypeCounterProps {
  token: Token;
  count: number;
  onChange: (token: Token, count: number) => void;
  max: number;
}

export const TokenCounter = ({ token, count, onChange, max }: TileTypeCounterProps) => {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-center">
      <Label>{TOKEN_DISPLAY_NAME[token]}: </Label>
      <Counter count={count} onChange={(c) => onChange(token, c)} max={max} min={0} />
    </div>
  );
};
