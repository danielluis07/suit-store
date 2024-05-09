"use client";

import { Order } from "@/types";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OrdersProps {
  orders: Order[];
}

export const Orders = ({ orders }: OrdersProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logisticStatus = (status: string) => {
    if (status === "WAITING_FOR_PAYMENT") {
      return "Aguardando confirmação de pagamento";
    } else if (status === "PREPARING") {
      return "Pedido em separação";
    } else if (status === "SENT") {
      return "Pedido enviado";
    } else if (status === "DELIVERED") {
      return "Pedido entregue";
    }
  };

  return (
    <div className="w-full xl:w-11/12 xl:mx-auto">
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div key={index} className="rounded-md bg-gray-200 p-2">
            <div className="flex justify-between">
              <p className="text-gray-500 font-bold">
                Número do Pedido:{" "}
                <span className="font-normal">{order.number}</span>
              </p>
              <p className="text-gray-500 font-bold">
                Pedido feito em:{" "}
                <span className="font-normal">
                  {format(new Date(order.paidAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </span>
              </p>
            </div>
            <div className="bg-milky rounded-md my-1 p-1">
              <h1 className="font-bold text-lg">Status</h1>
              <p className="text-md text-slate-500">
                {logisticStatus(order.logisticStatus)}
              </p>
              {order.trackId && (
                <p className="text-md text-slate-500 mt-1">
                  Código de rastreio: <span>{order.trackId}</span>
                </p>
              )}
            </div>
            <div
              className={cn(
                isOpen ? "h-auto" : "h-[140px]",
                "relative bg-milky rounded-md pt-1 pr-1 pl-1 pb-8 space-y-1 overflow-hidden"
              )}>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <div className="relative w-[100px] h-[100px] rounded-sm overflow-hidden">
                      <Image
                        src={item.imageUrl ?? imagePlaceholder}
                        alt="product"
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 3840px) 100px"
                      />
                    </div>
                    <div>
                      <p>{item.product.name}</p>
                      <p>{item.sizeName}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute top-5 right-2">
                <Button>Cancelar Pedido</Button>
              </div>
              {order.orderItems.length > 1 && (
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="absolute bottom-0 flex items-center justify-center h-8 bg-milky w-full cursor-pointer">
                  <FaAngleDown
                    className={cn(isOpen && "rotate-180", "text-xl")}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
