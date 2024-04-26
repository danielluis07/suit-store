"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const RegisterButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/register");
  };

  return <Button onClick={onClick}>Registrar</Button>;
};
