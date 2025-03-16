$gameDir = "c:\Users\pc\Downloads\GEOMETRY-DASH-UNBLOCKE\GEOMETRY DASH UNBLOCKED\game"
$files = Get-ChildItem -Path $gameDir -Filter "*.html"

$newFooterContent = @'
<div class="footer-top-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="single-footer">
                    <h3>About us</h3>
                    <p>Welcome to Unblocked Games 76! We offer a wide selection of fun and exciting games that you can play anytime, anywhere. Our platform provides unblocked access to games. ensuring that you can enjoy your favorite titles without any interruptions. Join us today for endless entertainment and thrilling gameplay experiences!</p>
                </div>
            </div>
            <div class="col-lg-5 col-md-6 col-sm-12">
                <div class="widget-content">
                    <div class="row clearfix">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="single-footer">
                                <h3>Most Play</h3>
                                <ul>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Drift Hunters</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Drive Mad</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Blumgi rocket</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>1V1.lol Unblocked</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Eggy Car</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="single-footer">
                                <h3>Most Popular</h3>
                                <ul>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Moto X3M</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Survival Race</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Drift Boss</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Idle Breakout</a></li>
                                    <li><a href="#"><span class="fa fa-caret-right"></span>Angry gran Run</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="single-footer">
                    <h3>Contact Us</h3>
                    <div class="footer-contact">
                        <h4 class="title"><i class="fa fa-envelope"></i>Email Address</h4>
                        <p>cropscince@gmail.com</p>
                    </div>
                    <div class="footer-contact">
                        <h4 class="title"><i class="fa fa-phone"></i>Whatsapp</h4>
                        <p>+61485906541</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
'@

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace the footer content
    $content = $content -replace '(?s)<div class="footer-top-area">.*?</div>\s*</div>\s*</div>', $newFooterContent
    
    # Save the changes
    $content | Set-Content -Path $file.FullName -Force
}

Write-Host "Updated footer content in all game templates successfully!"
