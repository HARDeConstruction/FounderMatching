import { FC, use } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card"; // Import Card components
import { Badge } from "@/components/ui/badge";
import { ProfilePreviewCard } from "@/lib/types/profiles";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  profile: ProfilePreviewCard;
}

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  const router = useRouter();
  return (
    <Card
      className="mb-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/profile/${profile.profileID}`);
      }}
    >
      <CardContent className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
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
          <div>
            <p className="text-sm font-medium text-zinc-800">{profile.name}</p>
            <p className="text-xs text-zinc-600">{profile.occupation}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
