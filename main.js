// Main JavaScript for CV website
(function() {
    'use strict';

    // Throttle function to limit function execution rate
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    try {
        document.addEventListener('DOMContentLoaded', () => {
            try {
                const titleContainer = document.getElementById('title-container');
                if (!titleContainer) return;

                const isSmallScreen = window.matchMedia('(max-width: 768px)');

                const toggleFixedPosition = () => {
                    if (!isSmallScreen.matches) {
                        // Reset styles if not small screen
                        titleContainer.style.opacity = '';
                        titleContainer.classList.remove('fixed-title-container');
                        titleContainer.classList.add('text-3xl');
                        return;
                    }
                    const scrollY = window.scrollY;
                    titleContainer.style.opacity = scrollY > 1000 ? 0 : 1;
                    titleContainer.classList.toggle('fixed-title-container', scrollY > 150);
                    titleContainer.classList.toggle('text-3xl', scrollY <= 150);
                };

                // Throttle scroll events to ~60fps (16ms)
                const throttledToggle = throttle(toggleFixedPosition, 16);

                isSmallScreen.addEventListener('change', toggleFixedPosition);
                window.addEventListener('scroll', throttledToggle, { passive: true });

                // Update experience dynamically
                const currentYear = new Date().getFullYear();
                const startYear = 2012;
                const experience = currentYear - startYear;
                document.querySelectorAll("[data-experience]").forEach(el => {
                    el.textContent = experience;
                });

                document.documentElement.classList.add('loaded');
            } catch (error) {
                console.error('Error initializing CV features:', error);
            }
        });
    } catch (error) {
        console.error('Error setting up DOMContentLoaded listener:', error);
    }
})();

