# 🚀 Passo a Passo Rápido - Configuração e Início

## ⚠️ PROBLEMA ATUAL
- PostgreSQL não está instalado ou não está a correr
- Erro: `ECONNREFUSED` ao tentar conectar

---

## 📝 SOLUÇÃO PASSO A PASSO

### PASSO 1: Instalar PostgreSQL

**Opção A - Instalar no Windows:**
1. Download: https://www.postgresql.org/download/windows/
2. Execute o instalador
3. Durante instalação:
   - Port: `5432`
   - Password: Anote esta password! (ex: `postgres`)
4. Complete a instalação

**Opção B - Usar Docker (Mais Fácil):**
```powershell
docker run --name postgres-tp-sd -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gestao_filmes -p 5432:5432 -d postgres:15-alpine
```

---

### PASSO 2: Iniciar PostgreSQL

**Se instalou no Windows:**
```powershell
# Verificar serviços
Get-Service | Where-Object {$_.DisplayName -like "*postgres*"}

# Iniciar (substitua pelo nome exato)
Start-Service -Name "postgresql-x64-15"
```

**Ou via Services:**
1. Pressione `Win+R`
2. Digite: `services.msc`
3. Procure "postgresql"
4. Clique com botão direito → Start

**Se usou Docker:**
```powershell
docker start postgres-tp-sd
```

---

### PASSO 3: Criar Base de Dados

**Método 1 - Via Cursor (Recomendado):**

1. No Cursor, abra o painel de Database (ícone de BD na barra lateral)
2. Clique em "Connect to server"
3. Configure:
   - **Server Type:** PostgreSQL
   - **Host:** `127.0.0.1`
   - **Port:** `5432`
   - **Username:** `postgres`
   - **Password:** A password que definiu
   - **Database:** (deixe vazio por agora)
4. Clique em "Connect"
5. Depois de conectar, abra o SQL Editor
6. Execute:
   ```sql
   CREATE DATABASE gestao_filmes;
   ```
7. Reconecte agora especificando `gestao_filmes` como database

**Método 2 - Via pgAdmin:**
1. Abra pgAdmin
2. Conecte ao servidor
3. Clique direito em "Databases" → Create → Database
4. Nome: `gestao_filmes`
5. Save

---

### PASSO 4: Configurar .env

1. Copie o ficheiro de exemplo:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Abra o ficheiro `.env` e edite:
   ```env
   DB_PASSWORD=postgres  # Use a password REAL do PostgreSQL!
   ```

**⚠️ IMPORTANTE:** Altere `DB_PASSWORD` para a password que definiu na instalação!

---

### PASSO 5: Executar Migrations

```powershell
npm run migrate:latest
```

**Deve ver:**
```
Using environment: development
Batch 1 run: 3 migrations
```

---

### PASSO 6: Executar Seeds

```powershell
npm run seed:run
```

**Deve ver:**
```
Using environment: development
Ran 3 seed files
```

---

### PASSO 7: Iniciar Servidor

```powershell
npm start
```

**Deve ver:**
```
✅ Conexão com PostgreSQL estabelecida com sucesso.
🚀 Servidor a correr na porta 3000
📚 Documentação Swagger: http://localhost:3000/api-docs
```

---

## 🔗 Conectar no Cursor - Detalhes

### Configuração Completa:

1. **Abrir Database Panel:**
   - Ícone de base de dados na barra lateral
   - Ou `Ctrl+Shift+P` → "Database: Connect"

2. **Preencher Formulário:**
   ```
   Server Type: PostgreSQL
   Name: Gestão Filmes
   Host: 127.0.0.1
   Port: 5432
   Username: postgres
   Password: [sua password]
   Database: gestao_filmes
   ```

3. **Opções:**
   - SSL: OFF
   - Use Connection String: OFF

4. **Testar e Guardar:**
   - Clique em "Test Connection"
   - Se OK, clique em "Save"
   - Depois use "+ Connect"

---

## ✅ Checklist

Antes de iniciar, verifique:

- [ ] PostgreSQL instalado e a correr
- [ ] Base de dados `gestao_filmes` criada
- [ ] Ficheiro `.env` configurado (password correta!)
- [ ] Migrations executadas
- [ ] Seeds executados
- [ ] Conectado no Cursor

---

## 🐛 Problemas Comuns

### Erro: "ECONNREFUSED"
**Solução:** PostgreSQL não está a correr
```powershell
Get-Service | Where-Object {$_.DisplayName -like "*postgres*"}
Start-Service -Name "postgresql-x64-15"  # Ajuste o nome
```

### Erro: "password authentication failed"
**Solução:** Password errada no `.env`
- Verifique a password no ficheiro `.env`
- Teste a conexão no Cursor primeiro

### Erro: "database does not exist"
**Solução:** Criar a base de dados
- Via Cursor: Execute `CREATE DATABASE gestao_filmes;`
- Ou via pgAdmin

---

## 🎯 Comandos Rápidos

```powershell
# 1. Verificar PostgreSQL
Get-Service | Where-Object {$_.DisplayName -like "*postgres*"}

# 2. Iniciar PostgreSQL
Start-Service -Name "postgresql-x64-15"

# 3. Criar .env
Copy-Item .env.example .env
notepad .env  # Editar password

# 4. Migrations
npm run migrate:latest

# 5. Seeds
npm run seed:run

# 6. Iniciar
npm start
```

---

## 📚 Documentação

- **GUIA_INSTALACAO_COMPLETA.md** - Guia detalhado completo
- **GUIA_TESTES.md** - Como testar a API
- **README.md** - Documentação geral

---

**Boa sorte! 🚀**

