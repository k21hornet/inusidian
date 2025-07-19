import { CardValue } from "./CardValue";
import { Deck } from "./Deck";

export type Card = {
  id: number;
  deck: Deck;
  cardValues: CardValue[];
  successCount: number;
  nextReviewDate: string;
  createdAt: string;
};
