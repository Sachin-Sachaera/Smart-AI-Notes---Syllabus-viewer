Param(
  [string]$Key
)

if (-not $Key) {
  $secure = Read-Host "Enter OpenAI API Key (input hidden)" -AsSecureString
  $Key = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}

if (-not $Key -or $Key.Trim() -eq "") {
  Write-Error "No API key provided. Aborting."
  exit 1
}

$envPath = Join-Path -Path (Get-Location) -ChildPath ".env"
$envContent = "OPENAI_API_KEY=$Key`nPORT=5000"
Set-Content -Path $envPath -Value $envContent -Force
Write-Host "Wrote .env to $envPath" -ForegroundColor Green
