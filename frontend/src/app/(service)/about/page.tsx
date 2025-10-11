import DashboardPage from "@/components/pages/dashboard";
import { getAllDecks } from "@/features/deck";

export default async function About() {
  const decks = await getAllDecks();

  return <DashboardPage decks={decks} />;
}
