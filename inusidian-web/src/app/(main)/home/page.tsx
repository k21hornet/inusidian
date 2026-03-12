import {
  getCardDistribution,
  getLearningHistory,
  getStudiedDays,
} from "@/features/charts/api";
import { getAllDecks } from "@/features/deck/api";
import HomePage from "./_components";

export default async function Home() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0始まり

  const [{ decks }, learningHistory, cardDistribution, studiedDaysResponse] =
    await Promise.all([
      getAllDecks(),
      getLearningHistory(),
      getCardDistribution(),
      getStudiedDays(currentYear, currentMonth + 1), // バックエンドは1始まり
    ]);

  return (
    <HomePage
      decks={decks}
      learningHistory={learningHistory}
      cardDistribution={cardDistribution}
      studiedDays={studiedDaysResponse.studiedDays}
      currentYear={currentYear}
      currentMonth={currentMonth}
    />
  );
}
