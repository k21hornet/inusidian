"use client";

import * as React from "react";
import { Label, Pie, PieChart as ReChartsPieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { successCount: 1, cardsCount: 13, fill: "var(--color-one" },
  { successCount: 2, cardsCount: 25, fill: "var(--color-two" },
  { successCount: 3, cardsCount: 32, fill: "var(--color-three" },
  { successCount: 4, cardsCount: 36, fill: "var(--color-four" },
  { successCount: 5, cardsCount: 62, fill: "var(--color-overFive" },
];

const chartConfig = {
  cards: {
    label: "Cards",
  },
  one: {
    label: "1回",
    color: "#ccc",
  },
  two: {
    label: "2回",
    color: "#aaa",
  },
  three: {
    label: "3回",
    color: "#888",
  },
  four: {
    label: "4回",
    color: "#666",
  },
  overFive: {
    label: "5回以上",
    color: "#444",
  },
} satisfies ChartConfig;

export const PieChart = () => {
  const totalCards = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cardsCount, 0);
  }, []);

  return (
    <Card className="h-full gap-0">
      <CardHeader className="items-center mt-4 pb-0">
        <CardTitle>統計</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full h-60 aspect-squar"
        >
          <ReChartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="successCount"
              nameKey="cardsCount"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCards.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Cards
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </ReChartsPieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
