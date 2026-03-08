import { Calendar } from "@/features/charts/components/Calendar";
import { PieChart } from "@/features/charts/components/PieCharts";
import { Tooltips } from "@/features/charts/components/Tooltips";
import { DeckTable } from "@/features/deck/components/DeckTable";
import { Deck } from "@/features/deck/types";

type Props = {
  decks: Deck[];
};

export default function HomePage({ decks }: Props) {
  return (
    <div className="mb-5">
      <DeckTable decks={decks} />

      <div className="flex flex-col md:flex-row items-stretch w-full mb-6 gap-6">
        <div className="flex-1 min-w-0">
          <Tooltips />
        </div>
        <div className="flex-1 min-w-0">
          <PieChart />
        </div>
        <div className="flex-1 min-w-0">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
