import { DecksPage } from "@/components/pages/Decks";
import { getAllDecks } from "@/lib/api/deck";

export default async function Decks() {
  const { decks } = await getAllDecks();

  return <DecksPage decks={decks} />;
}
