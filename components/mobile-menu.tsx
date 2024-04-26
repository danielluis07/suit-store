"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="text-2xl" />
      </SheetTrigger>
      <SheetContent>
        <div className="mt-14 grid justify-items-end space-y-8 px-10">
          <Link href="/">
            <p className="cursor-pointer">INÍCIO</p>
          </Link>
          <Link href="/products">
            <p className="cursor-pointer">PRODUTOS</p>
          </Link>
          <Link href="/about">
            <p className="cursor-pointer">SOBRE NÓS</p>
          </Link>
          <Link href="/contact">
            <p className="cursor-pointer">CONTATO</p>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
