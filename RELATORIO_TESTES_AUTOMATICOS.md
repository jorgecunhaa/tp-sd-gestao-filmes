# 10.2 Testes Automáticos

## Framework Utilizado

O projeto utiliza o **Mocha** como framework de testes principal. O Mocha é uma framework de testes JavaScript robusta e flexível que permite a execução de testes assíncronos e fornece uma estrutura clara para organizar e executar suites de testes.

### Dependências de Teste

As seguintes bibliotecas são utilizadas em conjunto com o Mocha:

- **Mocha** (v10.2.0): Framework de testes principal
- **Chai** (v4.3.10): Biblioteca de asserções BDD/TDD
- **chai-http** (v4.4.0): Plugin do Chai para testes HTTP
- **supertest** (v6.3.3): Biblioteca para testes de APIs HTTP

### Configuração

Os testes são configurados através do ficheiro `test/setup.js`, que define:
- Ambiente de teste (`NODE_ENV=test`)
- Configurações de base de dados de teste
- Variáveis de ambiente específicas para testes (JWT_SECRET, etc.)

Os testes podem ser executados através dos seguintes comandos:
```bash
npm test          # Executa todos os testes
npm run test:watch # Executa testes em modo watch
```

## Tipos de Testes Implementados

O projeto implementa **testes de integração** que verificam o comportamento completo dos endpoints da API, incluindo:

### 1. Testes de Autenticação (`test/auth.test.js`)

Testa o endpoint de autenticação e login:

- **Login com credenciais válidas**: Verifica que o sistema retorna um token JWT e informações do utilizador quando as credenciais são corretas
- **Login com credenciais inválidas**: Verifica que o sistema retorna erro 401 quando a password está incorreta
- **Login com email inválido**: Verifica que o sistema retorna erro 400 quando o formato do email é inválido

**Endpoint testado:**
- `POST /api/auth/login`

### 2. Testes de Filmes (`test/movies.test.js`)

Testa os endpoints relacionados com a gestão de filmes:

- **Criação de filme**: Verifica que um filme pode ser criado com sucesso quando autenticado e com dados válidos
- **Criação sem autenticação**: Verifica que o sistema retorna erro 401 quando não há token de autenticação
- **Criação com dados inválidos**: Verifica que o sistema retorna erro 400 quando os dados fornecidos são inválidos
- **Listagem de filmes**: Verifica que todos os filmes podem ser obtidos com sucesso
- **Obter filme por ID**: Verifica que um filme específico pode ser obtido pelo seu ID
- **Filme inexistente**: Verifica que o sistema retorna erro 404 quando o filme não existe

**Endpoints testados:**
- `POST /api/movies` (criar filme)
- `GET /api/movies` (listar todos os filmes)
- `GET /api/movies/:id` (obter filme por ID)

### 3. Testes de Avaliações (`test/evaluations.test.js`)

Testa os endpoints relacionados com avaliações de filmes:

- **Criação de avaliação**: Verifica que uma avaliação pode ser criada para um filme com sucesso
- **Avaliação duplicada**: Verifica que o sistema retorna erro 409 quando um utilizador tenta criar uma segunda avaliação para o mesmo filme
- **Rating inválido**: Verifica que o sistema retorna erro 400 quando o rating está fora do intervalo válido (1-10)
- **Listagem de avaliações**: Verifica que todas as avaliações de um filme podem ser obtidas

**Endpoints testados:**
- `POST /api/movies/:id/evaluations` (criar avaliação para um filme)
- `GET /api/movies/:id/evaluations` (listar avaliações de um filme)

## Cobertura Básica dos Endpoints

### Endpoints Cobertos por Testes

| Endpoint | Método | Cobertura | Ficheiro de Teste |
|----------|--------|-----------|-------------------|
| `/api/auth/login` | POST | ✅ Completa | `auth.test.js` |
| `/api/movies` | POST | ✅ Completa | `movies.test.js` |
| `/api/movies` | GET | ✅ Completa | `movies.test.js` |
| `/api/movies/:id` | GET | ✅ Completa | `movies.test.js` |
| `/api/movies/:id/evaluations` | POST | ✅ Completa | `evaluations.test.js` |
| `/api/movies/:id/evaluations` | GET | ✅ Completa | `evaluations.test.js` |

### Endpoints Parcialmente Cobertos ou Não Cobertos

| Endpoint | Método | Estado | Observações |
|----------|--------|--------|-------------|
| `/api/movies/:id` | PUT | ❌ Não coberto | Atualização de filmes |
| `/api/movies/:id` | DELETE | ❌ Não coberto | Eliminação de filmes |
| `/api/users` | GET | ❌ Não coberto | Listagem de utilizadores |
| `/api/users/:id` | GET | ❌ Não coberto | Obter utilizador por ID |
| `/api/users` | POST | ❌ Não coberto | Criação de utilizadores |
| `/api/users/:id` | PUT | ❌ Não coberto | Atualização de utilizadores |
| `/api/users/:id` | DELETE | ❌ Não coberto | Eliminação de utilizadores |
| `/api/evaluations` | GET | ❌ Não coberto | Listagem de todas as avaliações |
| `/api/evaluations/:id` | GET | ❌ Não coberto | Obter avaliação por ID |
| `/api/evaluations/:id` | PUT | ❌ Não coberto | Atualização de avaliações |
| `/api/evaluations/:id` | DELETE | ❌ Não coberto | Eliminação de avaliações |
| `/api/movies/:id/evaluations/:evaluationId` | GET | ❌ Não coberto | Obter avaliação específica |
| `/api/movies/:id/evaluations/:evaluationId` | PUT | ❌ Não coberto | Atualizar avaliação específica |
| `/api/movies/:id/evaluations/:evaluationId` | DELETE | ❌ Não coberto | Eliminar avaliação específica |

### Resumo da Cobertura

- **Total de endpoints**: 20 endpoints
- **Endpoints cobertos**: 6 endpoints (30%)
- **Endpoints não cobertos**: 14 endpoints (70%)

### Cenários de Teste Implementados

Os testes implementados cobrem os seguintes cenários:

1. **Cenários de sucesso**: Operações que devem funcionar corretamente com dados válidos
2. **Cenários de autenticação**: Verificação de que endpoints protegidos requerem autenticação
3. **Cenários de validação**: Verificação de validação de dados de entrada
4. **Cenários de erro**: Tratamento de erros (404, 400, 401, 409)

### Estrutura dos Testes

Os testes seguem uma estrutura organizada:

- **Hooks `before` e `after`**: Preparação e limpeza de dados de teste
- **Agrupamento por funcionalidade**: Testes organizados por módulo (auth, movies, evaluations)
- **Testes isolados**: Cada teste é independente e pode ser executado isoladamente
- **Limpeza de dados**: Dados de teste são removidos após cada suite de testes

### Observações

A cobertura atual de testes foca-se nos endpoints mais críticos e frequentemente utilizados:
- Autenticação (essencial para o funcionamento da API)
- Operações básicas de filmes (criação, listagem, consulta)
- Operações básicas de avaliações (criação, listagem)

Os endpoints de gestão de utilizadores e operações de atualização/eliminação não estão cobertos por testes automáticos, mas podem ser testados manualmente através da documentação Swagger disponível na API.

