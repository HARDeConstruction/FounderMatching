"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/lib/types/profiles";
import { Separator } from "@/components/ui/separator";

interface StartupCardFrontProps {
  startup: ProfileData;
  onFlip: () => void;
}

const StartupCardFront: React.FC<StartupCardFrontProps> = ({
  startup,
  onFlip,
}) => {
  return (
    <Card className="shadow-lg p-4 h-full flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <div className="flex flex-row items-center space-x-4 pb-1">
          <Avatar className="mr-4 w-16 h-16 rounded-lg overflow-hidden">
            <AvatarImage
              src={
                typeof startup.avatar === "string" ? startup.avatar : undefined
              }
              alt={startup.name}
            />
            <AvatarFallback className="rounded-lg overflow-hidden">
              {startup.name
                ? startup.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col -translate-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-xl font-semibold ">
                {startup.name}
              </CardTitle>
              <span className="text-green-600 text-sm">
                ● {startup.currentStage}
              </span>
            </div>
            <p className="text-base font-medium">{startup.slogan}</p>
            <p className="text-[10px] italic text-muted-foreground">
              1-10 Employees
            </p>
          </div>
        </div>
        <div className="mt-2 flex gap-2 h-3">
          {(startup.tags || []).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-2 overflow-y-auto h-[80%] custom-scrollbar">
        <p className="text-lg font-medium">{startup.statement}</p>
        <p className="text-sm text-opacity-95">{startup.description}</p>
        {/* <p className="text-sm font-medium">Current Open Position: </p> */}
        {/* <p className="text-sm text-opacity-95">{startup.openPositions} </p> */}
      </CardContent>

      <Button
        variant="ghost"
        onClick={onFlip}
        className="self-start text-blue-500 text-sm font-semibold"
      >
        See more
      </Button>
    </Card>
  );
};

export default StartupCardFront;
