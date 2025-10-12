export type User = {
  id: string;
  username: string;
  email: string;
};

export type Deck = {
  id: number;
  deckName: string;
  deckDescription: string;
  createdAt: string;
  cards: Card[];
  cardFields: CardField[];
  cardCount?: number;
};

export type CardField = {
  id: number;
  fieldName: string;
  fieldType: string;
  deck: Deck;
};

export type Card = {
  id: number;
  deckId?: number;
  deck: Deck;
  cardValues: CardValue[];
  successCount: number;
  reviewInterval: number;
  nextReviewDate: string;
  createdAt: string;
};

export type CardValue = {
  id: number;
  card: Card;
  field: CardField;
  content: string;
};
