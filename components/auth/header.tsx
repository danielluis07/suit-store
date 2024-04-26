"use client";

import logo from "@/public/logo-mobile.png";
import Image from "next/image";

interface HeaderProps {
  label: string;
}

export default function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center justify-center w-24">
        <Image src={logo} alt="logo" className="w-full h-full object-cover" />
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}
