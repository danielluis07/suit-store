"use client";

import { Skeleton } from "../ui/skeleton";

export const OrdersPageSkeleton = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="space-y-2">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
    </div>
  );
};
