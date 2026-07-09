$path = (Resolve-Path 'src\views\AdminDashboardModule.jsx').Path
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::Unicode)
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "AdminDashboardModule.jsx re-codificado a UTF-8 exitosamente."
