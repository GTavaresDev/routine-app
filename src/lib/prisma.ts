import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
  var prismaConnectionString: string | undefined;
}

export function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL;
}

export function hasDatabaseConfig(): boolean {
  return Boolean(getConnectionString());
}

function createAdapter() {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      "Database credentials are not configured. Set DATABASE_URL in environment variables.",
    );
  }

  return new PrismaPg(new Pool({ connectionString }));
}

export function getPrisma(): PrismaClient {
  const connectionString = getConnectionString();

  if (!connectionString) {
    throw new Error(
      "Database credentials are not configured. Set DATABASE_URL in environment variables.",
    );
  }

  if (
    globalThis.prisma &&
    globalThis.prismaConnectionString === connectionString
  ) {
    return globalThis.prisma;
  }

  if (globalThis.prisma) {
    void globalThis.prisma.$disconnect();
  }

  const prismaClient = new PrismaClient({
    adapter: createAdapter(),
    errorFormat: "pretty",
  });

  globalThis.prisma = prismaClient;
  globalThis.prismaConnectionString = connectionString;

  return prismaClient;
}

export default getPrisma;
