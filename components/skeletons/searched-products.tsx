"use client";

import { Skeleton } from "../ui/skeleton";

export const SearchedProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto mt-20">
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
      <div className="mx-auto w-64 xl:w-56">
        <Skeleton className="w-full h-56" />
        <div className="mt-2 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>
      </div>
    </div>
  );
};
