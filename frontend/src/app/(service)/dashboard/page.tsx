import DashboardPage from "@/components/pages/dashboard";
import { getAllDecks } from "@/app/actions/deck";

export default async function Dashboard() {
  const decks = await getAllDecks();

  return <DashboardPage decks={decks} />;
}
