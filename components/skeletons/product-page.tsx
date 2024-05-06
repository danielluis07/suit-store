"use client";

import { Skeleton } from "../ui/skeleton";

export const ProductPageSkeleton = () => {
  return (
    <div className="py-10 xl:py-0 mt-20">
      <div className="flex flex-col lg:flex-row">
        {/* categories */}
        <div className="hidden lg:flex lg:flex-col gap-y-8 w-1/3 mt-8">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-44" />
        </div>
        {/* product */}
        <div className="flex flex-col md:flex-row w-full">
          <Skeleton className="size-72 mx-auto" />
          <div className="w-full md:w-96 mt-3 md:mt-0 space-y-3">
            <Skeleton className="h-4 w-11/12 mx-auto" />
            <Skeleton className="h-4 w-11/12 mx-auto" />
            <Skeleton className="h-4 w-11/12 mx-auto" />
            <Skeleton className="h-4 w-11/12 mx-auto" />
          </div>
        </div>
      </div>
      <Skeleton className="w-full h-56 mt-10" />
    </div>
  );
};
