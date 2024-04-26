import * as z from "zod";

export const SettingsSchema = z.object({
  username: z.optional(z.string().min(1)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  imageUrl: z.optional(z.string()),
  imageName: z.optional(z.string().min(1)),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
});

export const UpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, {
        message: "É necessário informar pelo menos 6 caracteres",
      })
      .optional(),
    newPassword: z.optional(
      z.string().min(6, {
        message: "É necessário informar pelo menos 6 caracteres",
      })
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(1, {
    message: "Informe sua senha",
  }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "É necessário informar um email",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Informe pelo menos 6 caracteres",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(6, {
    message: "São necessárias no mínimo 6 caracteres",
  }),
  name: z.string().min(1, {
    message: "É necessário informar um nome",
  }),
});

export const CreateStoreSchema = z.object({
  name: z.string().min(1, {
    message: "É necessário informar ao menos 1 letra",
  }),
});

export const CreateBillboardSchema = z.object({
  label: z.string().min(1, {
    message: "É necessário informar ao menos 1 letra",
  }),
  imageUrl: z.string().min(1, {
    message: "É necessário inserir uma imagem",
  }),
});

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: "É necessário informar ao menos 1 letra",
  }),
  billboardId: z.string().min(1, {
    message: "Selecione um banner",
  }),
});

export const ColorSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "Esse campo precisa ser um código hex",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, {
    message: "É necessário informar ao menos 1 letra",
  }),
  description: z.string().min(1, {
    message: "É necessário informar ao menos 1 letra",
  }),
  images: z.object({ url: z.string() }).array(),
  sizes: z
    .object({
      name: z.string().min(1, {
        message: "É necessário informar ao menos 1 caracter",
      }),
      value: z.string().min(1, {
        message: "É necessário informar ao menos 1 caracter",
      }),
      quantity: z.coerce.number().min(0, {
        message: "É necessário informar um número",
      }),
    })
    .array(),
  price: z.coerce.number().min(1, {
    message: "É necessário informar um número",
  }),
  categoryId: z.string().min(1, {
    message: "Selecione uma categoria",
  }),
  colorId: z.string().min(1, {
    message: "Seleciona uma cor",
  }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isNew: z.boolean().default(false).optional(),
});

export const SelectSizeSchema = z.object({
  sizes: z.string(),
});

export const ReviewSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: "Insira um comentário",
    })
    .max(300, {
      message: "Insira no máximo 300 caracteres",
    }),
  rating: z.number().max(5),
});
