export type CardListProps = {
  id: number;
  primaryCardFieldName: string;
  cards: CardInfo[];
};

export type CardInfo = {
  id: number;
  primaryField: string;
  primaryValue: string;
  successCount: number;
  reviewInterval: number;
  nextReviewDate: string;
  createdAt: string;
};
