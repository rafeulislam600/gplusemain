$gameDir = "c:\Users\pc\Downloads\GEOMETRY-DASH-UNBLOCKE\GEOMETRY DASH UNBLOCKED\game"
$files = Get-ChildItem -Path $gameDir -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update navbar logo
    $content = $content -replace '(<a class="navbar-brand" href="../index.html"><img src=")../assets/img/logo.png(")', '${1}../assets/img/logo/newlogo.png${2}'
    
    # Update footer logo
    $content = $content -replace '(<div class="footer-logo"><a href=".*?"><img src=")../assets/img/logo.png(")', '${1}../assets/img/logo/newlogo.png${2}'
    
    # Save the changes
    $content | Set-Content -Path $file.FullName -Force
}

Write-Host "Updated logos in all game templates successfully!"
