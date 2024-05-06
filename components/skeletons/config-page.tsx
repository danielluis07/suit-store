"use client";

import { Skeleton } from "../ui/skeleton";

export const ConfigPageSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-5 w-56 mx-auto" />
      <div className="flex flex-col gap-y-5 xl:flex-row xl:gap-x-96 mt-20">
        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
