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

  const decksResponse = await getAllDecks();
  if (decksResponse.error) return;
  const decks = decksResponse.body;

  const [learningHistoryResponse, cardDistributionResponse, studiedDaysResponse] =
    await Promise.all([
      getLearningHistory(),
      getCardDistribution(),
      getStudiedDays(currentYear, currentMonth + 1), // バックエンドは1始まり
    ]);

  return (
    <HomePage
      decks={decks}
      learningHistory={learningHistoryResponse.body}
      cardDistribution={cardDistributionResponse.body}
      studiedDays={studiedDaysResponse.body?.studiedDays}
      currentYear={currentYear}
      currentMonth={currentMonth}
    />
  );
}
