# Fix encoding for all views - reads as Unicode, writes as UTF8
$viewsPath = "src\views"
$files = Get-ChildItem -Path $viewsPath -Filter "*.jsx"

foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        # Check for UTF-16 BOM (FF FE)
        if ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
            Write-Host "Re-encoding UTF-16 file: $($file.Name)"
            $content = [System.Text.Encoding]::Unicode.GetString($bytes, 2, $bytes.Length - 2)
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host "  -> Done: $($file.Name)"
        } else {
            Write-Host "OK (already UTF-8): $($file.Name)"
        }
    } catch {
        Write-Host "  -> LOCKED (skip): $($file.Name) - $($_.Exception.Message)"
    }
}

Write-Host "`nAll done."
