import { Calendar } from "@/features/charts/components/Calendar";
import { PieChart } from "@/features/charts/components/PieCharts";
import { Tooltips } from "@/features/charts/components/Tooltips";
import {
  CardSuccessDistributionEntry,
  LearningHistoryEntry,
} from "@/features/charts/types";
import { DeckTable } from "@/features/deck/components/DeckTable";
import { Deck } from "@/features/deck/types";

type Props = {
  decks: Deck[];
  learningHistory: LearningHistoryEntry[];
  cardDistribution: CardSuccessDistributionEntry[];
  studiedDays: number[];
  currentYear: number;
  currentMonth: number;
};

export default function HomePage({
  decks,
  learningHistory,
  cardDistribution,
  studiedDays,
  currentYear,
  currentMonth,
}: Props) {
  return (
    <div className="mb-5">
      <DeckTable decks={decks} />

      <div className="flex flex-col md:flex-row items-stretch w-full mb-6 gap-6">
        <div className="flex-1 min-w-0">
          <Tooltips data={learningHistory} />
        </div>
        <div className="flex-1 min-w-0">
          <PieChart data={cardDistribution} />
        </div>
        <div className="flex-1 min-w-0">
          <Calendar
            initialStudiedDays={studiedDays}
            initialYear={currentYear}
            initialMonth={currentMonth}
          />
        </div>
      </div>
    </div>
  );
}
