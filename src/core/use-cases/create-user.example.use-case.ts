import type { CreateUserExampleDTO, CreateUserExampleResponseDTO } from "@/dtos/create-user.example.dto";
import type { IUserExampleRepository } from "@/repositories/user.example.repository";
import type { IUserExampleService } from "@/services/user.example.service";
import { ConflictError } from "@/errors/app-error";

export class CreateUserExampleUseCase {
  constructor(
    private readonly userRepository: IUserExampleRepository,
    private readonly userService: IUserExampleService,
  ) {}

  async execute(dto: CreateUserExampleDTO): Promise<CreateUserExampleResponseDTO> {
    const normalizedEmail = this.userService.normalizeEmail(dto.email);

    const existingUser = await this.userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      throw new ConflictError("Já existe um usuário cadastrado com este e-mail.");
    }

    let passwordHash: string | undefined = undefined;
    if (dto.password) {
      passwordHash = await this.userService.hashPassword(dto.password);
    }

    const createdUser = await this.userRepository.create({
      name: dto.name,
      email: normalizedEmail,
      active: dto.active,
      level: dto.level,
      passwordHash,
    });

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      active: createdUser.active,
      permissionLevel: createdUser.permissionLevel,
      createdAt: createdUser.createdAt.toISOString(),
    };
  }
}
