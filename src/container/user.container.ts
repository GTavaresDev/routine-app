import { UserExampleRepository } from "@/repositories/user.example.repository";
import { UserExampleService } from "@/services/user.example.service";
import { CreateUserExampleUseCase } from "@/core/use-cases/create-user.example.use-case";
import { CreateUserExampleController } from "@/controllers/create-user.example.controller";

export function makeCreateUserExampleController(): CreateUserExampleController {
  const userRepository = new UserExampleRepository();
  const userService = new UserExampleService();
  const createUserUseCase = new CreateUserExampleUseCase(userRepository, userService);
  return new CreateUserExampleController(createUserUseCase);
}
