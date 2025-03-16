$directories = @(
    ".",  # Root directory
    "action",
    "adventure",
    "bike",
    "car",
    "idle",
    "shooting",
    "skill",
    "sport",
    "classroom6x",
    "game"
)

$baseDir = "c:\Users\pc\Downloads\GEOMETRY-DASH-UNBLOCKE\GEOMETRY DASH UNBLOCKED"

foreach ($dir in $directories) {
    $searchPath = Join-Path $baseDir $dir
    if ($dir -eq "game") {
        $files = Get-ChildItem -Path $searchPath -Filter "*.html"
    } else {
        $filePath = Join-Path $searchPath "index.html"
        $files = @(Get-Item $filePath)
    }

    foreach ($file in $files) {
        $content = Get-Content -Path $file.FullName -Raw
        
        # Remove the old contact section that appears at the bottom
        $content = $content -replace '(?s)<div class="contact-us">\s*<h2>CONTACT US</h2>.*?<div class="footer-top-area">', '<div class="footer-top-area">'
        $content = $content -replace '(?s)<div class="contact-us">\s*<h2>CONTACT US</h2>.*?<div class="footer-bottom">', '<div class="footer-bottom">'
        
        # Also remove any standalone contact section
        $content = $content -replace '(?s)<div class="contact-us">\s*<h2>CONTACT US</h2>.*?</div>\s*</div>\s*</div>', ''
        
        # Save the changes
        $content | Set-Content -Path $file.FullName -Force
        Write-Host "Updated $($file.FullName)"
    }
}

Write-Host "Removed old contact sections successfully!"
