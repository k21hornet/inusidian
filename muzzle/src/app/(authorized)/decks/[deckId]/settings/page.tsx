import DeckSettingsPage from "@/app/(authorized)/decks/[deckId]/settings/_components";
import { getDeck } from "@/features/deck/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function DeckSettings({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return <DeckSettingsPage deck={deck} />;
}
