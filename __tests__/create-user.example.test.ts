import { describe, it, expect, vi } from "vitest";
import { CreateUserExampleUseCase } from "@/core/use-cases/create-user.example.use-case";
import { CreateUserExampleController } from "@/controllers/create-user.example.controller";
import type { IUserExampleRepository } from "@/repositories/user.example.repository";
import type { IUserExampleService } from "@/services/user.example.service";
import type { UserExampleEntity } from "@/entities/user.example.entity";
import { ConflictError } from "@/errors/app-error";

describe("CreateUserExample Structural Architecture Tests", () => {
  const mockRepository: IUserExampleRepository = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  };

  const mockService: IUserExampleService = {
    normalizeEmail: (email) => email.trim().toLowerCase(),
    hashPassword: async (pwd) => `hashed_${pwd}`,
  };

  it("should create user successfully through use case", async () => {
    vi.mocked(mockRepository.findByEmail).mockResolvedValueOnce(null);
    vi.mocked(mockRepository.create).mockImplementationOnce(async (data) => ({
      id: 1,
      name: data.name,
      email: data.email,
      active: data.active,
      permissionLevel: data.level,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const useCase = new CreateUserExampleUseCase(mockRepository, mockService);
    const result = await useCase.execute({
      name: "Usuário Exemplo",
      email: "EXEMPLO@routine.com",
      password: "password123",
      level: 2,
      active: true,
    });

    expect(result.id).toBe(1);
    expect(result.email).toBe("exemplo@routine.com");
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        passwordHash: "hashed_password123",
      }),
    );
  });

  it("should throw ConflictError when email already exists", async () => {
    const existingUser: UserExampleEntity = {
      id: 1,
      name: "Existing",
      email: "exemplo@routine.com",
      active: true,
      permissionLevel: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockRepository.findByEmail).mockResolvedValueOnce(existingUser);

    const useCase = new CreateUserExampleUseCase(mockRepository, mockService);

    await expect(
      useCase.execute({
        name: "Duplicado",
        email: "exemplo@routine.com",
        level: 3,
        active: true,
      }),
    ).rejects.toThrow(ConflictError);
  });

  it("should validate body and return 422 in controller on invalid payload", async () => {
    const useCase = new CreateUserExampleUseCase(mockRepository, mockService);
    const controller = new CreateUserExampleController(useCase);

    const result = await controller.handle({
      email: "invalid-email",
    });

    expect(result.success).toBe(false);
    expect(result.statusCode).toBe(422);
  });
});
