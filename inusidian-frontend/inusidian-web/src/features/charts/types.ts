export type LearningHistoryEntry = {
  date: string;
  newCards: number;
  reviewedCards: number;
};

export type CardSuccessDistributionEntry = {
  successCount: number;
  cardsCount: number;
};

export type StudiedDaysResponse = {
  studiedDays: number[];
};
