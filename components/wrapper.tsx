"use client";

import { cn } from "@/lib/utils";

interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn(
        "max-w-[1400px] min-h-full mx-auto xl:p-20 sm:px-2 px-4 pb-4 bg-milky",
        className
      )}>
      {children}
    </div>
  );
};
