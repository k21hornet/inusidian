"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartCata = [
  { date: "2026-01-01", newCards: 10, reviewedCards: 14 },
  { date: "2026-01-02", newCards: 7, reviewedCards: 10 },
  { date: "2026-01-03", newCards: 1, reviewedCards: 13 },
  { date: "2026-01-04", newCards: 5, reviewedCards: 20 },
  { date: "2026-01-05", newCards: 13, reviewedCards: 6 },
  { date: "2026-01-06", newCards: 11, reviewedCards: 18 },
  { date: "2026-01-07", newCards: 12, reviewedCards: 23 },
];

const chartConfig = {
  newCards: {
    label: "新規",
    color: "#999",
  },
  reviewedCards: {
    label: "復習済み",
    color: "#bbb",
  },
} satisfies ChartConfig;

export const Tooltips = () => {
  return (
    <Card className="h-full gap-0">
      <CardHeader className="mt-4">
        <CardTitle>学習履歴</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-60">
          <BarChart data={chartCata}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("ja-JP", {
                  weekday: "short",
                });
              }}
            />
            <Bar
              dataKey="newCards"
              stackId="a"
              fill="var(--color-newCards)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="reviewedCards"
              stackId="a"
              fill="var(--color-reviewedCards)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
