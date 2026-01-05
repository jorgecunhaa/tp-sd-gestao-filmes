# 🧪 Guia de Testes - API Gestão de Filmes

## 📋 Pré-requisitos

1. **PostgreSQL instalado e a correr**
2. **Base de dados criada**: `gestao_filmes`
3. **Ficheiro `.env` configurado** (copiar de `.env.example`)

## 🚀 Passo 1: Configuração Inicial

### 1.1 Criar ficheiro `.env`

Copie o ficheiro de exemplo:
```bash
cp .env.example .env
```

Edite o `.env` com as suas configurações:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestao_filmes
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
SWAGGER_HOST=localhost:3000
```

### 1.2 Criar base de dados PostgreSQL

```bash
# No terminal PostgreSQL ou psql
createdb gestao_filmes
```

Ou via SQL:
```sql
CREATE DATABASE gestao_filmes;
```

### 1.3 Executar migrations

```bash
npm run migrate:latest
```

Deve ver:
```
Using environment: development
Batch 1 run: 3 migrations
```

### 1.4 Executar seeds (dados de exemplo)

```bash
npm run seed:run
```

Deve ver:
```
Using environment: development
Ran 3 seed files
```

## 🎯 Passo 2: Iniciar o Servidor

```bash
npm start
```

Deve ver:
```
✅ Conexão com PostgreSQL estabelecida com sucesso.
🚀 Servidor a correr na porta 3000
📚 Documentação Swagger: http://localhost:3000/api-docs
🏥 Health check: http://localhost:3000/health
```

## 📚 Passo 3: Testar via Swagger UI

### 3.1 Aceder ao Swagger

Abra no navegador: **http://localhost:3000/api-docs**

### 3.2 Fazer Login

1. Expanda o endpoint `POST /api/auth/login`
2. Clique em "Try it out"
3. Use as credenciais:
   ```json
   {
     "email": "admin@example.com",
     "password": "admin123"
   }
   ```
4. Clique em "Execute"
5. Copie o `token` da resposta

### 3.3 Autenticar no Swagger

1. Clique no botão **"Authorize"** (canto superior direito)
2. Cole o token no campo (sem "Bearer")
3. Clique em "Authorize"
4. Feche a janela

Agora pode testar todos os endpoints protegidos!

## 🧪 Passo 4: Testar Endpoints Principais

### 4.1 Testar Health Check

```bash
GET http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "OK",
  "message": "API está a funcionar corretamente",
  "timestamp": "2026-01-02T..."
}
```

### 4.2 Testar Login (via Swagger ou Postman)

**Request:**
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Resposta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "00000000-0000-0000-0000-000000000001",
    "email": "admin@example.com",
    "role": "Admin"
  }
}
```

### 4.3 Testar Listar Filmes

**Request:**
```bash
GET http://localhost:3000/api/movies
Authorization: Bearer <token>
```

**Resposta esperada:** Array com 3 filmes (do seed)

### 4.4 Testar Criar Filme (requer Edit ou Admin)

**Request:**
```bash
POST http://localhost:3000/api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Interstellar",
  "year": 2014,
  "genre": "Sci-Fi",
  "description": "A team of explorers travel through a wormhole",
  "director": "Christopher Nolan",
  "duration": 169
}
```

**Resposta esperada:** 201 Created com o filme criado

### 4.5 Testar Criar Avaliação

**Request:**
```bash
POST http://localhost:3000/api/movies/{movie_id}/evaluations
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 9,
  "comment": "Excelente filme!"
}
```

**Resposta esperada:** 201 Created com a avaliação criada

### 4.6 Testar Validações

**Teste com dados inválidos:**
```bash
POST http://localhost:3000/api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "",
  "year": "invalid"
}
```

**Resposta esperada:** 400 Bad Request com detalhes dos erros

### 4.7 Testar Permissões

**Tentar criar filme com utilizador View:**
1. Fazer login com `view@example.com` / `view123`
2. Tentar criar filme
3. **Resposta esperada:** 403 Forbidden

## 🧪 Passo 5: Testes Automatizados

### 5.1 Executar testes Mocha

```bash
npm test
```

**Testes incluídos:**
- ✅ Autenticação (login válido/inválido)
- ✅ CRUD de filmes
- ✅ CRUD de avaliações
- ✅ Validações
- ✅ Permissões

### 5.2 Verificar cobertura

Os testes devem passar todos. Se algum falhar, verifique:
- Base de dados de teste configurada
- Servidor não está a correr na porta 3000 (conflito)

## 📝 Passo 6: Testar Casos de Erro

### 6.1 Endpoint não encontrado

```bash
GET http://localhost:3000/api/inexistente
```

**Resposta esperada:** 404 Not Found

### 6.2 Token inválido

```bash
GET http://localhost:3000/api/movies
Authorization: Bearer token-invalido
```

**Resposta esperada:** 401 Unauthorized

### 6.3 Sem autenticação

```bash
GET http://localhost:3000/api/movies
```

**Resposta esperada:** 401 Unauthorized

### 6.4 Avaliação duplicada

Tentar criar duas avaliações do mesmo utilizador para o mesmo filme:
**Resposta esperada:** 409 Conflict

## 🔍 Checklist de Testes

### Funcionalidades Básicas
- [ ] Health check funciona
- [ ] Login retorna token
- [ ] Listar filmes funciona
- [ ] Criar filme funciona (Edit/Admin)
- [ ] Atualizar filme funciona
- [ ] Eliminar filme funciona
- [ ] Criar avaliação funciona
- [ ] Listar avaliações de um filme funciona

### Autenticação e Autorização
- [ ] Sem token retorna 401
- [ ] Token inválido retorna 401
- [ ] View não pode criar filmes (403)
- [ ] Edit pode criar filmes
- [ ] Admin pode gerir utilizadores
- [ ] Apenas dono ou Admin pode editar avaliação

### Validações
- [ ] Email inválido retorna 400
- [ ] Password muito curta retorna 400
- [ ] Rating fora de 1-10 retorna 400
- [ ] Ano inválido retorna 400
- [ ] UUID inválido retorna 400

### Relações
- [ ] Criar avaliação para filme inexistente retorna 404
- [ ] Avaliação duplicada retorna 409
- [ ] Eliminar filme elimina avaliações (CASCADE)

### Swagger
- [ ] Documentação carrega corretamente
- [ ] Autenticação funciona no Swagger
- [ ] Todos os endpoints aparecem
- [ ] Exemplos funcionam

## 🐛 Resolução de Problemas

### Erro: "Cannot connect to database"
- Verifique se PostgreSQL está a correr
- Verifique credenciais no `.env`
- Verifique se a base de dados existe

### Erro: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Erro: "Migration already exists"
```bash
npm run migrate:rollback
npm run migrate:latest
```

### Erro: "Table already exists"
```bash
# Limpar base de dados e recomeçar
npm run migrate:rollback --all
npm run migrate:latest
npm run seed:run
```

## ✅ Tudo Funcionando?

Se todos os testes passarem e conseguir:
- ✅ Fazer login
- ✅ Listar/criar/editar/eliminar filmes
- ✅ Criar/editar/eliminar avaliações
- ✅ Ver documentação Swagger
- ✅ Testes automatizados passam

**Então está tudo pronto para apresentar! 🎉**

