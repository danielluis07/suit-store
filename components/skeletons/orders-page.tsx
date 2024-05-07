"use client";

import { Skeleton } from "../ui/skeleton";

export const OrdersPageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full space-y-8">
        <div className="flex space-x-3">
          <Skeleton className="size-32" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
        <div className="flex space-x-3">
          <Skeleton className="size-32" />
          <div className="space-y-5">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-72" />
          </div>
        </div>
      </div>
    </div>
  );
};
