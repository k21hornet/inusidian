import { getDeck } from "@/app/actions/deck";
import DeckPage from "@/components/pages/deck";

type Params = {
  params: Promise<{ id: number }>;
};

export default async function Deck({ params }: Params) {
  const { id } = await params;
  const deck = await getDeck(id);

  if (!deck) return;

  return <DeckPage deck={deck} />;
}
