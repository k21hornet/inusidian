export type PostDeckFormData = {
  deckId?: number;
  deckName: string;
  deckDescription: string;
  cardFields: {
    fieldName: string;
    fieldType: string;
  }[];
};

export type PostCardFormData = {
  cardId?: number;
  deckId?: number;
  values: {
    cardFieldId: number;
    content: string;
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
      elapsedTime: number;
      nextReviewInterval: number;
      createdAt: string;
    }[];
  }[];
};
