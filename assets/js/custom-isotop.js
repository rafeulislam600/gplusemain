$(window).on('load', function () {
    // Initialize features
    initializeGoogleAnalytics();
    initializeProjectFilter();
});

// Set up Google Analytics
function initializeGoogleAnalytics() {
    const googleAnalyticsScript = document.createElement('script');
    googleAnalyticsScript.async = true;
    googleAnalyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-6BPGNZNTLZ";
    document.head.appendChild(googleAnalyticsScript);

    googleAnalyticsScript.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-6BPGNZNTLZ');
        console.log('Google Analytics initialized.');
    };
}

// Detect mobile devices
function isMobileDevice() {
    return window.matchMedia("(max-width: 767px)").matches || /Mobi|Android/i.test(navigator.userAgent);
}

// Track events in Google Analytics
function trackEvent(action, category, label, value) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
        console.log(`Event tracked: ${action}, ${category}, ${label}, ${value}`);
    } else {
        console.warn('gtag not initialized. Event not tracked:', action);
    }
}

// Initialize project filter
function initializeProjectFilter() {
    const $container = $('.projectContainer');
    $('.projectFilter a').on('click', function () {
        $('.projectFilter .current').removeClass('current');
        $(this).addClass('current');
        const selector = $(this).attr('data-filter');
        requestAnimationFrame(() => {
            if ($container.length) {
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
            }
        });
        console.log('Project filter applied:', selector);
        return false;
    });
}
