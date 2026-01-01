import { BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardList from "@/components/parts/Card/CardList";
import Link from "next/link";
import { getDeck } from "@/lib/api/deck";

type Params = {
  params: Promise<{ deckId: number }>;
};

export default async function Deck({ params }: Params) {
  const { deckId } = await params;
  const deck = await getDeck(deckId);

  if (!deck) return;

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">{deck.deckName}</h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center w-9 h-9 bg-linear-to-br from-[#00e5ff] to-[#2962ff] rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <p>{deck.deckDescription}</p>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-[#9E9E9E]" />
            <p>{deck.cards.length}枚のカードを作成済み</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
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

      <CardList deck={deck} />
    </>
  );
}
