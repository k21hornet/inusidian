import { DecksPage } from "@/components/pages/decksTmp";
import { getAllDecks } from "@/features/deck";

export default async function Decks() {
  const decks = await getAllDecks();

  return <DecksPage decks={decks} />;
}
