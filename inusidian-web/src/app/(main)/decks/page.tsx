import { DeckTable } from "@/components/parts/DeckTable";
import { getAllDecks } from "@/lib/api/deck";

export default async function Decks() {
  const { decks } = await getAllDecks();

  <div className="mb-6">
    <DeckTable decks={decks} />
  </div>;
}
