"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { LogoutButton } from "./logout-button";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { BsBagHeart } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface UserDivProps {
  user: User | null;
}

export const UserDiv = ({ user }: UserDivProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const name = user?.username ? user.username : user?.name?.split(" ")[0];

  const onMouseEnter = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1280) setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1280) setIsOpen(false);
    }
  };

  const onClick = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1280) setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {!user ? (
        <>
          <div className="hidden sm:flex">
            <Button onClick={() => router.push("/auth/login")}>Entrar</Button>
          </div>
          <div
            onClick={() => router.push("/auth/login")}
            className="flex sm:hidden text-2xl cursor-pointer">
            <CiUser />
          </div>
        </>
      ) : (
        <>
          <div className="hidden gap-x-2 md:flex">
            <UserAvatar imageUrl={user.imageUrl} />
            <div
              onMouseLeave={onMouseLeave}
              onClick={onClick}
              className="relative flex">
              <div
                onMouseEnter={onMouseEnter}
                className="truncate cursor-pointer group">
                {name}
              </div>
              <ChevronDown
                onMouseEnter={onMouseEnter}
                className={cn(
                  isOpen ? "-rotate-180" : "rotate-0",
                  "cursor-pointer xl:group-hover:-rotate-180 transition-all duration-300"
                )}
              />
              <div
                className={cn(
                  isOpen ? "opacity-100 h-44" : "opacity-0 h-0",
                  "absolute bg-milky top-6 right-[5px] z-10 w-36 transition-all duration-300 ease-in-out"
                )}>
                <div
                  className={cn(
                    !isOpen && "hidden",
                    "px-2 py-4 space-y-4 text-sm"
                  )}>
                  <div className="flex items-center gap-x-1">
                    <IoSettingsOutline />
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/config")}>
                      Configurações
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BsBoxSeam />
                    <div className="cursor-pointer hover:underline">
                      Meus Pedidos
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BsBagHeart />
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/wishlist")}>
                      Lista de desejos
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CiLogout />
                    <LogoutButton>Sair</LogoutButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <UserAvatar imageUrl={user.imageUrl} />
                </div>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-4 space-y-8 mt-8">
                  <div className="flex items-center gap-x-1">
                    <IoSettingsOutline />
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/config")}>
                      Configurações
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BsBoxSeam />
                    <div className="cursor-pointer hover:underline">
                      Meus Pedidos
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <BsBagHeart />
                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/wishlist")}>
                      Lista de desejos
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <CiLogout />
                    <LogoutButton>Sair</LogoutButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
    </>
  );
};
