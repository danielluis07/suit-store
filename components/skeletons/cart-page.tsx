"use client";

import { Skeleton } from "../ui/skeleton";

export const CartPageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full space-y-8">
        <div className="flex space-x-3">
          <Skeleton className="size-32" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <div className="flex space-x-3">
          <Skeleton className="size-32" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-center lg:justify-end w-full">
        <Skeleton className="w-full lg:w-[350px] h-[350px]" />
      </div>
    </div>
  );
};
