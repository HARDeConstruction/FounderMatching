import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfilePreviewCard } from "@/lib/types/profiles";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  profile: ProfilePreviewCard;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const router = useRouter();

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={profile.avatar || undefined} alt={profile.name} />
          <AvatarFallback>
            {profile.name
              ? profile.name
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
                  .toUpperCase()
              : "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">
            {profile.name}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {profile.occupation}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {profile.tags.map((tag, index) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            router.push(`/dashboard/profiles/profileId=${profile.profileID}`);
          }}
        >
          View {profile.isStartup ? "Startup" : "Candidate"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
