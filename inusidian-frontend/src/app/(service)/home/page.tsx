import HomePage from "@/components/pages/Home";
import { getAllDecks } from "@/lib/api/deck";

export default async function Home() {
  const { decks } = await getAllDecks();

  return <HomePage decks={decks} />;
}
