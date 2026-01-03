import { DeckTable } from "@/components/parts/DeckTable";
import { getAllDecks } from "@/lib/api/deck";
import { ComingSoonCard } from "@/components/ui/coming-soon-card";

const COMING_SOON_CARDS = [
  { src: "/sample1.png", alt: "report 1" },
  { src: "/sample2.png", alt: "report 2" },
  { src: "/sample3.png", alt: "report 3" },
] as const;

export default async function Home() {
  const response = await getAllDecks();

  const decks = response.decks;
  const lastLogin = response.localDateTime;

  return (
    <div className="mb-5">
      <DeckTable decks={decks} />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
        {COMING_SOON_CARDS.map((card, index) => (
          <ComingSoonCard key={index} imageSrc={card.src} imageAlt={card.alt} />
        ))}
      </div>

      <div className="text-center text-sm text-[#888]">
        最終ログイン：{lastLogin}
      </div>
    </div>
  );
}
