import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Item } from "@radix-ui/react-dropdown-menu";

const chartConfig = {
  profileViews: {
    label: "Profile Views",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface ProfileViewChartProps {
  data: Array<{ time: string; count: number }>;
}

export default function ProfileViewChart({ data }: ProfileViewChartProps) {
  const totalViews = (data || []).reduce((acc, curr) => acc + curr.count, 0);

  const latestDataPoint = data[data.length - 1]?.count || 0;
  const previousDataPoint = data[data.length - 2]?.count || 0;

  const percentageChange =
    previousDataPoint > 0
      ? ((latestDataPoint - previousDataPoint) / previousDataPoint) * 100
      : 0;

  const formattedData = data.map((d) => ({
    time: d.time,
    Views: d.count,
  }));

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Profile View</CardTitle>
          <CardDescription>This Month</CardDescription>
        </div>
        <div className="flex text-4xl font-bold text-zinc-900 mb-4 pr-6">
          {totalViews}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer config={chartConfig} className="w-full h-52">
          <AreaChart
            accessibilityLayer
            data={formattedData}
            margin={{
              left: 30,
              right: 30,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(-5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillProfileViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-profileViews)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-profileViews)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="Views"
              type="natural"
              fill="url(#fillProfileViews)"
              fillOpacity={0.4}
              stroke="var(--color-profileViews)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Your profile views are{" "}
              <span
                className={
                  percentageChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {percentageChange.toFixed(1)}%
              </span>{" "}
              {percentageChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {data.length > 0
                ? `From ${data[0].time} to ${data[data.length - 1].time}`
                : "No data available"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
