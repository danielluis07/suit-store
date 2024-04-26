"use client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const FormSkeleton = () => {
  return (
    <Card className="w-[450px] shadow-md p-2">
      <div className="space-y-4">
        <Skeleton className="size-20 rounded-full mx-auto" />
        <Skeleton className="w-32 h-4 mx-auto" />
      </div>
      <div className="mt-8 space-y-3">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-10" />
      </div>
      <div className="mt-8 space-y-3">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-11/12 h-10 mt-14 mx-auto" />
      </div>
    </Card>
  );
};
