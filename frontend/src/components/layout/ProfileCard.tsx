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

interface ProfileCardProps {
  name: string;
  jobTitle: string;
  education?: string;
  imageUrl: string;
  userBio: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  jobTitle,
  education,
  imageUrl,
  userBio,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-gray-500">{userBio}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-xs pr-2">
      <Badge>
        {jobTitle} {education && `at ${education}`}
      </Badge>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;

// Example usage
// <ProfileCard
//   name="Hamish Marsh"
//   jobTitle="HR Manager"
//   education="Grameenphone"
//   imageUrl="/assets/images/hamish.png"
// />
