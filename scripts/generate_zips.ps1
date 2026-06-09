$source = "public\Musica Tacariguera"
$dest = "public\descargas\musica"

If (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Force -Path $dest
}

$folders = Get-ChildItem -Path $source -Directory

foreach ($folder in $folders) {
    $safeName = $folder.Name -replace '[^a-zA-Z0-9_\-]', '_'
    $zipPath = Join-Path $dest ($safeName + ".zip")
    
    Write-Host "Zipping $($folder.Name) to $zipPath"
    Compress-Archive -Path "$($folder.FullName)\*" -DestinationPath $zipPath -Force
}
Write-Host "All zips generated!"
