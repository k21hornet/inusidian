import { CardPage } from "@/app/(authorized)/decks/[deckId]/cards/[cardId]/_components";
import { getCard, getNextCardId, getPrevCardId } from "@/features/card/api";

type Params = {
  params: Promise<{ cardId: number }>;
};

export default async function Card({ params }: Params) {
  const { cardId } = await params;

  const cardResponse = await getCard(cardId);
  if (cardResponse.error) return;
  const card = cardResponse.body;

  const [nextCardResponse, prevCardResponse] = await Promise.all([
    getNextCardId(card.deckId, cardId),
    getPrevCardId(card.deckId, cardId),
  ]);
  const nextCardId = nextCardResponse.body;
  const prevCardId = prevCardResponse.body;

  return (
    <CardPage card={card} nextCardId={nextCardId} prevCardId={prevCardId} />
  );
}
