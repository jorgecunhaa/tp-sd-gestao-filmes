# 🚀 Guia Completo - Instalação e Configuração

## 📋 Índice
1. [Instalar PostgreSQL](#1-instalar-postgresql)
2. [Iniciar PostgreSQL](#2-iniciar-postgresql)
3. [Criar Base de Dados](#3-criar-base-de-dados)
4. [Conectar no Cursor](#4-conectar-no-cursor)
5. [Configurar Projeto](#5-configurar-projeto)
6. [Executar Migrations e Seeds](#6-executar-migrations-e-seeds)
7. [Iniciar Servidor](#7-iniciar-servidor)

---

## 1. Instalar PostgreSQL

### Opção A: Instalar PostgreSQL no Windows

1. **Download:**
   - Aceda a: https://www.postgresql.org/download/windows/
   - Ou use o instalador: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   - Baixe a versão mais recente (15 ou 16)

2. **Instalação:**
   - Execute o instalador
   - Durante a instalação:
     - **Port:** 5432 (padrão)
     - **Superuser password:** Anote esta password! (ex: `postgres`)
     - **Locale:** Portuguese, Portugal (ou deixe padrão)
   - Complete a instalação

3. **Verificar Instalação:**
   ```powershell
   # Verificar se o serviço existe
   Get-Service -Name "*postgres*"
   ```

### Opção B: Usar Docker (Mais Fácil!)

Se preferir não instalar PostgreSQL diretamente:

```powershell
# Iniciar PostgreSQL em Docker
docker run --name postgres-tp-sd -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gestao_filmes -p 5432:5432 -d postgres:15-alpine
```

---

## 2. Iniciar PostgreSQL

### Se instalou PostgreSQL no Windows:

```powershell
# Verificar status
Get-Service -Name "*postgres*"

# Iniciar serviço (substitua pelo nome exato do serviço)
Start-Service -Name "postgresql-x64-15"  # Ajuste o nome conforme sua instalação

# Ou via Services GUI
# Pressione Win+R, digite: services.msc
# Procure "postgresql" e clique em "Start"
```

### Se usou Docker:

```powershell
# Verificar se está a correr
docker ps

# Se não estiver, iniciar
docker start postgres-tp-sd
```

---

## 3. Criar Base de Dados

### Método 1: Via pgAdmin (Interface Gráfica)

1. Abra **pgAdmin** (instalado com PostgreSQL)
2. Conecte ao servidor (password que definiu na instalação)
3. Clique com botão direito em **Databases** → **Create** → **Database**
4. Nome: `gestao_filmes`
5. Clique em **Save**

### Método 2: Via SQL no Cursor (Depois de conectar)

Após conectar no Cursor (passo 4), execute:
```sql
CREATE DATABASE gestao_filmes;
```

### Método 3: Via PowerShell (se psql estiver no PATH)

```powershell
# Encontrar o caminho do PostgreSQL
$pgPath = "C:\Program Files\PostgreSQL\15\bin"  # Ajuste a versão

# Adicionar ao PATH temporariamente
$env:Path += ";$pgPath"

# Criar base de dados
& "$pgPath\createdb.exe" -U postgres gestao_filmes
# Quando pedir password, digite a password do postgres
```

---

## 4. Conectar no Cursor

### Passo a Passo:

1. **Abrir Database Panel:**
   - No Cursor, procure o ícone de base de dados na barra lateral esquerda
   - Ou pressione `Ctrl+Shift+P` e procure "Database: Connect"

2. **Configurar Conexão:**
   - **Server Type:** Selecione **PostgreSQL**
   - **Name:** `Gestão Filmes` (nome da conexão)
   - **Group:** Deixe vazio ou `TP_SD`
   - **Scope:** `Workspace` ou `Global`

3. **Config (Aba Main):**
   - **Host:** `127.0.0.1` ou `localhost`
   - **Port:** `5432`
   - **Username:** `postgres`
   - **Password:** A password que definiu na instalação (ex: `postgres`)
   - **Database:** `gestao_filmes` (ou deixe vazio se ainda não criou)

4. **Opções:**
   - **SSL:** Desligado (off)
   - **Use Connection String:** Desligado (off)

5. **Testar e Guardar:**
   - Clique em **"Test Connection"** ou **"Connect"**
   - Se funcionar, clique em **"Save"**
   - Depois use **"+ Connect"** para conectar

### Se a base de dados ainda não existir:

1. Conecte primeiro sem especificar database (deixe vazio)
2. Depois de conectar, execute no SQL Editor:
   ```sql
   CREATE DATABASE gestao_filmes;
   ```
3. Reconecte agora especificando `gestao_filmes` como database

---

## 5. Configurar Projeto

### 5.1 Criar ficheiro `.env`

```powershell
# No diretório do projeto
Copy-Item .env.example .env
```

### 5.2 Editar `.env`

Abra o ficheiro `.env` e configure:

```env
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gestao_filmes
DB_USER=postgres
DB_PASSWORD=postgres  # Use a password que definiu!

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Swagger
SWAGGER_HOST=localhost:3000
```

**⚠️ IMPORTANTE:** Altere `DB_PASSWORD` para a password real do PostgreSQL!

---

## 6. Executar Migrations e Seeds

### 6.1 Executar Migrations

```powershell
npm run migrate:latest
```

**Resultado esperado:**
```
Using environment: development
Batch 1 run: 3 migrations
```

### 6.2 Executar Seeds

```powershell
npm run seed:run
```

**Resultado esperado:**
```
Using environment: development
Ran 3 seed files
```

### Se der erro de conexão:

1. Verifique se PostgreSQL está a correr:
   ```powershell
   Get-Service -Name "*postgres*"
   ```

2. Verifique o ficheiro `.env` (password correta?)

3. Teste a conexão manualmente no Cursor primeiro

---

## 7. Iniciar Servidor

### 7.1 Iniciar API

```powershell
npm start
```

**Resultado esperado:**
```
✅ Conexão com PostgreSQL estabelecida com sucesso.
🚀 Servidor a correr na porta 3000
📚 Documentação Swagger: http://localhost:3000/api-docs
🏥 Health check: http://localhost:3000/health
```

### 7.2 Testar no Navegador

1. **Health Check:**
   - Abra: http://localhost:3000/health
   - Deve ver: `{"status":"OK",...}`

2. **Swagger UI:**
   - Abra: http://localhost:3000/api-docs
   - Deve ver a documentação completa da API

---

## 🔧 Resolução de Problemas

### Erro: "ECONNREFUSED"

**Causa:** PostgreSQL não está a correr

**Solução:**
```powershell
# Verificar serviços
Get-Service -Name "*postgres*"

# Iniciar serviço
Start-Service -Name "postgresql-x64-15"  # Ajuste o nome
```

### Erro: "psql is not recognized"

**Causa:** PostgreSQL não está no PATH

**Solução:**
- Use pgAdmin ou conecte via Cursor
- Ou adicione PostgreSQL ao PATH do sistema

### Erro: "password authentication failed"

**Causa:** Password incorreta no `.env`

**Solução:**
1. Verifique a password no ficheiro `.env`
2. Teste a conexão no Cursor primeiro
3. Se não souber a password, pode redefini-la no PostgreSQL

### Erro: "database does not exist"

**Causa:** Base de dados não foi criada

**Solução:**
1. Conecte no Cursor
2. Execute: `CREATE DATABASE gestao_filmes;`
3. Ou crie via pgAdmin

---

## ✅ Checklist Final

Antes de iniciar o servidor, verifique:

- [ ] PostgreSQL instalado e a correr
- [ ] Base de dados `gestao_filmes` criada
- [ ] Ficheiro `.env` configurado com password correta
- [ ] Migrations executadas com sucesso
- [ ] Seeds executados com sucesso
- [ ] Conectado no Cursor e vê as tabelas

---

## 🎯 Comandos Rápidos (Resumo)

```powershell
# 1. Verificar PostgreSQL
Get-Service -Name "*postgres*"

# 2. Iniciar PostgreSQL (se não estiver a correr)
Start-Service -Name "postgresql-x64-15"

# 3. Configurar .env (editar manualmente)
notepad .env

# 4. Executar migrations
npm run migrate:latest

# 5. Executar seeds
npm run seed:run

# 6. Iniciar servidor
npm start
```

---

## 📚 Próximos Passos

Após tudo funcionar:

1. **Testar no Swagger:**
   - http://localhost:3000/api-docs
   - Fazer login com: `admin@example.com` / `admin123`

2. **Explorar Base de Dados no Cursor:**
   - Ver tabelas: `users`, `movies`, `evaluations`
   - Ver dados inseridos pelos seeds

3. **Executar Testes:**
   ```powershell
   npm test
   ```

---

**Boa sorte! 🚀**

