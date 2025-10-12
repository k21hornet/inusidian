import DashboardPage from "@/components/pages/dashboardTmp";
import { getAllDecks } from "@/features/deck";

export default async function Dashboard() {
  const decks = await getAllDecks();

  return <DashboardPage decks={decks} />;
}
