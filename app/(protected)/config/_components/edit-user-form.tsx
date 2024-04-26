"use client";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

interface EditUserFormProps {
  initialData?: {
    username: string | undefined;
    imageUrl: string | undefined;
    imageName: string | undefined;
  };
}

type EditUserFormValues = z.infer<typeof SettingsSchema>;

export const EditUserForm = ({ initialData }: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();
  const userId = user?.id as string;

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: initialData || {
      username: "",
      imageUrl: "",
      imageName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values, userId)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
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

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <Form {...form}>
        <div>
          <div className="flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className="hidden md:flex items-center gap-x-3 my-8 mr-20 p-4 border border-black rounded-md group hover:cursor-pointer">
              <FaTrashAlt className="text-red-500" />
              <div className="group-hover:text-red-500">Deletar conta</div>
            </div>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="md:max-w-[900px] md:mx-auto bg-gray-100 p-2 md:p-4 md:rounded-sm">
            <div className="md:flex">
              <div className="w-full">
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem de Usuário</FormLabel>
                      <FormControl>
                        <UploadFile
                          endpoint="imageUploader"
                          onChange={(url, name) => {
                            form.setValue("imageUrl", url);
                            form.setValue("imageName", name); // Set the imageName in the form
                          }}
                          onRemove={() => field.onChange("")}
                          initialData={initialData}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex md:justify-end mt-10">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-auto">
                Salvar
              </Button>
            </div>
            <div className="flex md:hidden mt-20 mb-8 items-center justify-center gap-x-3 p-4 border border-black rounded-md group hover:cursor-pointer">
              <FaTrashAlt className="text-red-500" />
              <Button
                onClick={() => setOpen(true)}
                className="group-hover:text-red-500">
                Deletar conta
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
};
