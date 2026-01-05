# API Gestão de Filmes

API REST para gestão de catálogo de filmes com sistema de avaliações e comentários.

**Trabalho Prático - Sistemas Distribuídos 2025/2026**

**Autores:**
- Nuno Carneiro (nº 34106)
- Jorge Cunha (nº 34128)

## 📋 Descrição

Esta API permite a gestão de um catálogo de filmes onde utilizadores registados podem:
- Consultar, adicionar, editar e remover filmes
- Avaliar e comentar filmes
- Gerir utilizadores (apenas Admin)

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **Express.js** - Framework web
- **PostgreSQL** - Base de dados relacional
- **Knex.js** - Migrations e query builder
- **Sequelize** - ORM para modelação de dados
- **JWT (jsonwebtoken)** - Autenticação
- **Swagger UI** - Documentação e testes da API
- **Mocha + Chai** - Testes automatizados
- **Docker** - Containerização
- **UUID** - Identificadores únicos

## 📦 Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL (v15 ou superior)
- Docker e Docker Compose (opcional)

### Instalação Local

1. **Clonar o repositório**
```bash
git clone <repository-url>
cd TP_SD
```

2. **Instalar dependências**
```bash
npm install
```

3. **Configurar variáveis de ambiente**
```bash
# Copiar ficheiro de exemplo
cp .env.example .env

# Editar .env com as suas configurações
```

4. **Criar base de dados PostgreSQL**
```bash
createdb gestao_filmes
```

5. **Executar migrations**
```bash
npm run migrate:latest
```

6. **Executar seeds (dados de exemplo)**
```bash
npm run seed:run
```

7. **Iniciar servidor**
```bash
npm start
# ou para desenvolvimento com auto-reload
npm run dev
```

A API estará disponível em `http://localhost:3000`

### Instalação com Docker

1. **Executar com Docker Compose**
```bash
docker-compose up --build
```

Isto irá:
- Criar e iniciar o container PostgreSQL
- Executar as migrations automaticamente
- Executar os seeds
- Iniciar a API

A API estará disponível em `http://localhost:3000`

## 📚 Documentação Swagger

Após iniciar o servidor, a documentação Swagger está disponível em:

**http://localhost:3000/api-docs**

Aqui pode:
- Ver todos os endpoints disponíveis
- Testar a API diretamente
- Ver exemplos de requests e responses
- Autenticar-se usando o token JWT

## 🔐 Autenticação

A API utiliza autenticação JWT. Para aceder aos endpoints protegidos:

1. **Fazer login**
```bash
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

2. **Usar o token retornado**
```bash
Authorization: Bearer <token>
```

### Utilizadores de Teste (após seed)

- **Admin**: `admin@example.com` / `admin123`
- **Edit**: `edit@example.com` / `edit123`
- **View**: `view@example.com` / `view123`

## 🔑 Níveis de Permissão

- **View**: Pode visualizar filmes e avaliações
- **Edit**: Pode visualizar, criar, editar e eliminar filmes. Pode criar e gerir as suas próprias avaliações
- **Admin**: Todas as permissões de Edit + gestão completa de utilizadores

## 📡 Endpoints Principais

### Autenticação
- ` ` - Login

### Utilizadores (Admin apenas)
- `GET /api/users` - Listar utilizadores
- `GET /api/users/:id` - Obter utilizador
- `POST /api/users` - Criar utilizador
- `PUT /api/users/:id` - Atualizar utilizador
- `DELETE /api/users/:id` - Eliminar utilizador

### Filmes
- `GET /api/movies` - Listar filmes (com filtros: ?genre=, ?year=, ?search=)
- `GET /api/movies/:id` - Obter filme
- `POST /api/movies` - Criar filme (Edit/Admin)
- `PUT /api/movies/:id` - Atualizar filme (Edit/Admin)
- `DELETE /api/movies/:id` - Eliminar filme (Edit/Admin)

### Avaliações
- `GET /api/evaluations` - Listar todas as avaliações
- `GET /api/evaluations/:id` - Obter avaliação
- `POST /api/evaluations` - Criar avaliação
- `PUT /api/evaluations/:id` - Atualizar avaliação (dono ou Admin)
- `DELETE /api/evaluations/:id` - Eliminar avaliação (dono ou Admin)

### Relações Filme-Avaliação
- `GET /api/movies/:id/evaluations` - Avaliações de um filme
- `POST /api/movies/:id/evaluations` - Criar avaliação para um filme
- `GET /api/movies/:id/evaluations/:evaluationId` - Obter avaliação específica
- `PUT /api/movies/:id/evaluations/:evaluationId` - Atualizar avaliação
- `DELETE /api/movies/:id/evaluations/:evaluationId` - Eliminar avaliação

## 🧪 Testes

### Executar testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

Os testes cobrem:
- Autenticação
- CRUD de filmes
- CRUD de avaliações
- Validações
- Permissões

## 🗄️ Estrutura da Base de Dados

### Tabelas

**users**
- `id` (UUID, PK)
- `email` (STRING, UNIQUE)
- `password` (STRING, SHA-256)
- `role` (ENUM: View, Edit, Admin)
- `created_at`, `updated_at`

**movies**
- `id` (UUID, PK)
- `title` (STRING)
- `year` (INTEGER)
- `genre` (STRING)
- `description` (TEXT)
- `director` (STRING)
- `duration` (INTEGER)
- `created_at`, `updated_at`

**evaluations**
- `id` (UUID, PK)
- `user_id` (UUID, FK -> users)
- `movie_id` (UUID, FK -> movies)
- `rating` (INTEGER, 1-10)
- `comment` (TEXT)
- `created_at`, `updated_at`
- UNIQUE(user_id, movie_id)

## 📁 Estrutura do Projeto

```
TP_SD/
├── src/
│   ├── config/
│   │   ├── database.js      # Configuração Sequelize
│   │   └── swagger.js        # Configuração Swagger
│   ├── controllers/         # Controllers (lógica HTTP)
│   ├── middleware/          # Middlewares (auth, validação, erros)
│   ├── models/              # Modelos Sequelize
│   ├── routes/               # Rotas da API
│   ├── services/            # Lógica de negócio
│   ├── utils/               # Utilitários (JWT, password)
│   └── server.js            # Servidor Express
├── database/
│   ├── migrations/          # Migrations Knex
│   └── seeds/              # Seeds (dados de exemplo)
├── test/                    # Testes Mocha
├── docker-compose.yml
├── Dockerfile
├── knexfile.js
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start` - Iniciar servidor
- `npm run dev` - Iniciar com nodemon (auto-reload)
- `npm run migrate:latest` - Executar migrations
- `npm run migrate:rollback` - Reverter última migration
- `npm run seed:run` - Executar seeds
- `npm test` - Executar testes

## 🐳 Docker

### Comandos Docker

```bash
# Construir e iniciar
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f api
```

## 🔒 Segurança

- Passwords encriptadas com SHA-256
- Autenticação JWT
- Validação de dados em todos os endpoints
- Middleware de autorização por níveis
- Proteção contra SQL injection (Sequelize)
- CORS configurado

## 📝 Notas

- Todos os IDs são UUIDs (não sequenciais)
- A API segue os padrões REST
- Códigos HTTP adequados (200, 201, 400, 401, 403, 404, 409, 500)
- Validação completa de dados
- Tratamento de erros centralizado

## 📄 Licença

Este projeto foi desenvolvido para fins académicos.

