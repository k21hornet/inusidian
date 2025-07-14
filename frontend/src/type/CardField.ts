import { Deck } from "./Deck";

export type CardField = {
  id: number;
  fieldName: string;
  fieldType: string;
  deck: Deck;
};
