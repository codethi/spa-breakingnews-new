import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});
