# Portfolio deploy helper
# Usage: .\deploy.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "=== Rajveer Portfolio Deploy Helper ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Get it from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Update portfolio site"
    Write-Host "Changes committed." -ForegroundColor Green
} else {
    Write-Host "No new changes to commit." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Publish on GitHub Pages (recommended) ===" -ForegroundColor Green
Write-Host ""
Write-Host "Your GitHub: https://github.com/rajveersinghchouhan"
Write-Host ""
Write-Host "Step 1 - Create repository"
Write-Host "  Open: https://github.com/new"
Write-Host "  Repository name: rajveersinghchouhan.github.io"
Write-Host "  Visibility: Public"
Write-Host "  Do NOT add README, .gitignore, or license"
Write-Host ""
Write-Host "Step 2 - Push this folder"
Write-Host '  git remote add origin https://github.com/rajveersinghchouhan/rajveersinghchouhan.github.io.git'
Write-Host "  git push -u origin main"
Write-Host ""
Write-Host "Step 3 - Wait 1-3 minutes"
Write-Host "  Live site: https://rajveersinghchouhan.github.io/"
Write-Host ""
Write-Host "Alternative repo name: rajveer-portfolio"
Write-Host "  Live site: https://rajveersinghchouhan.github.io/rajveer-portfolio/"
Write-Host "  Enable Pages: Settings > Pages > Deploy from branch > main / root"
Write-Host ""
Write-Host "=== Fast option: Netlify Drop ===" -ForegroundColor Green
Write-Host "  Open https://app.netlify.com/drop and drag this folder"
Write-Host ""
