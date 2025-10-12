import { ReviewsPage } from "@/components/pages/Reviews";
import { getAllDecks } from "@/features/deck";

export default async function Reviews() {
  const decks = await getAllDecks();

  return <ReviewsPage decks={decks} />;
}
