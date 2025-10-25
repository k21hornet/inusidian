import { DeckPage } from "@/components/pages/Decks/Deck";
import { getDeck } from "@/features/deck";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Deck({ params }: Params) {
  const { deckId } = await params;
  const response = await getDeck(deckId);

  if (!response) return;

  return <DeckPage deck={response} />;
}
