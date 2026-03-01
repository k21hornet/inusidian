import { Card, CardField } from "../card/types";

export type Deck = {
  id: number;
  deckName: string;
  deckDescription: string;
  createdAt: string;
  cards: Card[];
  cardFields: CardField[];
  cardCount?: number;
  dueCardCount?: number;
};

export type PostDeckFormData = {
  deckId?: number;
  deckName: string;
  deckDescription: string;
  cardFields: {
    fieldName: string;
    fieldType: string;
  }[];
};

export type IODeckData = {
  deckInfo: {
    deckName: string;
    deckDescription: string;
    createdAt: string;
    updatedAt: string;
    cardFields: {
      fieldName: string;
      fieldType: string;
    }[];
  };
  cards: {
    successCount: number;
    reviewInterval: number;
    nextReviewDate: string;
    cardCreatedAt: string;
    cardUpdatedAt: string;
    fieldValues: {
      fieldName: string;
      content: string;
    }[];
    cardLogs: {
      answerTime: number;
      nextReviewInterval: number;
      createdAt: string;
    }[];
  }[];
};
