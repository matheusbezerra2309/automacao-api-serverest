# automacao-api-serverest
# Cypress E2E Tests – ServeRest API

Projeto para automatizados da API em uma Prova técnica
 **ServeRest**[](https://serverest.dev) usando **Cypress 14+** 

Todos os testes, tratamento dos dados utilizados e integração com CI/CD.

### O que esse projeto cobre
- Login (sucesso e falha)
- CRUD completo de `/usuarios`
- Validação de todos os cenários negativos (400, 401, e-mail duplicado, ID inexistente, etc.)
- Geração automática de e-mail único
- Relatórios Mochawesome HTML + JSON
- Pipeline GitHub Actions com execução paralela e cache

### Estrutura do projeto

├── cypress/                  
│   ├── e2e/  # arquivos de teste  
│   ├── fixtures/  # dados a serem utilizados  
│   └── support/  
├── cypress.config.js  
├── package.json  
├── .gitignore  
└── README.md  


### Como rodar localmente
```bash
# 1. Clone o repositório
git clone https://github.com/matheusbezerra2309/automacao-api-serverest.git

# 2. Instale as dependências
npm ci

# 4. Rode todos os testes em modo headless
npx cypress run

### Cenários de teste implementados

| #  | Cenário                                                                 | Descrição                                                                                           |
|----|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------        |
| 1  | Realizar login com sucesso e retornar token                             | Valida login com credenciais corretas do admin fixo e extrai o token Bearer para uso futuro         |
| 2  | Verificar mensagem de erro ao incluir credenciais incorretas            | Tenta login com senha errada e verifica status 401 + mensagem "Email e/ou senha inválidos"          |
| 3  | Buscar usuário usando todos os query params                             | Faz GET /usuarios com múltiplos filtros (_id, nome, email, etc.) e valida retorno filtrado          |
| 4  | Cadastro usando fixture Admin e Não-Admin                               | Cadastra usuários a partir de fixture com e-mail único (timestamp/random) e valida status 201       |
| 5  | Deve retornar os dados corretos                                         | Busca usuário por ID conhecido e  e valida todos os campos do admin fixo                            |
| 6  | Deve retornar 400 ao buscar ID com formato errado                       | Tenta GET com ID inválido (ex: "abc") e confirma erro 400 + mensagem "Usuário não encontrado"       |
| 7  | Deve atualizar nome, email e senha do admin fixo com sucesso            | Executa PUT no admin fixo alterando dados e confirma status 200 + "Registro alterado"               |
| 8  | Tentar atualizar com email duplicado                                    | Tenta PUT usando e-mail já existente na base e valida status 400 + "Este email já está sendo usado" |
| 9  | DELETE com sucesso (cadastrados no teste anterior)                      | Remove usuário criado no Cenário 4 usando o _id salvo e confirma status 200 + "excluído"            |
| 10 | DELETE em ID que não existe → 200 + "Nada foi excluído"                 | Tenta excluir ID inexistente e valida resposta esperada da ServeRest (200 + mensagem correta)       |

### CI/CD (Integração Contínua/Entrega Contínua)


É executado de duas formas:
Automático
→ Todo push ou pull request → roda sozinho
Manual
→ Vai em:
https://github.com/matheusbezerra2309/automacao-api-serverest/actions
→ Clica em "Cypress Tests" na esquerda
→ Clica no botão azul "Run workflow"
→ Escolhe a branch (normalmente main) → Run workflow
