"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa";

interface MessageProps {
  param: string;
}

export const Message = ({ param }: MessageProps) => {
  const { removeAll } = useCart();

  useEffect(() => {
    if (param === "success=1") {
      removeAll();
    }
  }, [param, removeAll]);

  return (
    <>
      {param === "success=1" && (
        <div className="flex justify-center items-center h-screen">
          <div className="space-y-4">
            <div className="p-4 rounded-full bg-green-200 w-min mx-auto">
              <FaCheck className="text-7xl text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-400">
              Obrigado pela compra! Você receberá um email de confirmação
            </h1>
          </div>
        </div>
      )}
      {param === "canceled=1" && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="font-bold text-gray-400 text-2xl">
            Compra cancelada. Continue navegando pela loja e volte para o
            checkout quando estiver pronto!
          </h1>
        </div>
      )}
    </>
  );
};
