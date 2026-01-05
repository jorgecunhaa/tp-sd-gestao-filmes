# Script para inicializar repositório Git e preparar para GitHub

Write-Host "Inicializando repositório Git..." -ForegroundColor Green

# Navegar para o diretório do projeto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Inicializar repositório Git
if (Test-Path .git) {
    Write-Host "Repositório Git já existe." -ForegroundColor Yellow
} else {
    git init
    Write-Host "Repositório Git inicializado!" -ForegroundColor Green
}

# Adicionar todos os arquivos
Write-Host "Adicionando arquivos ao Git..." -ForegroundColor Green
git add .

# Fazer commit inicial
Write-Host "Criando commit inicial..." -ForegroundColor Green
git commit -m "Initial commit: API Gestão de Filmes - TP Sistemas Distribuídos"

Write-Host "`n✅ Repositório Git configurado com sucesso!" -ForegroundColor Green
Write-Host "`nPróximos passos:" -ForegroundColor Cyan
Write-Host "1. Crie um repositório no GitHub (https://github.com/new)" -ForegroundColor White
Write-Host "2. Execute os seguintes comandos (substitua YOUR_USERNAME e REPO_NAME):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow

