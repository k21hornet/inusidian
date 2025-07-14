import { Card } from "./Card";

export type Deck = {
  id: number;
  deckName: string;
  deckDescription: string;
  createdAt: string;
  cards: Card[];
};
