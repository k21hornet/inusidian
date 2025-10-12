import ReviewPage from "@/components/pages/decksTmp/Deck/Review";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Review({ params }: Params) {
  const { deckId } = await params;

  return <ReviewPage deckId={deckId} />;
}
