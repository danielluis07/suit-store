"use client";

import { CiMenuBurger } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const MobileMenu = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-2xl" />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-14 grid justify-items-end space-y-8 px-10">
          <div>INÍCIO</div>
          <div
            onClick={() => {
              router.push("/categories");
            }}>
            CATEGORIAS
          </div>
          <div>SOBRE NÓS</div>
          <div>CONTATO</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
