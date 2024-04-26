"use client";

import { UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";
import placeholder from "@/public/placeholders/placeholder-logo.jpg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface UploadFileProps {
  onChange: (url?: string, name?: string) => void;
  onRemove: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  initialData?: {
    imageUrl: string | undefined;
    imageName: string | undefined;
  };
}

export const UploadFile = ({
  onChange,
  endpoint,
  initialData,
}: UploadFileProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const url = initialData?.imageUrl as string | StaticImport;

  const handleUploadComplete = (res: any) => {
    const url = res?.[0].url;
    const name = res?.[0].name;
    setImageUrl(url);
    setImageName(name);
    onChange(url, name); // Pass both URL and name back to the form
  };

  return (
    <div className="py-8">
      <div className="w-min">
        <div className="flex justify-end">
          <div
            onClick={() => setImageUrl("")}
            className={cn(
              imageUrl.length ? "flex w-min cursor-pointer" : "hidden"
            )}>
            <IoMdClose />
          </div>
        </div>
        <div
          className={cn(
            imageUrl.length || url ? "relative size-24" : "hidden"
          )}>
          <Image
            src={url && !imageUrl ? url : imageUrl}
            alt="imagem"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className={cn(imageUrl.length || url ? "flex" : "hidden")}>
        {initialData?.imageName && !imageName
          ? initialData.imageName
          : imageName}
      </div>
      <UploadButton
        appearance={{
          container: "w-min flex-row rounded-md mt-5 bg-black",
          allowedContent: "hidden",
        }}
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  );
};
