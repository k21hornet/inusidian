export type User = {
  id: number;
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
};

export type CardField = {
  id: number;
  fieldName: string;
  fieldType: string;
  deck: Deck;
};

export type Card = {
  id: number;
  deck: Deck;
  cardValues: CardValue[];
  successCount: number;
  nextReviewDate: string;
  createdAt: string;
};

export type CardValue = {
  id: number;
  card: Card;
  fieldName: string;
  content: string;
};
