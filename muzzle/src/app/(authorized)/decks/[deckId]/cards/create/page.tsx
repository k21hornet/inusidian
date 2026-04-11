import CreateCardPage from "@/app/(authorized)/decks/[deckId]/cards/create/_components";
import { getDeck } from "@/features/deck/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function CreateCard({ params }: Params) {
  const { deckId } = await params;
  const deckResponse = await getDeck(deckId);

  if (deckResponse.error) return;

  return <CreateCardPage deck={deckResponse.body} />;
}
