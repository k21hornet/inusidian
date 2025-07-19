import { Card } from "./Card";
import { CardField } from "./CardField";

export type CardValue = {
  id: number;
  card: Card;
  field: CardField;
  content: string;
};
