"use client";

import Link from "next/link";

export const CategoriesDiv = () => {
  return (
    <div className="w-72 space-y-12 lg:mt-10 lg:ml-4 xl:ml-0 xl:mt-0">
      <div className="w-min border-b border-black">CATEGORIAS</div>
      <div className="space-y-8 w-5/6">
        <div className="hover:underline border-b pb-3 border-slate-400">
          <Link href="/suits">Ternos</Link>
        </div>
        <div className="hover:underline border-b pb-3 border-slate-400">
          <Link href="/vests">Coletes/Camisas</Link>
        </div>
        <div className="hover:underline border-b pb-3 border-slate-400">
          <Link href="/shoes">Sapatos</Link>
        </div>
        <div className="hover:underline border-b pb-3 border-slate-400">
          <Link href="/watches">Relógios</Link>
        </div>
      </div>
    </div>
  );
};
