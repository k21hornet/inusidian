import CreateCardPage from "@/components/pages/decksTmp/Deck/Cards/CreateCard";
import { getDeck } from "@/features/deck";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function CreateCard({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return <CreateCardPage deck={deck} />;
}
