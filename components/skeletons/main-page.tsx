"use client";

import { Skeleton } from "../ui/skeleton";

export const MainPageSkeleton = () => {
  return (
    <div className="py-10 xl:py-0">
      <Skeleton className="w-full h-[400px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 w-11/12 mx-auto mt-10">
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
        <div className="mx-auto w-64 xl:w-56 group">
          <Skeleton className="w-full h-56" />
          <div className="mt-2 space-y-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
        <Skeleton className="md:row-span-12 maxmd:size-64 maxmd:mx-auto md:h-80" />
        <Skeleton className="md:row-span-12 maxmd:size-64 maxmd:mx-auto md:h-80" />
        <Skeleton className="md:row-span-6 maxmd:size-64 maxmd:mx-auto" />
        <Skeleton className="md:row-span-6 maxmd:size-64 maxmd:mx-auto" />
      </div>
    </div>
  );
};
