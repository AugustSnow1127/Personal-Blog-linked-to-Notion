"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CREATOR_AVATARS, CREATOR_COUNT } from "@/app/(showcase)/projects/craftshorts/static-data";

export function CreatorAvatars() {
  const avatars = CREATOR_AVATARS;
  const count = CREATOR_COUNT;

  if (avatars.length === 0) {
    return null;
  }

  const formattedCount = count.toLocaleString();

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex -space-x-3">
        {avatars.map((avatar, i) => (
          <Avatar
            key={avatar.id}
            className="w-10 h-10 border-2 border-purple-900 ring-2 ring-black"
          >
            <AvatarImage src={avatar.avatarUrl} alt="Creator" />
            <AvatarFallback className="bg-purple-800 text-purple-200 text-sm">
              {String.fromCharCode(65 + i)}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      <span className="text-purple-300 text-sm">
        Trusted by <strong>{formattedCount}+</strong> creators
      </span>
    </div>
  );
}
