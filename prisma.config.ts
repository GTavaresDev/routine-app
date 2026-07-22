import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "postgresql://routine_user:routine_pass@localhost:5433/routine_db?schema=public",
  },
});
