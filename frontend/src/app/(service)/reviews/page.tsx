import { ReviewsPage } from "@/components/pages/reviewsTmp";
import { getAllDecks } from "@/features/deck";

export default async function Reviews() {
  const decks = await getAllDecks();

  return <ReviewsPage decks={decks} />;
}
