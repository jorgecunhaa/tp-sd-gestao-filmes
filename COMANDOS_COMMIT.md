# 📝 Guia Rápido: Fazer Commit das Alterações

## Passo a Passo para Fazer Commit

### 1️⃣ Abrir o Terminal/PowerShell

Abra o PowerShell ou Terminal e navegue para a pasta do projeto:

```powershell
cd "C:\Users\cunha\OneDrive - Instituto Politécnico de Viana do Castelo\Documentos\TP_SD (1)\TP_SD"
```

### 2️⃣ Verificar o Estado Atual

Veja quais ficheiros foram alterados:

```powershell
git status
```

Isto mostra:
- **Ficheiros modificados** (em vermelho ou amarelo)
- **Ficheiros novos** (não rastreados)
- **Ficheiros prontos para commit** (em verde)

### 3️⃣ Adicionar as Alterações

#### Opção A: Adicionar TODOS os ficheiros alterados
```powershell
git add .
```

#### Opção B: Adicionar ficheiros específicos
```powershell
git add nome-do-ficheiro.js
git add outro-ficheiro.md
```

**Exemplo:**
```powershell
git add GUIA_GITHUB.md
git add GUIA_COLABORADOR.md
```

### 4️⃣ Verificar o que vai ser commitado

```powershell
git status
```

Agora os ficheiros devem aparecer em **verde** (staged/ready to commit).

### 5️⃣ Fazer o Commit

```powershell
git commit -m "Descrição clara das alterações"
```

**Exemplos de mensagens de commit:**
```powershell
git commit -m "Adiciona guias para GitHub e colaboradores"
git commit -m "Atualiza documentação do projeto"
git commit -m "Corrige bug na validação de email"
git commit -m "Adiciona nova funcionalidade de pesquisa"
```

**Dicas:**
- ✅ Seja claro e descritivo
- ✅ Use português ou inglês (consistente)
- ✅ Use o presente do indicativo: "Adiciona", "Corrige", "Atualiza"
- ❌ Evite mensagens vagas como "alterações" ou "fix"

### 6️⃣ Enviar para o GitHub (Push)

```powershell
git push origin main
```

**Nota:** Se for a primeira vez, pode ser:
```powershell
git push -u origin main
```

Ou se a branch se chama `master`:
```powershell
git push origin master
```

### 7️⃣ Verificar no GitHub

Aceda ao seu repositório no GitHub e confirme que as alterações aparecem.

---

## 🔄 Fluxo Completo (Resumo)

```powershell
# 1. Verificar alterações
git status

# 2. Adicionar alterações
git add .

# 3. Fazer commit
git commit -m "Descrição das alterações"

# 4. Enviar para GitHub
git push origin main
```

---

## ⚠️ Situações Especiais

### Se houver alterações no GitHub que você não tem localmente:

```powershell
# Primeiro, atualizar do GitHub
git pull origin main

# Depois, fazer o seu commit
git add .
git commit -m "Sua mensagem"
git push origin main
```

### Se houver conflitos:

1. O Git mostrará quais ficheiros têm conflitos
2. Abra os ficheiros e procure por:
   ```
   <<<<<<< HEAD
   seu código
   =======
   código do GitHub
   >>>>>>> branch-name
   ```
3. Resolva manualmente os conflitos
4. Depois:
   ```powershell
   git add .
   git commit -m "Resolve conflitos"
   git push origin main
   ```

### Ver o que foi alterado antes de fazer commit:

```powershell
# Ver diferenças
git diff

# Ver diferenças de um ficheiro específico
git diff nome-do-ficheiro.js
```

### Desfazer alterações antes de fazer commit:

```powershell
# Desfazer alterações de um ficheiro específico
git checkout nome-do-ficheiro.js

# Desfazer todas as alterações não commitadas
git checkout .
```

### Alterar a mensagem do último commit:

```powershell
git commit --amend -m "Nova mensagem"
```

---

## ✅ Checklist Antes de Fazer Push

- [ ] Fiz `git status` para ver o que vai ser commitado
- [ ] A mensagem do commit é clara e descritiva
- [ ] Testei o código (se aplicável)
- [ ] Não há ficheiros sensíveis (.env, passwords, etc.)
- [ ] Fiz `git pull` se houver alterações no GitHub

---

**Bom trabalho! 🚀**

