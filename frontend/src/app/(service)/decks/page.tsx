import { DecksPage } from "@/components/pages/Decks";
import { getAllDecks } from "@/features/deck";

export default async function Decks() {
  const response = await getAllDecks();

  return <DecksPage decks={response.decks} />;
}
