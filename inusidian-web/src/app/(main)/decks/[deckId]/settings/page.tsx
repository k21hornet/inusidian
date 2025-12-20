import DeckSettingsPage from "@/app/(main)/decks/[deckId]/settings/_components";
import { getDeck } from "@/lib/api/deck";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function DeckSettings({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return <DeckSettingsPage deck={deck} />;
}
