"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import deal from "@/public/deal.jpg";

interface DealProps {
  className: string;
}

export const Deal = ({ className }: DealProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Image src={deal} alt="deal" className="w-full h-full object-cover" />
    </div>
  );
};
