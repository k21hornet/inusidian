"use client";

import { Bar, BarChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LearningHistoryEntry } from "../../types";

type Props = {
  data: LearningHistoryEntry[];
};

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

export const Tooltips = ({ data }: Props) => {
  return (
    <Card className="h-full gap-0">
      <CardHeader className="mt-4">
        <CardTitle>学習履歴</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-60">
          <BarChart data={data}>
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
