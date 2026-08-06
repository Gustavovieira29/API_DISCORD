
param(
    [Parameter(Mandatory=$true)]
    [string]$Mensagem
)
 
# Monta o JSON em memoria (evita problema de aspas)
$jsonBody = @{ content = $Mensagem } | ConvertTo-Json -Compress
 
# Escreve em UTF-8 SEM BOM (evita erro 50109 do Discord)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText("$PWD\body.json", $jsonBody, $utf8NoBom)
 
# Envia
curl.exe -X POST "https://discord.com/api/v10/channels/$env:DISCORD_CANAL_ID/messages" `
    -H "Authorization: Bot $env:DISCORD_TOKEN" `
    -H "Content-Type: application/json" `
    -d "@body.json"
 