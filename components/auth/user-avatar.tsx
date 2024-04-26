"use client";

import placeholder from "@/public/placeholders/placeholder-logo.jpg";
import Image from "next/image";

interface UserAvatarProps {
  imageUrl: string | undefined | null;
}

export const UserAvatar = ({ imageUrl }: UserAvatarProps) => {
  return (
    <div>
      <div className="relative flex size-6 shrink-0 overflow-hidden rounded-full">
        <Image
          src={imageUrl || placeholder}
          alt="usuario"
          fill
          className="aspect-square"
          sizes="(max-width: 3840px) 24px"
        />
      </div>
    </div>
  );
};
