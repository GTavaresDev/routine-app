Onde colocar cada arquivo (A Origem do Pedido até o Final)
Abaixo está o papel prático, refinado e estruturado de cada pasta na ordem exata em que uma requisição acontece dentro da aplicação:

1. Entrada da Requisição (A Galeria do Next.js)
   • src/app/api/ • O que faz: Porta de entrada pública acessada pela URL HTTP. • Papel: Mapeia os métodos HTTP (GET, POST, PUT, DELETE) no Next.js App Router e apenas repassa o objeto de requisição para a camada de rotas.
   • src/routes/ • O que faz: Gerenciador da rota desacoplado da API do Next.js. • Papel: Recebe a requisição, chama a fábrica em container/ para instanciar o controlador necessário e retorna a resposta formatada em JSON (NextResponse).
2. Monotrilho de Instanciação (Injeção de Dependências)
   • src/container/ • O que faz: Fábrica de injeção de dependências (Factory). • Papel: Monta e conecta as peças na ordem correta antes da execução (conecta Repository + Service \rightarrow entrega para o UseCase \rightarrow entrega para o Controller).
3. Validação e Entrada de Dados
   • src/controllers/ • O que faz: Receptor e formatador de entrada/saída HTTP. • Papel: Executa a validação Zod no payload da requisição, chama o UseCase correspondente e define o status HTTP da resposta (ex: 200 OK, 201 Created, 422 Unprocessable Entity).
   • src/schemas/ • O que faz: Regras de validação de esquemas de dados com Zod. • Papel: Garante a estrutura estrita dos dados que chegam via HTTP (ex: tamanho mínimo de senha, formato de e-mail).
   • src/dtos/ • O que faz: Data Transfer Objects (Objetos de Transferência de Dados). • Papel: Tipagens TypeScript puras que definem os contratos de entrada e saída de dados entre as diferentes camadas da aplicação.
   • src/errors/ • O que faz: Tratamento de exceções customizadas da aplicação. • Papel: Classes de erro padronizadas (ex: ValidationError, ConflictError, NotFoundError) para capturar falhas conhecidas de forma limpa.
4. Regra de Negócio (O Coração do Projeto)
   • src/core/use-cases/ • O que faz: Orquestrador das regras de negócio principais. • Papel: Contém a lógica isolada da aplicação (ex: proibir e-mails duplicados, validar limite de tarefas). Não possui dependência com HTTP nem com bancos de dados específicos.
   • src/entities/ • O que faz: Representação pura das entidades de domínio. • Papel: Define os modelos e tipos TypeScript fundamentais do seu sistema (ex: a entidade pura de um User ou Task).
   • src/services/ • O que faz: Utilitários e serviços de apoio ao domínio. • Papel: Isola operações específicas ou integrações (ex: encriptação de senhas com bcryptjs, envio de e-mails, normalização de dados).
5. Persistência de Dados e Recursos Globais
   • src/repositories/ • O que faz: Acesso direto à camada de dados. • Papel: Contém as interfaces (IUserRepository) e as implementações concretas (UserRepository) que realizam as operações no banco de dados via Prisma Client.
   • src/lib/ • O que faz: Configurações de infraestrutura e bibliotecas globais. • Papel: Inicialização do cliente do Prisma (prisma.ts), utilitários de estilo visual (cn), entre outros.
   • src/components/ui/ • O que faz: Componentes de interface do usuário (Design System). • Papel: Componentes genéricos e reutilizáveis de UI (ex: Button, Card, Input, Badge do shadcn/ui).
