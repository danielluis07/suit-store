"use client";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface CurrencyProps {
  value?: string | number;
}

export const Currency = ({ value }: CurrencyProps) => {
  return (
    <span className="font-semibold">{formatter.format(Number(value))}</span>
  );
};
