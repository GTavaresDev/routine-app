import { z } from "zod";

export const createUserExampleSchema = z.object({
  name: z.string().min(2, "Nome deve possuir ao menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  level: z.number().int().min(1).max(3).default(3),
  active: z.boolean().default(true),
});

export type CreateUserExampleSchemaInput = z.infer<typeof createUserExampleSchema>;
