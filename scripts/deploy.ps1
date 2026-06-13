# Portfolio deploy helper
# Usage: .\scripts\deploy.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host ""
Write-Host "=== Rajveer Portfolio Deploy ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed. Get it from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
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
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "Live site: https://rajveersinghchouhan68.github.io/" -ForegroundColor Green
Write-Host "Allow 1-2 minutes for GitHub Pages to update." -ForegroundColor Yellow
Write-Host ""
