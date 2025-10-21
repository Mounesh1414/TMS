# Script to seed admin and sample data for Indian Tickets

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Indian Tickets - Data Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Wait for server to be ready
Write-Host "Waiting for backend server..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Seed Admin
Write-Host "Creating admin account..." -ForegroundColor Yellow
try {
    $adminResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/seed-admin" -Method POST -ContentType "application/json"
    Write-Host "✅ Admin created successfully!" -ForegroundColor Green
    Write-Host "   Email: admin@indiantickets.com" -ForegroundColor White
    Write-Host "   Password: admin123" -ForegroundColor White
} catch {
    Write-Host "⚠️  Admin might already exist or server not ready" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:5173 in your browser" -ForegroundColor White
Write-Host "2. Login as admin (admin@indiantickets.com / admin123)" -ForegroundColor White
Write-Host "3. Add trains, buses, and flights from Admin Dashboard" -ForegroundColor White
Write-Host "4. Register as a user and book tickets!" -ForegroundColor White
Write-Host ""
