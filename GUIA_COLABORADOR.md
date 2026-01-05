# 👥 Guia para Colaboradores

Este guia é para quem foi convidado a colaborar no projeto.

## 📋 Pré-requisitos

1. **Conta no GitHub**: Se ainda não tem, crie uma em [github.com](https://github.com)
2. **Git instalado**: Verifique executando `git --version` no terminal
3. **Convite aceite**: Certifique-se de que aceitou o convite enviado por email

## 🚀 Primeiro Acesso - Clonar o Repositório

### Passo 1: Obter o URL do Repositório

O URL será algo como:
```
https://github.com/USUARIO/nome-do-repositorio.git
```

### Passo 2: Clonar o Repositório

Abra o PowerShell ou Terminal e execute:

```powershell
git clone https://github.com/USUARIO/nome-do-repositorio.git
cd nome-do-repositorio
```

**Exemplo:**
```powershell
git clone https://github.com/jorgecunha/tp-sd-gestao-filmes.git
cd tp-sd-gestao-filmes
```

### Passo 3: Configurar o Git (se ainda não configurou)

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

## 💻 Trabalhar no Projeto

### Fluxo de Trabalho Básico

#### 1. Atualizar o Repositório Local

**Sempre antes de começar a trabalhar**, atualize o repositório:

```powershell
git pull origin main
```

Isto garante que tem a versão mais recente do código.

#### 2. Fazer Alterações

Edite os ficheiros conforme necessário.

#### 3. Verificar o que foi alterado

```powershell
git status
```

Mostra quais ficheiros foram modificados.

#### 4. Adicionar Alterações

```powershell
# Adicionar todos os ficheiros alterados
git add .

# Ou adicionar ficheiros específicos
git add nome-do-ficheiro.js
```

#### 5. Fazer Commit

```powershell
git commit -m "Descrição clara das alterações feitas"
```

**Dicas para mensagens de commit:**
- Seja claro e descritivo
- Use português ou inglês (consistente com a equipa)
- Exemplos:
  - ✅ "Adiciona endpoint para listar filmes por género"
  - ✅ "Corrige bug na validação de email"
  - ❌ "alterações"
  - ❌ "fix"

#### 6. Enviar para o GitHub

```powershell
git push origin main
```

## 🌿 Trabalhar com Branches (Recomendado)

Para funcionalidades maiores, é melhor criar uma branch separada:

### Criar e Mudar para Nova Branch

```powershell
git checkout -b feature/nome-da-funcionalidade
```

**Exemplo:**
```powershell
git checkout -b feature/autenticacao-jwt
```

### Trabalhar na Branch

Faça as alterações normalmente:
```powershell
git add .
git commit -m "Descrição das alterações"
git push origin feature/nome-da-funcionalidade
```

### Voltar para a Branch Main

```powershell
git checkout main
```

### Ver Todas as Branches

```powershell
git branch -a
```

## 🔄 Sincronizar com Alterações dos Colegas

### Atualizar do GitHub

```powershell
git pull origin main
```

### Se houver conflitos

1. O Git mostrará quais ficheiros têm conflitos
2. Abra os ficheiros e procure por marcadores como:
   ```
   <<<<<<< HEAD
   seu código
   =======
   código do colega
   >>>>>>> branch-name
   ```
3. Edite manualmente para resolver o conflito
4. Remova os marcadores (`<<<<<<<`, `=======`, `>>>>>>>`)
5. Depois:
   ```powershell
   git add .
   git commit -m "Resolve conflitos"
   git push
   ```

## 📊 Comandos Úteis

### Ver histórico de commits
```powershell
git log --oneline
```

### Ver alterações não commitadas
```powershell
git diff
```

### Ver alterações de um ficheiro específico
```powershell
git diff nome-do-ficheiro.js
```

### Desfazer alterações não commitadas
```powershell
# Desfazer todas as alterações
git checkout .

# Desfazer alterações de um ficheiro específico
git checkout nome-do-ficheiro.js
```

### Ver quem fez o quê
```powershell
# Ver histórico detalhado
git log --pretty=format:"%h - %an, %ar : %s"

# Ver alterações de um ficheiro
git blame nome-do-ficheiro.js
```

## ⚠️ Boas Práticas

1. **Sempre faça `git pull` antes de começar a trabalhar**
2. **Faça commits frequentes e com mensagens claras**
3. **Comunique com a equipa sobre funcionalidades grandes**
4. **Teste o código antes de fazer push**
5. **Não faça push diretamente para `main` se a equipa usar branches**

## 🆘 Problemas Comuns

### Erro: "Your branch is behind 'origin/main'"
```powershell
git pull origin main
```

### Erro: "Permission denied"
- Verifique se aceitou o convite do GitHub
- Verifique se está autenticado (pode precisar de Personal Access Token)

### Erro: "Merge conflict"
Siga os passos na secção "Se houver conflitos" acima.

### Verificar se está atualizado
```powershell
git fetch origin
git status
```

## 📞 Precisa de Ajuda?

- Consulte o [GUIA_GITHUB.md](./GUIA_GITHUB.md) para mais detalhes
- Fale com o dono do repositório
- Consulte a [documentação do Git](https://git-scm.com/doc)

---

**Bom trabalho em equipa! 🤝**

