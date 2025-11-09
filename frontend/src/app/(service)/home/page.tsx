import HomePage from "@/components/pages/Home";
import { getAllDecks } from "@/features/deck";

export default async function Home() {
  const response = await getAllDecks();

  return <HomePage decks={response.decks} />;
}
