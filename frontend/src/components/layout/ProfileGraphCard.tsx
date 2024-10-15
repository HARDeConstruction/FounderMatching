import { TrendingUp } from "lucide-react";
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

const chartData = [
    { day: "04/01", profileViews: 400 },
    { day: "04/02", profileViews: 450 },
    { day: "04/03", profileViews: 470 },
    { day: "04/04", profileViews: 490 },
    { day: "04/05", profileViews: 600 },
    { day: "04/06", profileViews: 580 },
    { day: "04/07", profileViews: 620 },
    { day: "04/08", profileViews: 650 },
    { day: "04/09", profileViews: 680 },
    { day: "04/10", profileViews: 900 },
    { day: "04/11", profileViews: 850 },
    { day: "04/12", profileViews: 870 },
    { day: "04/13", profileViews: 890 },
    { day: "04/14", profileViews: 860 },
    { day: "04/15", profileViews: 605 },
    { day: "04/16", profileViews: 630 },
    { day: "04/17", profileViews: 640 },
    { day: "04/18", profileViews: 670 },
    { day: "04/19", profileViews: 690 },
    { day: "04/20", profileViews: 700 },
    { day: "04/21", profileViews: 720 },
    { day: "04/22", profileViews: 730 },
    { day: "04/23", profileViews: 750 },
    { day: "04/24", profileViews: 780 },
    { day: "04/25", profileViews: 800 },
    { day: "04/26", profileViews: 820 },
    { day: "04/27", profileViews: 840 },
    { day: "04/28", profileViews: 860 },
    { day: "04/29", profileViews: 880 },
    { day: "04/30", profileViews: 900 },
];

const chartConfig = {
  profileViews: {
    label: "Profile Views",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ProfileViewChart() {
  return (
    <Card className="shadow-md h-full">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Profile View</CardTitle>
          <CardDescription>This Month</CardDescription>
        </div>
        <div className="flex text-4xl font-bold text-zinc-900 mb-4 pr-6">
          4029
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <ChartContainer
          config={chartConfig}
          className="w-full h-52"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 30,
              right: 30,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value, index) => (index % 5 === 0 ? value : '')}
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
              dataKey="profileViews"
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
              Your profile views is up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              April 1 - April 30 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
