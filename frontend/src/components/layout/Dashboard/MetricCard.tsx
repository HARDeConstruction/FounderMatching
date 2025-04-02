import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react"; // Icon for menu dots

interface MetricCardProps {
  title: string;
  description: string;
  value: string | number;
  showMenu?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  description,
  value,
  showMenu = true,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {showMenu && (
          <button className="text-zinc-400">
            <MoreHorizontal color="blue"/>
          </button>
        )}
      </CardHeader>
      <CardContent>
        <div className="mt-2 text-4xl font-bold text-zinc-900">{value}</div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
