import CreateCardPage from "@/app/(main)/decks/[deckId]/cards/create/_components";
import { getDeck } from "@/lib/api/deck";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function CreateCard({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return <CreateCardPage deck={deck} />;
}
