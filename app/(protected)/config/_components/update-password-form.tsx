"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UpdatePasswordSchema } from "@/schemas";
import { updatePassword } from "@/actions/settings";
import { IoIosAlert } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordSchema>;

export const UpdatePasswordForm = () => {
  const params = useParams<{ storeId: string }>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onInvalid = (errors: any) => console.error(errors);

  const onSubmit = async (values: UpdatePasswordFormValues) => {
    startTransition(() => {
      updatePassword(values, params).then((data) => {
        if (data.error) {
          toast(data.error, {
            icon: <IoIosAlert className="text-red-600" />,
          });
        }

        if (data.success) {
          toast(data.success, {
            icon: <FaCheckCircle className="text-lime-500" />,
          });
        }
      });
    });
  };

  return (
    <>
      <h1 className="font-bold text-xl mb-10">Atualize sua Senha</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <div className="mb-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full xl:w-1/4">
                  <FormLabel>Senha atual</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full xl:w-1/4">
                  <FormLabel>Senha nova</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            Alterar senha
          </Button>
        </form>
      </Form>
    </>
  );
};
