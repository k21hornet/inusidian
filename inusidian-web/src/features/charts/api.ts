import { fetcher } from "@/util/fetcher";
import {
  CardSuccessDistributionEntry,
  LearningHistoryEntry,
  StudiedDaysResponse,
} from "./types";

export async function getLearningHistory(): Promise<LearningHistoryEntry[]> {
  return await fetcher.get("/stats/learning-history");
}

export async function getCardDistribution(): Promise<
  CardSuccessDistributionEntry[]
> {
  return await fetcher.get("/stats/card-distribution");
}

export async function getStudiedDays(
  year: number,
  month: number
): Promise<StudiedDaysResponse> {
  return await fetcher.get(`/stats/studied-days?year=${year}&month=${month}`);
}
