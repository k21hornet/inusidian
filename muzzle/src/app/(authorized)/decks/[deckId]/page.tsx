import { BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardList from "@/features/card/components/CardList";
import Link from "next/link";
import { getDeck } from "@/features/deck/api";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Deck({ params }: Params) {
  const { deckId } = await params;
  const deckResponse = await getDeck(deckId);

  if (deckResponse.error) return;

  const deck = deckResponse.body;

  return (
    <>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold">{deck.deckName}</h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-[#00e5ff] to-[#2962ff]">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <p>{deck.deckDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-[#9E9E9E]" />
            <p>{deck.cards.length}枚のカードを作成済み</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="w-full md:w-auto">
          <Button
            component={Link}
            href={`/decks/${deck.id}/review`}
            variant="contained"
            buttonDesign="secondary"
            className="w-full md:w-auto"
          >
            復習する
          </Button>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button
            component={Link}
            href={`/decks/${deck.id}/cards/create`}
            variant="outlined"
            buttonDesign="secondary"
            className="w-full md:w-auto"
          >
            カード作成
          </Button>
          <Button
            component={Link}
            href={`/decks/${deck.id}/settings`}
            variant="outlined"
            buttonDesign="secondary"
            className="w-full md:w-auto"
          >
            デッキ設定
          </Button>
        </div>
      </div>

      <CardList deck={deckResponse.body} />
    </>
  );
}
