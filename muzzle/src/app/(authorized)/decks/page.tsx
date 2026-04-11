import { getAllDecks } from "@/features/deck/api";
import { DeckTable } from "@/features/deck/components/DeckTable";

export default async function Decks() {
  const { decks } = await getAllDecks();

  return (
    <div className="mb-6">
      <DeckTable decks={decks} />
    </div>
  );
}
