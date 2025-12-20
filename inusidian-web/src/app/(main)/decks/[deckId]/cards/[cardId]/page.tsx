import { CardPage } from "@/app/(main)/decks/[deckId]/cards/[cardId]/_components";
import { getCard, getNextCardId, getPrevCardId } from "@/lib/api/card";

type Params = {
  params: Promise<{ cardId: number }>;
};

export default async function Card({ params }: Params) {
  const { cardId } = await params;
  const card = await getCard(cardId);
  if (!card) return;

  const nextCardId = await getNextCardId(card.deckId, cardId);
  const prevCardId = await getPrevCardId(card.deckId, cardId);

  return (
    <CardPage card={card} nextCardId={nextCardId} prevCardId={prevCardId} />
  );
}
