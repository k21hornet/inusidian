import { ComingSoonCard } from "@/components/ui/coming-soon-card";
import { DeckTable } from "@/features/deck/components/DeckTable";
import { Deck } from "@/features/deck/types";

const COMING_SOON_CARDS = [
  { src: "/sample1.png", alt: "report 1" },
  { src: "/sample2.png", alt: "report 2" },
  { src: "/sample3.png", alt: "report 3" },
] as const;

type Props = {
  decks: Deck[];
};

export default function HomePage({ decks }: Props) {
  return (
    <div className="mb-5">
      <DeckTable decks={decks} />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
        {COMING_SOON_CARDS.map((card, index) => (
          <ComingSoonCard key={index} imageSrc={card.src} imageAlt={card.alt} />
        ))}
      </div>
    </div>
  );
}
