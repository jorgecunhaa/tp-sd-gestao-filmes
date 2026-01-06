# 🎁 Funcionalidades Extras Implementadas

Este documento lista todas as funcionalidades implementadas que **vão além dos requisitos obrigatórios** do trabalho prático.

---

## ✅ Funcionalidades Extras Identificadas

### 1. 🔍 **Sistema de Filtros e Pesquisa Avançado**

**O que é:** Permite filtrar e pesquisar filmes de várias formas

**Implementação:**
- **Filtro por género**: `GET /api/movies?genre=Sci-Fi`
- **Filtro por ano**: `GET /api/movies?year=2010`
- **Pesquisa textual**: `GET /api/movies?search=Matrix`
  - Pesquisa no título, descrição e realizador

**Código:**
```javascript
// src/services/movieService.js
async getAllMovies(filters = {}) {
  const { genre, year, search } = filters;
  // ... lógica de filtros
}
```

**Por que é extra:**
- O enunciado pede apenas CRUD básico
- Esta funcionalidade melhora a experiência do utilizador
- Permite encontrar filmes rapidamente

---

### 2. 🔗 **Inclusão de Relações (Includes) nas Respostas**

**O que é:** Quando pedes um filme, recebes também as suas avaliações e informações do utilizador

**Implementação:**
- `GET /api/movies/:id` retorna o filme **com todas as avaliações**
- Cada avaliação inclui dados do utilizador (email, id)
- Evita múltiplas chamadas à API

**Exemplo de resposta:**
```json
{
  "id": "...",
  "title": "The Matrix",
  "evaluations": [
    {
      "id": "...",
      "rating": 9,
      "comment": "Excelente!",
      "user": {
        "id": "...",
        "email": "user@example.com"
      }
    }
  ]
}
```

**Por que é extra:**
- Facilita o desenvolvimento de frontend
- Reduz número de pedidos HTTP
- Melhora performance

---

### 3. ✅ **Sistema de Validação Completo e Robusto**

**O que é:** Validação detalhada de todos os dados recebidos

**Implementação:**
- Validação de email (formato correto)
- Validação de password (mínimo 6 caracteres)
- Validação de ano (1888 até ano atual + 1)
- Validação de rating (1 a 10)
- Validação de UUIDs
- Mensagens de erro descritivas

**Código:**
```javascript
// src/middleware/validator.js
body('email').isEmail().withMessage('Email inválido')
body('year').isInt({ min: 1888, max: new Date().getFullYear() + 1 })
```

**Por que é extra:**
- O enunciado pede validações, mas esta implementação é mais completa
- Mensagens de erro claras e em português
- Validação em múltiplas camadas

---

### 4. 🛡️ **Tratamento de Erros Centralizado**

**O que é:** Sistema unificado para tratar todos os erros da API

**Implementação:**
- Middleware de erro centralizado
- Códigos HTTP corretos (400, 401, 403, 404, 409, 500)
- Mensagens de erro consistentes
- Stack trace em desenvolvimento

**Código:**
```javascript
// src/middleware/errorHandler.js
// Trata todos os erros de forma consistente
```

**Por que é extra:**
- Melhora a experiência de desenvolvimento
- Facilita debugging
- Respostas consistentes

---

### 5. 🏥 **Health Check Endpoint**

**O que é:** Endpoint para verificar se a API está a funcionar

**Implementação:**
- `GET /health` - Retorna status da API
- Útil para monitorização
- Verifica se servidor está online

**Resposta:**
```json
{
  "status": "OK",
  "message": "API está a funcionar corretamente",
  "timestamp": "2026-01-05T..."
}
```

**Por que é extra:**
- Não estava nos requisitos
- Útil para produção
- Facilita monitorização

---

### 6. 🌐 **CORS Configurado**

**O que é:** Permite que aplicações web de outros domínios acedam à API

**Implementação:**
- CORS habilitado para todos os origens (`*`)
- Configurável via variáveis de ambiente
- Essencial para desenvolvimento frontend

**Por que é extra:**
- Facilita desenvolvimento de frontend
- Permite testes de diferentes origens
- Boa prática de desenvolvimento

---

### 7. 🔄 **Mapeamento API ↔ Base de Dados**

**O que é:** Sistema que permite a API usar nomes em inglês enquanto a BD usa português

**Implementação:**
- API aceita/retorna dados em inglês (compatibilidade)
- Base de dados usa português (requisito)
- Conversão automática nos controllers

**Exemplo:**
```javascript
// Request: { "title": "Matrix" }
// BD: { "titulo": "Matrix" }
// Response: { "title": "Matrix" }
```

**Por que é extra:**
- Flexibilidade de design
- Compatibilidade com padrões internacionais
- Demonstra conhecimento técnico

---

### 8. 📊 **Estrutura Organizada (Arquitetura em Camadas)**

**O que é:** Código organizado em camadas separadas

**Estrutura:**
- **Controllers**: Lógica HTTP (recebe pedidos, retorna respostas)
- **Services**: Lógica de negócio (regras do sistema)
- **Models**: Representação dos dados
- **Middleware**: Autenticação, validação, erros
- **Routes**: Definição das rotas

**Por que é extra:**
- Código mais limpo e manutenível
- Separação de responsabilidades
- Facilita testes e manutenção
- Boas práticas de desenvolvimento

---

### 9. 📝 **Seeds com Dados de Exemplo**

**O que é:** Scripts que criam dados de teste automaticamente

**Implementação:**
- 3 utilizadores de teste (Admin, Edit, View)
- 3 filmes de exemplo
- 3 avaliações de exemplo

**Por que é extra:**
- Facilita testes
- Demonstra o sistema funcionando
- Útil para apresentação

---

### 10. 📚 **Documentação Swagger Completa e Interativa**

**O que é:** Documentação automática e testável da API

**Implementação:**
- Todos os endpoints documentados
- Exemplos de requests/responses
- Possibilidade de testar diretamente
- Autenticação integrada

**Por que é extra:**
- Facilita uso da API
- Demonstra profissionalismo
- Útil para apresentação

---

### 11. 🔐 **Sistema de Permissões Granular**

**O que é:** Controle fino de quem pode fazer o quê

**Implementação:**
- View: Só visualizar
- Edit: Visualizar + criar/editar/apagar filmes + gerir próprias avaliações
- Admin: Tudo + gerir utilizadores

**Proteções:**
- Utilizador só pode editar/apagar suas próprias avaliações
- Admin pode editar/apagar qualquer avaliação
- Validação em múltiplas camadas

**Por que é extra:**
- Sistema de permissões mais robusto
- Segurança melhorada
- Flexibilidade

---

### 12. 🧪 **Testes Automatizados com Mocha**

**O que é:** Testes que verificam se tudo funciona corretamente

**Implementação:**
- Testes de autenticação
- Testes de CRUD
- Testes de validações
- Testes de permissões

**Por que é extra:**
- Garante qualidade do código
- Facilita manutenção
- Demonstra profissionalismo

---

### 13. 🐳 **Docker Compose Completo**

**O que é:** Containerização completa do projeto

**Implementação:**
- Container PostgreSQL
- Container API
- Health checks
- Volumes persistentes
- Auto-migrations e seeds

**Por que é extra:**
- Facilita instalação
- Ambiente reproduzível
- Pronto para produção

---

### 14. 🔒 **Validações de Constraints na BD**

**O que é:** Regras na base de dados que garantem integridade

**Implementação:**
- Constraint CHECK para rating (1-10)
- UNIQUE constraint (utilizador + filme)
- Foreign keys com CASCADE
- Validações no modelo Sequelize

**Por que é extra:**
- Dupla validação (aplicação + BD)
- Garante integridade mesmo se código falhar
- Boa prática de segurança

---

### 15. 📋 **Códigos HTTP Semânticos**

**O que é:** Uso correto de códigos HTTP para cada situação

**Implementação:**
- 200: Sucesso
- 201: Criado com sucesso
- 400: Dados inválidos
- 401: Não autenticado
- 403: Sem permissão
- 404: Não encontrado
- 409: Conflito (ex: avaliação duplicada)
- 500: Erro interno

**Por que é extra:**
- Facilita integração
- Padrões REST corretos
- Profissionalismo

---

## 📊 Resumo das Funcionalidades Extras

| # | Funcionalidade | Dificuldade | Valor |
|---|---------------|-------------|-------|
| 1 | Sistema de Filtros e Pesquisa | Média | ⭐⭐⭐ |
| 2 | Inclusão de Relações | Média | ⭐⭐⭐ |
| 3 | Validação Robusta | Baixa | ⭐⭐ |
| 4 | Tratamento de Erros Centralizado | Média | ⭐⭐⭐ |
| 5 | Health Check | Baixa | ⭐ |
| 6 | CORS Configurado | Baixa | ⭐ |
| 7 | Mapeamento API ↔ BD | Alta | ⭐⭐⭐ |
| 8 | Arquitetura em Camadas | Alta | ⭐⭐⭐⭐ |
| 9 | Seeds com Dados | Baixa | ⭐⭐ |
| 10 | Swagger Completo | Média | ⭐⭐⭐ |
| 11 | Permissões Granulares | Média | ⭐⭐⭐ |
| 12 | Testes Automatizados | Média | ⭐⭐⭐ |
| 13 | Docker Compose | Média | ⭐⭐⭐ |
| 14 | Constraints na BD | Média | ⭐⭐ |
| 15 | Códigos HTTP Semânticos | Baixa | ⭐⭐ |

---

## 🎯 Como Apresentar as Funcionalidades Extras

### No Slide de Funcionalidades Extra:

1. **Sistema de Filtros e Pesquisa**
   - "Implementámos um sistema de filtros que permite pesquisar filmes por género, ano ou texto. Isto melhora significativamente a experiência do utilizador."

2. **Arquitetura em Camadas**
   - "Organizámos o código em camadas separadas (Controllers, Services, Models), facilitando manutenção e testes."

3. **Mapeamento API ↔ Base de Dados**
   - "Criámos um sistema de mapeamento que permite a API usar nomes em inglês (padrão internacional) enquanto a base de dados usa português."

4. **Validação Robusta**
   - "Implementámos validações em múltiplas camadas, com mensagens de erro claras e em português."

5. **Docker Compose**
   - "Containerizámos toda a aplicação, facilitando instalação e garantindo que funciona igual em qualquer ambiente."

---

## 💡 Dicas para a Apresentação

1. **Destacar 3-5 funcionalidades principais**
   - Sistema de Filtros
   - Arquitetura em Camadas
   - Mapeamento API ↔ BD
   - Validação Robusta
   - Docker

2. **Mostrar exemplos práticos**
   - Demonstrar filtros no Swagger
   - Mostrar estrutura de pastas
   - Explicar o mapeamento

3. **Justificar cada escolha**
   - Por que implementámos?
   - Que problema resolve?
   - Como melhora o projeto?

---

**Total de Funcionalidades Extras: 15**

Todas estas funcionalidades demonstram conhecimento técnico e vão além dos requisitos básicos! 🚀

