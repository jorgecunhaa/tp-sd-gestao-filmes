# 🐳 Guia Docker - Verificar e Corrigir Containers

## 📊 Estado Atual dos Containers

Para verificar os containers do projeto:

```powershell
docker ps -a --filter "name=tp_sd"
```

## 🔧 Corrigir Containers

### Opção 1: Limpar e Recriar (Recomendado)

Se os containers estão parados ou com problemas:

```powershell
# 1. Parar e remover containers antigos
docker-compose down

# 2. Remover volumes antigos (se necessário - CUIDADO: apaga dados!)
docker-compose down -v

# 3. Reconstruir e iniciar
docker-compose up --build -d
```

### Opção 2: Remover Containers Manualmente

```powershell
# Parar containers
docker stop tp_sd_api tp_sd_postgres

# Remover containers
docker rm tp_sd_api tp_sd_postgres

# Remover volumes (se necessário)
docker volume rm tp_sd_postgres_data

# Recriar
docker-compose up --build -d
```

### Opção 3: Recriar Apenas um Container

```powershell
# Recriar apenas a API
docker-compose up --build -d api

# Recriar apenas o PostgreSQL
docker-compose up --build -d postgres
```

## ✅ Verificar se Está a Funcionar

### 1. Verificar Status dos Containers

```powershell
docker-compose ps
```

Deve mostrar ambos os containers como "Up".

### 2. Ver Logs

```powershell
# Logs de todos os serviços
docker-compose logs

# Logs apenas da API
docker-compose logs api

# Logs apenas do PostgreSQL
docker-compose logs postgres

# Logs em tempo real
docker-compose logs -f
```

### 3. Testar Conexão

```powershell
# Verificar se a API está a responder
curl http://localhost:3000

# Ou no navegador
# http://localhost:3000/api-docs
```

### 4. Verificar Base de Dados

```powershell
# Conectar ao PostgreSQL
docker exec -it tp_sd_postgres psql -U postgres -d gestao_filmes

# Dentro do psql, verificar tabelas
\dt

# Deve mostrar: utilizadores, filmes, avaliacoes
```

## 🆘 Problemas Comuns

### Erro: "Port already in use"

Se a porta 5432 ou 3000 já está em uso:

```powershell
# Verificar o que está a usar a porta
netstat -ano | findstr :5432
netstat -ano | findstr :3000

# Parar o processo ou mudar a porta no docker-compose.yml
```

### Erro: "Cannot connect to database"

1. Verificar se o PostgreSQL está a correr:
```powershell
docker-compose ps postgres
```

2. Verificar logs:
```powershell
docker-compose logs postgres
```

3. Aguardar alguns segundos (o PostgreSQL pode demorar a iniciar)

### Erro: "Migration failed"

Se as migrations falharem:

```powershell
# Entrar no container da API
docker exec -it tp_sd_api sh

# Executar migrations manualmente
npm run migrate:latest

# Executar seeds
npm run seed:run
```

### Container não inicia

```powershell
# Ver logs detalhados
docker-compose logs --tail=100

# Verificar se há erros de sintaxe no docker-compose.yml
docker-compose config
```

## 📝 Comandos Úteis

### Reiniciar Containers

```powershell
docker-compose restart
```

### Parar Containers

```powershell
docker-compose stop
```

### Iniciar Containers Parados

```powershell
docker-compose start
```

### Ver Uso de Recursos

```powershell
docker stats tp_sd_api tp_sd_postgres
```

### Limpar Tudo (CUIDADO!)

```powershell
# Parar e remover containers, redes e volumes
docker-compose down -v

# Remover imagens também
docker rmi tp_sd-api postgres:15-alpine
```

## 🔄 Após Alterações no Código

Se fez alterações no código e quer atualizar:

```powershell
# Reconstruir e reiniciar
docker-compose up --build -d

# Ou apenas reiniciar (se não mudou dependências)
docker-compose restart api
```

## 📋 Checklist

- [ ] Containers estão a correr (`docker-compose ps`)
- [ ] API responde em `http://localhost:3000`
- [ ] Swagger disponível em `http://localhost:3000/api-docs`
- [ ] Base de dados tem as tabelas: `utilizadores`, `filmes`, `avaliacoes`
- [ ] Seeds foram executados (dados de exemplo presentes)

---

**Nota:** Se precisar de ajuda adicional, verifique os logs com `docker-compose logs -f`

