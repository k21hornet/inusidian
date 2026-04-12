import { fetcher } from "@/util/fetcher";

export async function getLearningHistory() {
  return await fetcher.get("/stats/learning-history");
}

export async function getCardDistribution() {
  return await fetcher.get("/stats/card-distribution");
}

export async function getStudiedDays(year: number, month: number) {
  return await fetcher.get(`/stats/studied-days?year=${year}&month=${month}`);
}
