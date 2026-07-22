# Architectural and Clean Code Guidelines - routine-app

All AI agents working on the `routine-app` repository must strictly adhere to the rules and principles defined in this document.

## 1. Clean Architecture & Isolation Principles

- **Strict Layer Separation**:
  - **Routes / Presentation (`src/app/api/`, `src/routes/`)**: Receives HTTP request, extracts payload, delegates to controller, returns HTTP response (`NextResponse`).
  - **Controllers (`src/controllers/`)**: Validates input schema using Zod, handles application exceptions (`AppError`), formats API output response.
  - **Use Cases (`src/core/use-cases/`)**: Orchestrates business rules, interacts exclusively through Repository interfaces (`I*Repository`) and Service interfaces (`I*Service`).
  - **Services (`src/services/`)**: Enforces domain helpers, encryption (e.g. bcrypt), external service calls, string normalization.
  - **Repositories (`src/repositories/`)**: Encapsulates Prisma database queries. Direct database access outside repositories is strictly forbidden.
  - **Entities / DTOs (`src/entities/`, `src/dtos/`, `src/schemas/`)**: Type definitions, Zod validation schemas, data transfer structures.
  - **Dependency Injection Container (`src/container/`)**: Assembles instances and injects dependencies via factory functions (e.g. `makeCreateUserExampleController`).

- **Forbidden Dependencies & Operations**:
  - **DO NOT** import any file or path from external local repositories (such as `visionew` or relative paths starting with `../`). `routine-app` must remain completely self-contained.
  - **DO NOT** write business logic inside Controllers, Routes, or React Components.
  - **DO NOT** access `prisma` or database clients directly inside Use Cases, Services, Controllers, or UI files. Always use Repository abstractions.
  - **DO NOT** create product screens, dashboards, forms, or visual UI components unless explicitly requested by the user.

## 2. Code Reuse & Naming Conventions

- **Aliases**: Always use the configured `@/*` alias pointing to `src/*`. Relative imports crossing multiple parent folders (e.g. `../../..`) are disallowed.
- **Example Module as Reference**: Use `create-user.example.*` files as the gold standard reference for structuring future modules (Tasks, Routines, Habits).
- **Entity Primary Keys**: Persisted domain entities must use numeric `id` (`Int` autoincrement in Prisma, `number` in TypeScript).
- **Suffixed Extensions**:
  - Route handlers: `*.route.ts`
  - Controllers: `*.controller.ts`
  - Use cases: `*.use-case.ts`
  - Repositories: `*.repository.ts`
  - Services: `*.service.ts`
  - Validation schemas: `*.schema.ts`
  - DTOs: `*.dto.ts`

## 3. UI & Design System Guidance (When UI is requested)

- **shadcn/ui Standard**: Use semantic CSS tokens (`--bg-cards`, `--border-bordas`, `--text-texto-principal`, `--text-texto-secundario`) defined in `src/app/globals.css`.
- **Primitives Location**: Keep shared atomic primitives inside `src/components/ui/`.

## 4. Development Workflow & Verification

When implementing new modules:
1. Define Prisma Schema models in `prisma/schema.prisma`.
2. Create Entity and DTO interfaces (`src/entities/`, `src/dtos/`).
3. Define Zod validation schema (`src/schemas/`).
4. Implement Repository interface and class (`src/repositories/`).
5. Implement Service if domain helpers or hashing is needed (`src/services/`).
6. Implement Use Case (`src/core/use-cases/`).
7. Implement Controller (`src/controllers/`).
8. Create DI factory in container (`src/container/`).
9. Expose Route endpoint (`src/routes/`, `src/app/api/`).
10. Write structural tests (`__tests__/`).
