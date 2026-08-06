Get-Content .\.env | ForEach-Object {
  if ($_ -match '^\s*([^#=]+?)\s*=\s*(.*)$') {
    Set-Item -Path ("env:" + $Matches[1]) -Value $Matches[2]
  }
}
Write-Host "Variaveis carregadas: DISCORD_TOKEN, DISCORD_PUBLIC_KEY, DISCORD_APPLICATION_ID, DISCORD_GUILD_ID, DISCORD_CANAL_ID"
