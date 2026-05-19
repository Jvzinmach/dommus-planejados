# Script de deploy automatizado para GitHub Pages
$ErrorActionPreference = "Stop"

# Carrega o token de autenticação de forma segura
# (O script original lia do root, mas ao rodar 'cd dist' o PSScriptRoot/parent root pode mudar,
#  então resolvemos o caminho absoluto do diretório root antes de navegar)
$rootDir = $PSScriptRoot
if (-not $rootDir) { $rootDir = Get-Location }
$tokenFile = Join-Path $rootDir ".github_token"

if (Test-Path $tokenFile) {
    $token = (Get-Content $tokenFile -Raw).Trim()
} else {
    $token = $env:GITHUB_TOKEN
}

if (-not $token) {
    Write-Error "Erro: Token do GitHub não encontrado. Crie o arquivo .github_token na raiz ou defina GITHUB_TOKEN."
}

Write-Host "🚀 Iniciando build da Dommus Planejados..." -ForegroundColor Cyan

# 1. Executa o build do Vite
npm run build

Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green
Write-Host "📦 Preparando arquivos para deploy..." -ForegroundColor Cyan

# 2. Navega para a pasta de build
cd dist

# 3. Inicializa repositório temporário para deploy
git init
git add -A
git commit -m "Deploy automatico: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"
git branch -M gh-pages

Write-Host "📤 Fazendo push para a branch gh-pages do GitHub..." -ForegroundColor Yellow

# 4. Push forçado para a branch gh-pages no repositório remoto
git push -f "https://Jvzinmach:${token}@github.com/Jvzinmach/dommus-planejados.git" gh-pages

# 5. Retorna ao diretório anterior
cd ..

Write-Host "🎉 Site publicado com sucesso no GitHub Pages!" -ForegroundColor Green
Write-Host "🌐 Acesse: https://dommusplanejados.com.br" -ForegroundColor Green
