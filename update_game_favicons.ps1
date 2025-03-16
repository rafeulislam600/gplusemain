$gameDir = "c:\Users\pc\Downloads\GEOMETRY-DASH-UNBLOCKE\GEOMETRY DASH UNBLOCKED\game"
$files = Get-ChildItem -Path $gameDir -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update favicon link
    $content = $content -replace '(<link rel="icon".*?href=").*?(".*?>)', '${1}../assets/img/logo/newlogo.png${2}'
    
    # Save the changes
    $content | Set-Content -Path $file.FullName -Force
}

Write-Host "Updated favicons in all game templates successfully!"
