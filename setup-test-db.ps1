# Script para criar base de dados de teste
# Executa: .\setup-test-db.ps1

Write-Host "Configurando base de dados de teste..." -ForegroundColor Cyan

$dbName = "gestao_filmes_test"
$dbUser = "postgres"
$dbPassword = "postgres"

# Verificar se a base de dados ja existe
Write-Host "Verificando se a base de dados '$dbName' existe..." -ForegroundColor Yellow

$checkDb = psql -U $dbUser -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$dbName'" 2>&1

if ($checkDb -eq "1") {
    Write-Host "Base de dados '$dbName' ja existe!" -ForegroundColor Green
} else {
    Write-Host "Criando base de dados '$dbName'..." -ForegroundColor Yellow
    
    # Criar base de dados
    $env:PGPASSWORD = $dbPassword
    $result = psql -U $dbUser -d postgres -c "CREATE DATABASE $dbName;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Base de dados '$dbName' criada com sucesso!" -ForegroundColor Green
    } else {
        Write-Host "Erro ao criar base de dados. Verifique as credenciais PostgreSQL." -ForegroundColor Red
        Write-Host $result
        exit 1
    }
}

Write-Host ""
Write-Host "Agora pode executar os testes:" -ForegroundColor Cyan
Write-Host "   npm test" -ForegroundColor White
Write-Host ""
