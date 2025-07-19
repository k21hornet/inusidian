export type PostDeckFormData = {
  deckName: string;
  deckDescription: string;
  cardFields: {
    fieldName: string;
    fieldType: string;
  }[];
};

export type PostCardFormData = {
  deckId: number;
  values: {
    fieldId: number;
    content: string;
  }[];
};
