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
        
        # Remove the duplicate contact section with address and phone
        $content = $content -replace '(?s)<div class="single-footer">\s*<h3>Contact Us</h3>\s*<div class="footer-contact">\s*<h4 class="title"><i class="fa fa-map-marker"></i>Address\s*</h4>\s*<p>88 Road, Broklyn Street<br>New York, USA</p>\s*</div>\s*<div class="footer-contact">\s*<h4 class="title"><i class="fa fa-envelope"></i>Email Address</h4>\s*<p>info@example.com</p>\s*</div>\s*<div class="footer-contact">\s*<h4 class="title"><i class="fa fa-phone"></i>Phone\s*</h4>\s*<p>777-1234-567</p>\s*</div>\s*</div>', ''
        
        # Save the changes
        $content | Set-Content -Path $file.FullName -Force
        Write-Host "Updated $($file.FullName)"
    }
}

Write-Host "Removed duplicate contact sections successfully!"
