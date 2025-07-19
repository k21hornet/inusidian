import { Card } from "./Card";
import { CardField } from "./CardField";

export type Deck = {
  id: number;
  deckName: string;
  deckDescription: string;
  createdAt: string;
  cards: Card[];
  cardFields: CardField[];
};
