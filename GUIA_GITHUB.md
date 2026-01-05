# 📦 Guia: Como Colocar o Projeto no GitHub

Este guia explica passo a passo como colocar o seu projeto no GitHub.

## Pré-requisitos

1. **Conta no GitHub**: Se ainda não tem, crie uma em [github.com](https://github.com)
2. **Git instalado**: Verifique se tem Git instalado executando `git --version` no terminal

## Passo 1: Navegar para o Diretório do Projeto

Abra o PowerShell ou Terminal e navegue para a pasta do projeto:

```powershell
cd "C:\Users\cunha\OneDrive - Instituto Politécnico de Viana do Castelo\Documentos\TP_SD (1)\TP_SD"
```

## Passo 2: Inicializar o Repositório Git

Se ainda não inicializou o Git, execute:

```powershell
git init
```

## Passo 3: Configurar o Git (se ainda não configurou)

Configure o seu nome e email (substitua pelos seus dados):

```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

## Passo 4: Adicionar Arquivos ao Git

Adicione todos os arquivos do projeto:

```powershell
git add .
```

## Passo 5: Criar o Primeiro Commit

```powershell
git commit -m "Initial commit: API Gestão de Filmes - TP Sistemas Distribuídos"
```

## Passo 6: Criar Repositório no GitHub

1. Aceda a [github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `tp-sd-gestao-filmes` (ou outro nome à sua escolha)
   - **Description**: "API REST para gestão de catálogo de filmes - Trabalho Prático Sistemas Distribuídos"
   - **Visibility**: Escolha **Public** ou **Private**
   - **NÃO marque** "Initialize this repository with a README" (já temos um)
5. Clique em **"Create repository"**

## Passo 7: Conectar o Repositório Local ao GitHub

Após criar o repositório no GitHub, você verá instruções. Execute estes comandos (substitua `SEU_USUARIO` e `NOME_DO_REPOSITORIO`):

```powershell
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
git branch -M main
git push -u origin main
```

**Exemplo:**
```powershell
git remote add origin https://github.com/jorgecunha/tp-sd-gestao-filmes.git
git branch -M main
git push -u origin main
```

## Passo 8: Autenticação

Se for a primeira vez a fazer push, o GitHub pode pedir autenticação:
- Pode usar **Personal Access Token** (recomendado)
- Ou usar **GitHub CLI** (`gh auth login`)

### Como criar Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Dê um nome e selecione as permissões `repo`
4. Copie o token gerado
5. Use o token como password quando o Git pedir

## ✅ Verificação

Após o push, aceda ao seu repositório no GitHub e verifique se todos os arquivos foram enviados corretamente.

## 👥 Partilhar o Repositório com Colaboradores

Para permitir que o seu colega tenha acesso ao repositório e possa fazer alterações:

### Método 1: Adicionar como Colaborador (Recomendado)

1. **Aceda ao seu repositório no GitHub**
2. Clique no separador **"Settings"** (Configurações) no topo do repositório
3. No menu lateral esquerdo, clique em **"Collaborators"** (Colaboradores)
4. Clique no botão **"Add people"** (Adicionar pessoas)
5. Digite o **username do GitHub** ou **email** do seu colega
6. Selecione o seu colega na lista de sugestões
7. Escolha o nível de permissão:
   - **Write**: Pode fazer push, criar branches, fazer pull requests (recomendado para trabalho em equipa)
   - **Admin**: Acesso total, incluindo configurações (use com cuidado)
8. Clique em **"Add [nome] to this repository"**

### O que acontece depois:

- O seu colega receberá um **email de convite** do GitHub
- Ele precisa **aceitar o convite** clicando no link do email
- Após aceitar, ele terá acesso ao repositório

### Como o seu colega pode clonar o repositório:

Após aceitar o convite, o seu colega pode clonar o repositório:

```powershell
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
```

**Exemplo:**
```powershell
git clone https://github.com/jorgecunha/tp-sd-gestao-filmes.git
cd tp-sd-gestao-filmes
```

### Método 2: Repositório Público (Alternativa Simples)

Se o repositório for **público**, qualquer pessoa pode:
- Ver o código
- Fazer fork (cópia)
- Mas **não pode fazer push** diretamente (precisa ser colaborador)

Para tornar público:
1. Settings → General → scroll até "Danger Zone"
2. Clique em "Change visibility" → "Make public"

### Trabalho em Equipa - Boas Práticas

#### 1. Usar Branches para Funcionalidades
```powershell
# Criar uma nova branch para uma funcionalidade
git checkout -b feature/nova-funcionalidade

# Fazer alterações e commit
git add .
git commit -m "Adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
```

#### 2. Sincronizar com Alterações do Colega
```powershell
# Antes de começar a trabalhar, atualizar do repositório
git pull origin main

# Ou se estiver noutra branch
git pull origin main
```

#### 3. Resolver Conflitos (se houver)
Se ambos editarem o mesmo ficheiro:
```powershell
git pull origin main
# Git mostrará os conflitos
# Edite os ficheiros para resolver conflitos
git add .
git commit -m "Resolve conflitos"
git push
```

#### 4. Ver quem fez o quê
```powershell
# Ver histórico de commits
git log --oneline --graph --all

# Ver alterações de um ficheiro
git blame nome-do-ficheiro.js
```

### Verificar Colaboradores Atuais

Para ver quem tem acesso ao repositório:
1. Settings → Collaborators
2. Verá a lista de todos os colaboradores e suas permissões

### Remover um Colaborador

Se precisar remover alguém:
1. Settings → Collaborators
2. Clique no ícone de engrenagem ao lado do nome
3. Selecione "Remove [nome] from this repository"

## 📝 Comandos Úteis para o Futuro

### Verificar status
```powershell
git status
```

### Adicionar alterações
```powershell
git add .
git commit -m "Descrição das alterações"
git push
```

### Ver histórico de commits
```powershell
git log
```

## 🆘 Problemas Comuns

### Erro: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
```

### Erro: "failed to push some refs"
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Ver qual é o remote configurado
```powershell
git remote -v
```

---

**Boa sorte com o seu projeto! 🚀**

