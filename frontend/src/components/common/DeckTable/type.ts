export type DeckTableProps = {
  decks: DeckInfo[];
};

export type DeckInfo = {
  id: number;
  deckName: string;
  deckDescription: string;
  cardCount: number;
  dueCardCount: number;
  createdAt: string;
};
