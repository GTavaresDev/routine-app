# routine-app

**routine-app** é uma base arquitetural limpa, modular e desacoplada para um futuro aplicativo de organização de rotina, compromissos e tarefas pessoais.

---

## 1. Nome e Descrição do Projeto

- **Nome**: `routine-app`
- **Descrição**: Aplicação desenvolvida para servir como fundamentação técnica para o cadastro e gerenciamento de atividades do dia a dia, rotinas, hábitos e lembretes.

---

## 2. Objetivo Atual da Aplicação

O objetivo nesta fase inicial é fornecer **exclusivamente a infraestrutura arquitetural**, padrões de código, configurações de ambiente, conteinerização e um fluxo estrutural de exemplo para gerenciamento de usuários. Não há telas de produto, formulários visuais ou regras de negócio de rotinas implementadas nesta etapa.

---

## 3. Tecnologias Utilizadas

- **Linguagem**: TypeScript 5
- **Framework**: Next.js 16 (App Router) & React 19
- **Persistência & ORM**: PostgreSQL & Prisma ORM (`@prisma/client`, `prisma`, `@prisma/adapter-pg`)
- **Conteinerização**: Docker & Docker Compose (PostgreSQL 16 Alpine)
- **Estilização & Design Tokens**: Tailwind CSS v4 & PostCSS
- **Componentes de UI**: Primitivos shadcn/ui (`button`, `card`, `input`, `badge`)
- **Validação**: Zod
- **Segurança**: `bcryptjs`
- **Testes**: Vitest
- **Qualidade de Código**: ESLint 9 & Prettier

---

## 4. Explicação da Arquitetura

O projeto adota os princípios de **Clean Architecture** e **Separation of Concerns**, dividido nas seguintes camadas:

1. **Presentation / Route (`src/routes/`, `src/app/api/`)**: Camada de entrada HTTP.
2. **Controller (`src/controllers/`)**: Recebe a requisição, valida os dados com schemas Zod e trata exceções.
3. **Use Case (`src/core/use-cases/`)**: Encapsula as regras da aplicação. Interage apenas através de abstrações (interfaces de repository e service).
4. **Service (`src/services/`)**: Executa operações auxiliares do domínio (ex: hash de senhas, normalização de e-mail).
5. **Repository (`src/repositories/`)**: Realiza persistência e consultas via Prisma Client.
6. **Container / Factory (`src/container/`)**: Responsável pela injeção de dependências.

---

## 5. Estrutura de Pastas

```text
routine-app/
├── .agents/
│   └── AGENTS.md                  # Instruções para agentes IA
├── __tests__/
│   └── create-user.example.test.ts # Teste estrutural do exemplo de usuário
├── prisma/
│   └── schema.prisma              # Modelo do banco (User e UserPermission)
├── ARCHITECTURE.md                # Guia detalhado de arquitetura e pastas
├── src/
│   ├── app/
│   │   ├── api/users/example/     # Endpoint HTTP Next.js
│   │   ├── globals.css            # Variáveis CSS e tokens de tema
│   │   ├── layout.tsx             # Root layout técnico
│   │   └── page.tsx               # Página técnica de confirmação
│   ├── components/ui/             # Primitivos shadcn/ui (Button, Card, Input, Badge)
│   ├── container/                 # Injeção de dependências / Factories
│   ├── controllers/               # Controladores de requisição
│   ├── core/
│   │   └── use-cases/             # Casos de uso da aplicação
│   ├── dtos/                      # Data Transfer Objects
│   ├── entities/                  # Interfaces de entidades de domínio
│   ├── errors/                    # Classes padronizadas de erro (AppError)
│   ├── lib/                       # Instanciação do Prisma e utilitários
│   ├── repositories/              # Camada de acesso a dados (Prisma)
│   ├── routes/                    # Manipuladores de rotas
│   ├── schemas/                   # Schemas de validação Zod
│   ├── services/                  # Serviços de domínio
│   └── types/                     # Definições globais de tipos
├── .env.example                   # Exemplo de variáveis de ambiente
├── components.json                # Configuração do shadcn/ui
├── docker-compose.yml             # Container PostgreSQL (routine-postgres)
├── eslint.config.mjs              # Regras do ESLint
├── next.config.ts                 # Configuração do Next.js
├── package.json                   # Dependências e scripts
├── postcss.config.mjs             # Configuração do PostCSS
├── tsconfig.json                  # Configuração do TypeScript (aliases @/*)
└── vitest.config.ts               # Configuração do Vitest
```

---

## 6. Requisitos para Executar o Projeto

- **Node.js**: v20+ ou v24+
- **npm**: 10+
- **Docker & Docker Compose**: (Opcional se utilizar banco de dados local PostgreSQL já instalado)

---

## 7. Configuração das Variáveis de Ambiente

Crie o arquivo `.env` a partir do `.env.example`:

```bash
cp .env.example .env
```

Conteúdo padrão do `.env`:

```env
DATABASE_URL="postgresql://routine_user:routine_pass@localhost:5433/routine_db?schema=public"
DIRECT_URL="postgresql://routine_user:routine_pass@localhost:5433/routine_db?schema=public"
NODE_ENV="development"
PORT=3000
```

---

## 8. Execução Com e Sem Docker

### Opção A: Com Docker (Recomendado)

1. Inicie o container PostgreSQL:
   ```bash
   npm run db:local:up
   ```
2. Instale as dependências e gere o cliente do Prisma:
   ```bash
   npm install
   ```
3. Execute as migrations:
   ```bash
   npm run db:migrate
   ```
4. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

### Opção B: Sem Docker

1. Configure uma instância do PostgreSQL local com o banco `routine_db`, usuário `routine_user` e senha `routine_pass` na porta desejada.
2. Atualize o `DATABASE_URL` no `.env`.
3. Execute:
   ```bash
   npm install
   npm run db:migrate
   npm run dev
   ```

---

## 9. Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Next.js |
| `npm run build` | Compila o projeto e gera a build de produção |
| `npm run start` ou `npm start` | Sobe o banco via Docker (`db:local:up`), abre o Prisma Studio (`http://localhost:5555`) e o servidor Next.js (`http://localhost:3000`) simultaneamente |
| `npm run lint` | Executa a verificação estática do ESLint |
| `npm run typecheck` | Executa a verificação de tipos do TypeScript (`tsc --noEmit`) |
| `npm run test` | Executa a suíte de testes com Vitest |
| `npm run db:migrate` | Executa migrations do Prisma em ambiente de desenvolvimento |
| `npm run db:deploy` | Executa migrations pendentes em ambiente de produção |
| `npm run db:studio` | Abre a interface gráfica do Prisma Studio |
| `npm run db:local:up` | Sobe o banco PostgreSQL no Docker |
| `npm run db:local:down` | Derruba o container do banco no Docker |

---

## 10. Configuração do Banco de Dados

O banco de dados é configurado via Prisma ORM em `prisma/schema.prisma`. As tabelas iniciais representam a estrutura de usuários (`user` e `user_permission`), prontas para suportar autenticação e autorização.

---

## 11. Execução de Migrations

Para criar uma nova migration após alterar o schema:

```bash
npm run db:migrate -- --name nome_da_migration
```

Para aplicar migrations em um ambiente novo:

```bash
npm run db:deploy
```

> **Nota**: As migrations do `routine-app` pertencem exclusivamente a este projeto e não devem ser executadas nos bancos de outros projetos.

---

## 12. Explicação do Fluxo de Criação de Usuário de Exemplo

O fluxo de exemplo demonstra a jornada completa de uma requisição HTTP:

1. **Requisição HTTP**: Chega em `POST /api/users/example` (mapeada em `src/app/api/users/example/route.ts`).
2. **Encaminhamento da Rota**: `src/routes/create-user.example.route.ts` invoca a factory `makeCreateUserExampleController()`.
3. **Validação no Controller**: `CreateUserExampleController` valida o payload com `createUserExampleSchema` (Zod).
4. **Execução do Caso de Uso**: `CreateUserExampleUseCase` verifica a existência prévia do e-mail via `UserExampleRepository`, gera a hash da senha com `UserExampleService` e solicita a criação.
5. **Persistência**: `UserExampleRepository` cria o registro no PostgreSQL via Prisma.
6. **Resposta e Trata Erros**: Resposta padronizada em JSON com código HTTP apropriado (201 para sucesso, 422 para validação, 409 para conflito, 500 para erro interno).

---

## 13. Orientação para Criação de Novos Módulos

Para criar novos módulos (ex: Tarefas, Rotinas, Hábitos):

1. Crie a entidade de banco em `prisma/schema.prisma` (ex: `model Task`).
2. Crie a interface da entidade em `src/entities/task.entity.ts`.
3. Crie os DTOs em `src/dtos/create-task.dto.ts`.
4. Crie o schema Zod em `src/schemas/create-task.schema.ts`.
5. Crie a interface e repositório em `src/repositories/task.repository.ts`.
6. Crie o caso de uso em `src/core/use-cases/create-task.use-case.ts`.
7. Crie o controlador em `src/controllers/create-task.controller.ts`.
8. Adicione a factory no container `src/container/task.container.ts`.
9. Exponha a rota em `src/routes/create-task.route.ts` e `src/app/api/tasks/route.ts`.
10. Escreva testes em `__tests__/create-task.test.ts`.

---

## 14. Convenções de Nomenclatura

- **Arquivos funcionais**: Sufixos explícitos (`*.route.ts`, `*.controller.ts`, `*.use-case.ts`, `*.repository.ts`, `*.service.ts`, `*.schema.ts`, `*.dto.ts`).
- **Arquivos de exemplo**: Utilizam a marcação `.example.` no nome (ex: `create-user.example.use-case.ts`).
- **Imports**: Sempre utilzem a sintaxe com `@/` (ex: `@/repositories/user.example.repository`).

---

## 15. Limitações Atuais

- Não inclui telas ou componentes de interface gráfica do produto final.
- Não contém CRUDs de Tarefas, Rotinas, Hábitos ou Lembretes.
- O banco de dados contém apenas as tabelas `user` e `user_permission`.

---

## 16. Próximos Passos Sugeridos

1. Implementar autenticação via JWT / NextAuth.
2. Criar os modelos de dados no Prisma para `Task`, `Routine` e `Habit`.
3. Criar os casos de uso para CRUD de tarefas.
4. Desenvolver componentes visuais e telas no frontend.

---

## 17. Independência do Projeto

O `routine-app` foi criado em seu próprio diretório raiz (`/Users/gabrieltavares/workspace/routine-app`), possuindo seu próprio `package.json`, repositório de versão, `.env`, container Docker e dependências.

---

## 18. Confirmação de Isolamento de Referência

Este projeto **não possui dependências**, imports, caminhos relativos ou vínculos de tempo de execução com nenhum outro projeto local (incluindo o projeto de referência `visionew`). Ele pode ser movido, executado ou implantado de forma totalmente autônoma.
