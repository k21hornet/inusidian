import ReviewPage from "@/app/(main)/decks/[deckId]/review/_components";
import { getReviewCards } from "@/lib/api/review";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Review({ params }: Params) {
  const { deckId } = await params;
  const data = await getReviewCards(deckId);

  return <ReviewPage data={data} />;
}
