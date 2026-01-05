# Script de Setup - API Gestão de Filmes
# Execute: .\setup.ps1

Write-Host "🚀 Configuração do Projeto - API Gestão de Filmes" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar PostgreSQL
Write-Host "1️⃣ Verificando PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service | Where-Object {$_.DisplayName -like "*postgres*" -or $_.Name -like "*postgres*"} | Select-Object -First 1

if ($pgService) {
    Write-Host "   ✅ PostgreSQL encontrado: $($pgService.DisplayName)" -ForegroundColor Green
    Write-Host "   Status: $($pgService.Status)" -ForegroundColor $(if ($pgService.Status -eq 'Running') {'Green'} else {'Red'})
    
    if ($pgService.Status -ne 'Running') {
        Write-Host "   ⚠️  PostgreSQL não está a correr!" -ForegroundColor Red
        Write-Host "   Tentando iniciar..." -ForegroundColor Yellow
        try {
            Start-Service -Name $pgService.Name
            Write-Host "   ✅ PostgreSQL iniciado!" -ForegroundColor Green
        } catch {
            Write-Host "   ❌ Erro ao iniciar PostgreSQL: $_" -ForegroundColor Red
            Write-Host "   Por favor, inicie manualmente via Services (services.msc)" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "   ❌ PostgreSQL não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   📥 Opções para instalar:" -ForegroundColor Yellow
    Write-Host "   1. Download: https://www.postgresql.org/download/windows/" -ForegroundColor Cyan
    Write-Host "   2. Ou usar Docker: docker run --name postgres-tp-sd -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gestao_filmes -p 5432:5432 -d postgres:15-alpine" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host ""

# 2. Verificar ficheiro .env
Write-Host "2️⃣ Verificando ficheiro .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   ✅ Ficheiro .env existe" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Ficheiro .env não existe" -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "   ✅ Ficheiro .env criado a partir de .env.example" -ForegroundColor Green
        Write-Host "   ⚠️  IMPORTANTE: Edite o .env e configure a password do PostgreSQL!" -ForegroundColor Red
    } else {
        Write-Host "   ❌ Ficheiro .env.example não encontrado!" -ForegroundColor Red
    }
}

Write-Host ""

# 3. Verificar node_modules
Write-Host "3️⃣ Verificando dependências..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✅ node_modules existe" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  node_modules não existe" -ForegroundColor Yellow
    Write-Host "   Instalando dependências..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Dependências instaladas!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Erro ao instalar dependências!" -ForegroundColor Red
    }
}

Write-Host ""

# 4. Resumo
Write-Host "📋 Próximos Passos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1. Configure o ficheiro .env com a password do PostgreSQL" -ForegroundColor White
Write-Host "   2. Crie a base de dados 'gestao_filmes' (via pgAdmin ou Cursor)" -ForegroundColor White
Write-Host "   3. Execute: npm run migrate:latest" -ForegroundColor White
Write-Host "   4. Execute: npm run seed:run" -ForegroundColor White
Write-Host "   5. Execute: npm start" -ForegroundColor White
Write-Host ""
Write-Host "📚 Consulte GUIA_INSTALACAO_COMPLETA.md para mais detalhes" -ForegroundColor Cyan
Write-Host ""

