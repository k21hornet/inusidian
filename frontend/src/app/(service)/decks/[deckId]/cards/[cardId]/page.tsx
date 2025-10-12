import { CardPage } from "@/components/pages/decksTmp/Deck/Cards";
import { getCard } from "@/features/card";

type Params = {
  params: Promise<{ cardId: number }>;
};

export default async function Card({ params }: Params) {
  const { cardId } = await params;
  const card = await getCard(cardId);

  if (!card) return;

  return <CardPage card={card} />;
}
