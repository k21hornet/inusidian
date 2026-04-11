import CreateCardPage from "@/app/(authorized)/decks/[deckId]/cards/create/_components";
import { getDeck } from "@/features/deck/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function CreateCard({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return <CreateCardPage deck={deck} />;
}
