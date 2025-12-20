"use client";

import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export const UserIcon = () => {
  const router = useRouter();

  return (
    <div className="flex-1 flex justify-end items-center gap-2">
      <Bell className="w-8 h-8" />
      <img
        src="/user-icon.svg"
        alt="logo"
        className="w-[34px] h-[34px] cursor-pointer"
        onClick={() => {
          router.push("/auth/logout");
        }}
      />
    </div>
  );
};
