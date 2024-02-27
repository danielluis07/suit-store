import Image from "next/image";
import logo from "@/public/logo-2.jpg";
import logo_mobile from "@/public/logo-mobile.png";
import { CiMenuBurger } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
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
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex items-center h-24 w-full bg-milky border-b border-b-slate-400 justify-between px-5 md:px-10">
      <div className="hidden sm:flex sm:w-[180px] sm:h-[60px] items-center">
        <Link href="/">
          <Image src={logo} alt="logo" objectFit="contain" />
        </Link>
      </div>
      <div className="flex items-center w-[50px] h-[50px] sm:hidden">
        <Image src={logo_mobile} alt="logo-mobile" objectFit="contain" />
      </div>
      <div className="flex">
        <div className="hidden sm:flex space-x-3">
          <p>INÍCIO</p>
          <p>CATEGORIAS</p>
          <p>SOBRE NÓS</p>
          <p>CONTATO</p>
        </div>
        <div className="flex items-center space-x-5">
          <div>
            <CiShoppingCart className="text-2xl" />
          </div>
          <div>
            <CiLogin className="text-2xl" />
          </div>
          <div className="flex sm:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
