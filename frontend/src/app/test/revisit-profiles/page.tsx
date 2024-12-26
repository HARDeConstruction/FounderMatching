import Image from "next/image";
import React from "react";
import image from "../../../assets/avatar.png";
import { Button } from "@/components/ui/button";
import { BookMarkedIcon } from "lucide-react";

type ProfileType = {
  name: string;
  position: string;
  location: string;
};

const ProfileItem = ({ name, position, location }: ProfileType) => (
  <div className="flex flex-row p-3 gap-3 hover:bg-gray-200 rounded-lg">
    <Image src={image} alt="iamge" />
    <div className="flex flex-col flex-1">
      <p className="font-semibold text-xl">{name}</p>
      <div className="flex flex-row gap-3">
        <p className="font-semibold">{position}</p>
        <p>{location}</p>
      </div>
      <div>
        <Button variant="ghost" className="text-blue-400 font-bold">
          View
        </Button>
      </div>
    </div>
    <Button variant="outline" size="icon">
      <BookMarkedIcon />
    </Button>
  </div>
);

const RevisitProfiles = () => {
  const likedProfiles = [
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
    {
      name: "Product Designer",
      position: "Designer",
      location: "Hanoi, Vietnam",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {likedProfiles.map((item, i) => (
        <ProfileItem
          key={i}
          name={item.name}
          position={item.position}
          location={item.location}
        />
      ))}
    </div>
  );
};

export default RevisitProfiles;
