import { getPrisma } from "@/lib/prisma";
import type { UserExampleEntity } from "@/entities/user.example.entity";

export interface CreateUserRepositoryInput {
  name: string;
  email: string;
  active: boolean;
  passwordHash?: string | null;
  level: number;
}

export interface IUserExampleRepository {
  findByEmail(email: string): Promise<UserExampleEntity | null>;
  create(data: CreateUserRepositoryInput): Promise<UserExampleEntity>;
}

export class UserExampleRepository implements IUserExampleRepository {
  async findByEmail(email: string): Promise<UserExampleEntity | null> {
    const db = getPrisma();
    const user = await db.user.findUnique({
      where: { email },
      include: { permission: true },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      permissionLevel: user.permission?.level ?? 3,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(data: CreateUserRepositoryInput): Promise<UserExampleEntity> {
    const db = getPrisma();
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        active: data.active,
        passwordHash: data.passwordHash ?? null,
        permission: {
          create: {
            level: data.level,
          },
        },
      },
      include: {
        permission: true,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      permissionLevel: user.permission?.level ?? data.level,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
