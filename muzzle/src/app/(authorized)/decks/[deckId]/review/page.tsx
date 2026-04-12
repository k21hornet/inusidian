import ReviewPage from "@/app/(authorized)/decks/[deckId]/review/_components";
import { getReviewCards } from "@/features/review/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Review({ params }: Params) {
  const { deckId } = await params;
  const response = await getReviewCards(deckId);

  if (response.error) return;

  return <ReviewPage data={response.body} />;
}
