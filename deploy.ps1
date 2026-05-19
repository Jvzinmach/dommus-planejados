# Script de deploy automatizado para GitHub Pages
$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando build da Dommus Planejados..." -ForegroundColor Cyan

# 1. Executa o build do Vite
npm run build

Write-Host "✅ Build concluído com sucesso!" -ForegroundColor Green
Write-Host "📦 Preparando arquivos para deploy..." -ForegroundColor Cyan

# 2. Navega para a pasta de build
cd dist

# 3. Inicializa repositório temporário para deploy
git init
git checkout -B gh-pages
git add -A
git commit -m "Deploy automatico: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')"

Write-Host "📤 Fazendo push para a branch gh-pages do GitHub..." -ForegroundColor Yellow

# 4. Push forçado para a branch gh-pages no repositório remoto
git push -f https://github.com/Jvzinmach/dommus-planejados.git gh-pages

# 5. Retorna ao diretório anterior
cd ..

Write-Host "🎉 Site publicado com sucesso no GitHub Pages!" -ForegroundColor Green
Write-Host "🌐 Acesse: https://dommusplanejados.com.br" -ForegroundColor Green
