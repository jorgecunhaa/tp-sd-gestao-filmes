# 📝 Alterações na Base de Dados - Tradução para Português

## ✅ Alterações Realizadas

Todas as tabelas e colunas foram traduzidas para português, mantendo a funcionalidade do projeto.

## 🔄 Mapeamento de Alterações

### Tabelas

| Inglês (Antigo) | Português (Novo) |
|----------------|------------------|
| `users` | `utilizadores` |
| `movies` | `filmes` |
| `evaluations` | `avaliacoes` |

### Colunas - Tabela `utilizadores` (antes `users`)

| Inglês (Antigo) | Português (Novo) |
|----------------|------------------|
| `password` | `senha` |
| `role` | `papel` |
| `email` | `email` (mantido) |
| `id` | `id` (mantido) |
| `created_at` | `criado_em` (via timestamps) |
| `updated_at` | `atualizado_em` (via timestamps) |

### Colunas - Tabela `filmes` (antes `movies`)

| Inglês (Antigo) | Português (Novo) |
|----------------|------------------|
| `title` | `titulo` |
| `year` | `ano` |
| `genre` | `genero` |
| `description` | `descricao` |
| `director` | `realizador` |
| `duration` | `duracao` |
| `id` | `id` (mantido) |
| `created_at` | `criado_em` (via timestamps) |
| `updated_at` | `atualizado_em` (via timestamps) |

### Colunas - Tabela `avaliacoes` (antes `evaluations`)

| Inglês (Antigo) | Português (Novo) |
|----------------|------------------|
| `user_id` | `utilizador_id` |
| `movie_id` | `filme_id` |
| `rating` | `nota` |
| `comment` | `comentario` |
| `id` | `id` (mantido) |
| `created_at` | `criado_em` (via timestamps) |
| `updated_at` | `atualizado_em` (via timestamps) |

## 📁 Ficheiros Alterados

### Migrations
- ✅ `database/migrations/001_create_users.js` → Tabela `utilizadores`
- ✅ `database/migrations/002_create_movies.js` → Tabela `filmes`
- ✅ `database/migrations/003_create_evaluations.js` → Tabela `avaliacoes`

### Seeds
- ✅ `database/seeds/001_users.js` → Atualizado para `utilizadores`
- ✅ `database/seeds/002_movies.js` → Atualizado para `filmes`
- ✅ `database/seeds/003_evaluations.js` → Atualizado para `avaliacoes`

## ⚠️ IMPORTANTE: Atualizar Código da Aplicação

Se o projeto tiver código da aplicação (controllers, models, services) que usa essas tabelas, **é necessário atualizar** todas as referências:

### Onde procurar e atualizar:

1. **Models/ORM** (Sequelize, etc.):
   ```javascript
   // ANTES
   User.findAll()
   Movie.create()
   Evaluation.findByPk()
   
   // DEPOIS - usar os novos nomes das tabelas
   // (depende do ORM usado)
   ```

2. **Queries Knex diretas**:
   ```javascript
   // ANTES
   knex('users').select()
   knex('movies').where('title', '...')
   knex('evaluations').insert({ user_id: ..., movie_id: ... })
   
   // DEPOIS
   knex('utilizadores').select()
   knex('filmes').where('titulo', '...')
   knex('avaliacoes').insert({ utilizador_id: ..., filme_id: ... })
   ```

3. **Referências a colunas**:
   ```javascript
   // ANTES
   { title: '...', year: 2020, director: '...' }
   { user_id: '...', movie_id: '...', rating: 8, comment: '...' }
   { email: '...', password: '...', role: 'Admin' }
   
   // DEPOIS
   { titulo: '...', ano: 2020, realizador: '...' }
   { utilizador_id: '...', filme_id: '...', nota: 8, comentario: '...' }
   { email: '...', senha: '...', papel: 'Admin' }
   ```

## 🔄 Como Aplicar as Alterações

### Se a base de dados já existe:

**Opção 1: Recriar do zero (Recomendado para desenvolvimento)**
```powershell
# 1. Fazer backup dos dados (se necessário)
# 2. Dropar e recriar a base de dados
# 3. Executar migrations
npm run migrate:latest
# 4. Executar seeds
npm run seed:run
```

**Opção 2: Criar migration de renomeação (Produção)**
- Criar uma nova migration que renomeia as tabelas e colunas
- Mais complexo, mas preserva dados existentes

### Com Docker:

```powershell
# Limpar e recriar
docker-compose down -v
docker-compose up --build -d
```

## ✅ Verificação

Após aplicar as alterações, verificar:

1. **Tabelas criadas:**
   ```sql
   \dt
   -- Deve mostrar: utilizadores, filmes, avaliacoes
   ```

2. **Estrutura das tabelas:**
   ```sql
   \d utilizadores
   \d filmes
   \d avaliacoes
   ```

3. **Dados de exemplo:**
   ```sql
   SELECT * FROM utilizadores;
   SELECT * FROM filmes;
   SELECT * FROM avaliacoes;
   ```

## 📋 Checklist de Atualização

- [x] Migrations atualizadas
- [x] Seeds atualizados
- [ ] Código da aplicação atualizado (controllers, models, services)
- [ ] Testes atualizados
- [ ] Documentação atualizada (README, etc.)
- [ ] Base de dados recriada ou migrada
- [ ] Verificação de funcionamento

## 🆘 Se Algo Não Funcionar

1. Verificar logs:
   ```powershell
   docker-compose logs -f
   ```

2. Verificar se as migrations foram executadas:
   ```powershell
   npm run migrate:latest
   ```

3. Verificar estrutura da base de dados:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

4. Se necessário, fazer rollback:
   ```powershell
   npm run migrate:rollback
   ```

---

**Nota:** Se encontrar código que ainda usa os nomes antigos, atualize-o para usar os novos nomes em português.

