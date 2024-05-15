"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { SettingsSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { UploadFile } from "./upload-file";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";
import { FaTrashAlt } from "react-icons/fa";
import { deleteUser } from "@/actions/delete-user";
import { AlertModal } from "@/modals/alert-modal";
import { logout } from "@/actions/logout";
import { settings } from "@/actions/settings";
import { Separator } from "@/components/ui/separator";
import { UpdatePasswordForm } from "./update-password-form";
import { Switch } from "@/components/ui/switch";

interface EditUserFormProps {
  userId: string | undefined;
  initialData?: {
    username: string | undefined;
    imageUrl: string | undefined;
    imageName: string | undefined;
  };
}

type EditUserFormValues = z.infer<typeof SettingsSchema>;

export const EditUserForm = ({ userId, initialData }: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values, userId)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            console.log(data.error);
            toast.error("Não foi possível atualizar seu usuário!");
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            toast.success("Usuário atualizado!");
          }
        })
        .catch(() => setError("Algo deu errado!"));
    });
  };

  const onInvalid = (errors: any) => console.error(errors);

  const onDelete = () => {
    startTransition(() => {
      deleteUser(userId)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            toast.error("Não foi possível deletar seu usuário!");
          }

          if (data?.success) {
            logout();
          }
        })
        .catch(() => setError("Algo deu errado!"));
    });
  };

  const formatPostalCode = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Apply formatting
    return (
      digits.slice(0, 5) + (digits.length > 5 ? "-" + digits.slice(5, 8) : "")
    );
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Initialize an empty string for the formatted number
    let formattedNumber = "";

    // Apply conditional formatting based on the number of digits
    if (digits.length > 2) {
      formattedNumber += `(${digits.slice(0, 2)}) `;
    } else {
      formattedNumber += digits;
    }

    if (digits.length > 7) {
      formattedNumber += digits.slice(2, 7) + "-" + digits.slice(7, 11);
    } else if (digits.length > 2) {
      formattedNumber += digits.slice(2, 7);
    }

    return formattedNumber;
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <div className="grid gap-5 xl:grid-cols-2">
            <div className="space-y-5">
              <div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de Usuário</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem de Usuário</FormLabel>
                      <FormControl>
                        <UploadFile
                          endpoint="imageUploader"
                          isPending={isPending}
                          onChange={(url, name) => {
                            form.setValue("imageUrl", url);
                            form.setValue("imageName", name); // Set the imageName in the form
                          }}
                          onRemove={() => {
                            form.setValue("imageUrl", "");
                            form.setValue("imageName", "");
                          }}
                          initialData={initialData}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          placeholder="Ex: Rua Aleandro Stedile, nº 130"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                          onChange={(event) => {
                            const formattedPhoneNumber = formatPhoneNumber(
                              event.target.value
                            );
                            field.onChange(formattedPhoneNumber);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          className="w-80 bg-milky"
                          {...field}
                          onChange={(event) => {
                            const formattedPostalCode = formatPostalCode(
                              event.target.value
                            );
                            field.onChange(formattedPostalCode);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-x-3 space-y-0 py-5">
                    <FormLabel>Identificação por dois fatores</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-start mt-10">
            <Button type="submit" disabled={isPending}>
              Salvar Informações
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="my-10" />
      <UpdatePasswordForm />
      <Separator className="my-10" />
      <Button
        onClick={() => setOpen(true)}
        variant="destructive"
        disabled={isPending}
        className="flex gap-x-3 items-center justify-center w-full p-4 mt-4 text-milky xl:w-1/2 xl:mx-auto">
        <FaTrashAlt />
        <p>Deletar Conta</p>
      </Button>
    </>
  );
};
