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

