"use client";

import Image from "next/image";
import logo from "@/public/logo-2.jpg";
import logo_mobile from "@/public/logo-mobile.png";
import { MobileMenu } from "./mobile-menu";
import Link from "next/link";
import { CartDiv } from "./cart-div";
import { UserDiv } from "./auth/user-div";
import { Session } from "next-auth";
import { User } from "@prisma/client";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import { Product } from "@/types";
import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";
import { useCallback, useRef, useState } from "react";
import { cn, convertCentsToReal } from "@/lib/utils";
import { Card } from "./ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { Dialog, DialogContent } from "./ui/dialog";

interface NavbarProps {
  session: Session | null;
  user: User | null;
  products: Product[];
}

export const Navbar = ({ session, user, products }: NavbarProps) => {
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const route = useRouter();

  const debouncedSearch = useCallback(
    debounce((query) => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, 300),
    [products]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!isHovering) {
      setIsOnFocus(false);
    }
  };

  const handleClick = (productId: string) => {
    route.push(`/product/${productId}`);
    setIsOnFocus(false);
  };

  const handleClickMobile = (productId: string) => {
    route.push(`/product/${productId}`);
    setIsOpen(false);
  };

  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("query", searchQuery);
      route.replace(`/search?${params.toString()}`);
    } else {
      params.delete("query");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setIsTyping(true);
    if (event.key === "Enter") {
      event.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (searchQuery) {
        params.set("query", searchQuery);
        setIsOnFocus(false);
        route.replace(`/search?${params.toString()}`);
      } else {
        params.delete("query");
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="h-screen">
          <div className="mt-3 h-min">
            <input
              onChange={handleSearchChange}
              className="flex h-14 w-full border-b border-slate-900 bg-transparent text-xl focus-visible:outline-none focus-visible:ring-0"
              type="text"
              placeholder="Procurar produtos..."
              value={searchQuery}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="h-full">
            {searchQuery === "" || filteredProducts.length === 0 ? (
              <div className="text-center">Nenhum produto encontrado</div>
            ) : (
              <div className="h-screen space-y-4 overflow-auto">
                {filteredProducts.map((item, index) => (
                  <Card
                    key={index}
                    className="flex relative w-full hover:bg-slate-100 cursor-pointer"
                    onClick={() => handleClickMobile(item.id)}>
                    {/* Image */}
                    <div className="relative w-[100px] h-[100px]">
                      <Image
                        src={
                          item.images[0].url
                            ? item.images[0].url
                            : imagePlaceholder
                        }
                        alt="product"
                        fill
                        className="object-cover"
                        sizes="(max-width: 3840px) 100px"
                      />
                    </div>
                    {/* Info */}
                    <div className="w-full max-w-80 sm:max-w-full py-7 lg:py-4 px-1 space-y-1">
                      <p className="line-clamp-1">{item.name}</p>
                      <p>
                        Preço <span>{convertCentsToReal(item.price)}</span>
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-20 w-full bg-milky border-b border-b-slate-400">
        <div
          className={cn(
            isOnFocus ? "justify-end" : "justify-between",
            "flex items-center px-5 md:px-10 w-full max-w-[2000px]"
          )}>
          <Link href="/">
            <div
              className={cn(
                !isOnFocus ? "flex" : "hidden",
                "relative maxsm:hidden sm:w-[170px] sm:h-[50px] items-center"
              )}>
              <Image
                src={logo}
                alt="logo"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 3840px) 170px"
              />
            </div>
          </Link>
          <Link href="/">
            <div className="relative flex items-center w-[45px] h-[45px] sm:hidden">
              <Image
                src={logo_mobile}
                alt="logo-mobile"
                fill
                className="object-contain"
                sizes="(max-width: 3840px) 45px"
              />
            </div>
          </Link>
          <div
            className={cn(
              !isOnFocus ? "flex" : "hidden",
              "maxl:hidden space-x-3 md:space-x-10 cursor-pointer"
            )}>
            <div className="flex flex-col justify-between group">
              <Link href="/">INÍCIO</Link>
              <span className="h-[2px] bg-black w-0 group-hover:w-full transition-all"></span>
            </div>
            <div className="flex flex-col justify-between group">
              <Link href="/products">PRODUTOS</Link>
              <span className="h-[2px] bg-black w-0 group-hover:w-full transition-all"></span>
            </div>
            <div className="flex flex-col justify-between group">
              <Link href="/about">SOBRE NÓS</Link>
              <span className="h-[2px] bg-black w-0 group-hover:w-full transition-all"></span>
            </div>
            <div className="flex flex-col justify-between group">
              <Link href="/contact">CONTATO</Link>
              <span className="h-[2px] bg-black w-0 group-hover:w-full transition-all"></span>
            </div>
          </div>
          <div className="flex sm:hidden pl-3 w-11/12 justify-end">
            <div className="mr-4" onClick={() => setIsOpen(true)}>
              <IoIosSearch className="text-2xl" />
            </div>
            <div className="flex items-center space-x-5">
              <UserDiv user={user} />
              <CartDiv session={session} />
              <div className="flex xl:hidden cursor-pointer">
                <MobileMenu />
              </div>
            </div>
          </div>
          <div
            className={cn(
              isOnFocus ? "w-full" : "w-[480px]",
              "relative hidden sm:flex items-center justify-end space-x-5 transition-all"
            )}>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Procurar produtos..."
                value={searchQuery}
                ref={inputRef}
                onChange={handleSearchChange}
                onFocus={() => setIsOnFocus(true)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="h-10 border-slate-700"
              />
              <div
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                <IoIosSearch className="size-6" />
              </div>
              <div
                className={cn(
                  isTyping &&
                    isOnFocus &&
                    filteredProducts.length > 0 &&
                    searchQuery !== ""
                    ? "h-80"
                    : "h-0",
                  "absolute top-[42px] w-full bg-milky rounded-sm overflow-auto"
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                <div className="h-full">
                  {filteredProducts.map((item, index) => (
                    <Card
                      key={index}
                      className="flex relative w-full hover:bg-slate-100 cursor-pointer"
                      onClick={() => handleClick(item.id)}>
                      {/* Image */}
                      <div className="relative w-[150px] h-[150px]">
                        <Image
                          src={
                            item.images[0].url
                              ? item.images[0].url
                              : imagePlaceholder
                          }
                          alt="product"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Info */}
                      <div className="w-full max-w-80 sm:max-w-full py-7 lg:py-4 px-1 space-y-1">
                        <p className="line-clamp-1">{item.name}</p>
                        <p>
                          Preço <span>{convertCentsToReal(item.price)}</span>
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <UserDiv user={user} />
            <CartDiv session={session} />
            <div className="flex xl:hidden cursor-pointer">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
