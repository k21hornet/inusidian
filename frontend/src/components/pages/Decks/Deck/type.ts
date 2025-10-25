import { CardInfo } from "@/components/common/Card/CardList/type";

export type DeckPageProps = {
  deck: Deck;
};

export type Deck = {
  id: number;
  deckName: string;
  deckDescription: string;
  cards: CardInfo[];
  cardFields: CardFieldInfo[];
};

export type CardFieldInfo = {
  id: number;
  fieldName: string;
  fieldType: string;
};
