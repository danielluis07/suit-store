"use client";

import { Order } from "@/types";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import imagePlaceholder from "@/public/image-placeholder.jpg";
import Image from "next/image";

interface OrdersProps {
  orders: Order[];
}

export const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="w-full xl:w-11/12 xl:mx-auto">
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div key={index} className="rounded-md bg-gray-200 p-2">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Número do Pedido</p>
                <p className="text-gray-500">{order.number}</p>
              </div>
              <div>
                <p className="text-gray-500">Pedido feito em:</p>
                <p className="text-gray-500">
                  {format(new Date(order.paidAt), "dd/MM/yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
            <div className="bg-milky rounded-md p-1">
              {order.orderItems.map((item, index) => (
                <div key={index}>
                  <div>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
