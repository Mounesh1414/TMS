#!/usr/bin/env pwsh

# Deploy Script - Build and Deploy Frontend Only
# This script builds the frontend and prepares it for deployment
# WITHOUT exposing source code

Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the correct directory
if (-Not (Test-Path "frontend/package.json")) {
    Write-Host "❌ Error: Must run from TMS root directory" -ForegroundColor Red
    exit 1
}

# Step 1: Build Frontend
Write-Host "📦 Building Frontend..." -ForegroundColor Yellow
Set-Location frontend

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build production bundle
Write-Host "Building production bundle..." -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Create deployment directory
Write-Host "📁 Preparing deployment files..." -ForegroundColor Yellow
$deployDir = "deploy-temp"

if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}

New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy only built files
Write-Host "Copying built files..." -ForegroundColor Gray
Copy-Item -Recurse "frontend/dist/*" $deployDir

# Copy essential files only
if (Test-Path "README.md") {
    # Create a public README without implementation details
    @"
# TMS - Transport Management System

A modern transport management system for booking trains, buses, and flights.

## Features
- 🚂 Train Booking
- 🚌 Bus Booking
- ✈️ Flight Booking
- 📱 Responsive Design
- 🔐 Secure Authentication

## Live Demo
Visit the application to start booking!

---
*This is a production deployment. Source code is private.*
"@ | Out-File -FilePath "$deployDir/README.md"
}

# Create .nojekyll
New-Item -ItemType File -Path "$deployDir/.nojekyll" | Out-Null

Write-Host "✅ Deployment files prepared!" -ForegroundColor Green
Write-Host ""

# Step 3: Display deployment info
Write-Host "📊 Deployment Summary:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Deployment Directory: ./$deployDir" -ForegroundColor White
Write-Host "Files included: Built frontend only (no source code)" -ForegroundColor White
Write-Host "Ready for deployment to: GitHub Pages, Netlify, Vercel, etc." -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Review files in './$deployDir' directory" -ForegroundColor White
Write-Host "2. Push to 'gh-pages' branch: " -ForegroundColor White
Write-Host "   cd $deployDir" -ForegroundColor DarkGray
Write-Host "   git init" -ForegroundColor DarkGray
Write-Host "   git add -A" -ForegroundColor DarkGray
Write-Host "   git commit -m 'Deploy production build'" -ForegroundColor DarkGray
Write-Host "   git branch -M gh-pages" -ForegroundColor DarkGray
Write-Host "   git remote add origin https://github.com/Mounesh1414/TMS.git" -ForegroundColor DarkGray
Write-Host "   git push -f origin gh-pages" -ForegroundColor DarkGray
Write-Host ""
Write-Host "✨ Or use GitHub Actions (already configured in .github/workflows/deploy.yml)" -ForegroundColor Green
Write-Host ""
Write-Host "🔐 Source code remains private in main branch!" -ForegroundColor Yellow
