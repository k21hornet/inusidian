import { getAllDecks } from "@/features/deck/api";
import HomePage from "./_components";

export default async function Home() {
  const { decks } = await getAllDecks();

  return <HomePage decks={decks} />;
}
