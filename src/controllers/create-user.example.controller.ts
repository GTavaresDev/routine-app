import { createUserExampleSchema } from "@/schemas/create-user.example.schema";
import type { CreateUserExampleUseCase } from "@/core/use-cases/create-user.example.use-case";
import { AppError, ValidationError } from "@/errors/app-error";

export class CreateUserExampleController {
  constructor(private readonly createUserUseCase: CreateUserExampleUseCase) {}

  async handle(body: unknown) {
    try {
      const parseResult = createUserExampleSchema.safeParse(body);
      if (!parseResult.success) {
        throw new ValidationError(
          "Dados inválidos para criação de usuário.",
          parseResult.error.flatten(),
        );
      }

      const result = await this.createUserUseCase.execute(parseResult.data);

      return {
        success: true,
        statusCode: 201,
        data: result,
      };
    } catch (error) {
      if (error instanceof AppError) {
        return {
          success: false,
          statusCode: error.statusCode,
          error: {
            message: error.message,
            details: error.details,
          },
        };
      }

      return {
        success: false,
        statusCode: 500,
        error: {
          message: "Erro interno no servidor ao criar usuário.",
        },
      };
    }
  }
}
