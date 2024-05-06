"use client";

import { UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";

interface UploadFileProps {
  onChange: (url?: string, name?: string) => void;
  onRemove: (url?: string) => void;
  isPending: boolean;
  endpoint: keyof typeof ourFileRouter;
  initialData?: {
    imageUrl: string | undefined;
    imageName: string | undefined;
  };
}

export const UploadFile = ({
  onChange,
  isPending,
  onRemove,
  endpoint,
  initialData,
}: UploadFileProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialData?.imageUrl
  );
  const [imageName, setImageName] = useState<string | undefined>(
    initialData?.imageName
  );

  const handleUploadComplete = (res: any) => {
    const url = res?.[0].url;
    const name = res?.[0].name;
    setImageUrl(url);
    setImageName(name);
    onChange(url, name);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImageName("");
    onRemove(); // Ensure to trigger onRemove callback
  };

  return (
    <>
      <div className="w-min">
        {!imageUrl ? null : (
          <div className="relative size-28">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 3840px) 112px"
            />
            <div
              className={cn("absolute top-0 right-0 bg-white cursor-pointer")}
              onClick={handleRemoveImage}
              aria-label="Remove image">
              <IoMdClose />
            </div>
          </div>
        )}
      </div>
      <div className={cn(imageUrl ? "flex" : "hidden")}>
        {initialData?.imageName && !imageName
          ? initialData.imageName
          : imageName}
      </div>
      <div className="flex justify-start">
        <UploadButton
          content={{
            button({ ready, isUploading }) {
              if (isUploading) return <div>Carregando...</div>;
              if (ready) return <div>Insira uma imagem</div>;
            },
          }}
          className={cn(
            isPending && "pointer-events-none opacity-50",
            "ut-button:bg-black ut-button:w-56 ut-allowed-content:hidden"
          )}
          endpoint={endpoint}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            toast.error(`${error?.message}`);
          }}
        />
      </div>
    </>
  );
};
