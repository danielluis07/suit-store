"use client";

import { Order } from "@/types";

interface OrdersProps {
  orders: Order[];
}

export const Orders = ({ orders }: OrdersProps) => {
  console.log(orders, "orders");
  return (
    <div className="w-full xl:w-11/12">
      {orders.map((order, index) => (
        <div key={index} className="rounded-md bg-gray-400">
          <div className="flex justify-between">
            <div>
              <p>Número do Pedido</p>
              <p>{order.number}</p>
            </div>
            <div>
              <p>Pedido feito em:</p>
              <p>{order.createdAt}</p>
            </div>
          </div>
          <div className="bg-milky rounded-md">
            <div>
              <p>hello</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
