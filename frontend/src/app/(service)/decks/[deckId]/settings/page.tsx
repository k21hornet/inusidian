import DeckSettingsPage from "@/components/pages/Decks/Deck/Settings";
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
