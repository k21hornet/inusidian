import DeckSettingsPage from "@/app/(authorized)/decks/[deckId]/settings/_components";
import { getDeck } from "@/features/deck/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function DeckSettings({ params }: Params) {
  const { deckId } = await params;
  const deckResponse = await getDeck(deckId);

  if (deckResponse.error) return;

  return <DeckSettingsPage deck={deckResponse.body} />;
}
