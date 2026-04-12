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
import { CardSuccessDistributionEntry } from "../../types";

export const description = "A donut chart with text";

type PieChartEntry = CardSuccessDistributionEntry & { fill: string };

type Props = {
  data: CardSuccessDistributionEntry[];
};

const fillMap: Record<number, string> = {
  1: "var(--color-one)",
  2: "var(--color-two)",
  3: "var(--color-three)",
  4: "var(--color-four)",
  5: "var(--color-overFive)",
};

const chartConfig = {
  cards: {
    label: "Cards",
  },
  one: {
    label: "1回",
    color: "#b3e5fc",
  },
  two: {
    label: "2回",
    color: "#40c4ff",
  },
  three: {
    label: "3回",
    color: "#1e9de0",
  },
  four: {
    label: "4回",
    color: "#2979ff",
  },
  overFive: {
    label: "5回以上",
    color: "#2962ff",
  },
} satisfies ChartConfig;

export const PieChart = ({ data }: Props) => {
  const chartData: PieChartEntry[] = data.map((d) => ({
    ...d,
    fill: fillMap[d.successCount] ?? "#ccc",
  }));

  const totalCards = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cardsCount, 0);
  }, [chartData]);

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
              dataKey="cardsCount"
              nameKey="successCount"
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
