import { ReviewsPage } from "@/components/pages/reviews";
import { getAllDecks } from "@/features/deck";

export default async function Reviews() {
  const decks = await getAllDecks();

  return <ReviewsPage decks={decks} />;
}
