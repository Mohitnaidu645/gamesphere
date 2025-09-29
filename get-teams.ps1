
# get-teams.ps1
# Script to fetch all registered teams from the backend

$uri = "http://localhost:5000/teams"

Write-Host "Sending request to $uri..."
$response = Invoke-RestMethod -Uri $uri -Method GET

Write-Host "Server response:"
$response | ConvertTo-Json -Depth 10
