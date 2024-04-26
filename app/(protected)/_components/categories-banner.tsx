"use client";

import Image from "next/image";
import suits from "@/public/placeholders/suits.jpg";
import watches from "@/public/placeholders/watches.jpg";
import shoes from "@/public/placeholders/shoes.jpg";
import vests from "@/public/placeholders/vests.jpg";

export const CategoriesBanner = () => {
  return (
    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-3 lg:w-5/6 lg:mx-auto xl:grid-cols-3">
      <div className="relative flex items-center justify-center w-full h-56 sm:w-96 sm:h-72 mx-auto xl:w-auto xl:h-auto xl:row-span-2 overflow-hidden group">
        <Image
          src={suits}
          alt="categoria"
          className="block w-full h-full object-cover group-hover:brightness-75 sm:group-hover:scale-110 brightness-50 sm:brightness-100 sm:group-hover:brightness-50 sm:transition-all sm:duration-300"
        />
        <div className="absolute inset-0 w-full h-full sm:opacity-0 sm:group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center text-center text-white select-none text-4xl">
            Ternos
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full h-56 sm:w-96 sm:h-72 mx-auto xl:w-auto xl:h-auto xl:row-span-2 overflow-hidden group">
        <Image
          src={vests}
          alt="categoria"
          className="block w-full h-full object-cover group-hover:brightness-75 sm:group-hover:scale-110 brightness-50 sm:brightness-100 sm:group-hover:brightness-50 sm:transition-all sm:duration-300"
        />
        <div className="absolute inset-0 w-full h-full sm:opacity-0 sm:group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center text-center text-white select-none text-3xl">
            Coletes/Camisas
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full h-56 sm:w-96 sm:h-72 mx-auto xl:w-auto xl:h-auto xl:col-span-1 overflow-hidden group">
        <Image
          src={watches}
          alt="categoria"
          className="block w-full h-full object-cover group-hover:brightness-75 sm:group-hover:scale-110 brightness-50 sm:brightness-100 sm:group-hover:brightness-50 sm:transition-all sm:duration-300"
        />
        <div className="absolute inset-0 w-full h-full sm:opacity-0 sm:group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center text-center text-white select-none text-3xl">
            Relógios
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-full h-56 sm:w-96 sm:h-72 mx-auto xl:w-auto xl:h-auto xl:row-span-1 overflow-hidden group">
        <Image
          src={shoes}
          alt="categoria"
          className="block w-full h-full object-cover group-hover:brightness-75 sm:group-hover:scale-110 brightness-50 sm:brightness-100 sm:group-hover:brightness-50 sm:transition-all sm:duration-300"
        />
        <div className="absolute inset-0 w-full h-full sm:opacity-0 sm:group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center text-center text-white select-none text-3xl">
            Sapatos
          </div>
        </div>
      </div>
    </div>
  );
};
