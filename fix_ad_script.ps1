$gameDir = "c:/Users/pc/Downloads/GEOMETRY-DASH-UNBLOCKE/GEOMETRY DASH UNBLOCKED/game"
$files = Get-ChildItem -Path $gameDir -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the problematic ad script section
    $newContent = $content -replace "<div id='div-gpt-ad-1722250890750-0' style='min-width: 970px; min-height: 250px;'><script>(?:\s|\S)*?</script>", "<div id='div-gpt-ad-1722250890750-0' style='min-width: 970px; min-height: 250px;'>`n    <script>`n        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1722250890750-0'); });`n    </script>`n</div>"
    
    # Save the changes
    $newContent | Set-Content -Path $file.FullName -NoNewline
}
