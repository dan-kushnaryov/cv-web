// Main JavaScript for CV website
document.addEventListener('DOMContentLoaded', () => {
    const titleContainer = document.getElementById('title-container');
    if (!titleContainer) return;

    const isSmallScreen = window.matchMedia('(max-width: 768px)');

    const toggleFixedPosition = () => {
        if (!isSmallScreen.matches) return;
        const scrollY = window.scrollY;
        titleContainer.style.opacity = scrollY > 1000 ? 0 : 1;
        titleContainer.classList.toggle('fixed-title-container', scrollY > 150);
        titleContainer.classList.toggle('text-3xl', scrollY <= 150);
    };

    isSmallScreen.addEventListener('change', toggleFixedPosition);
    window.addEventListener('scroll', toggleFixedPosition);

    // Update experience dynamically
    const currentYear = new Date().getFullYear();
    const startYear = 2012;
    const experience = currentYear - startYear;
    document.querySelectorAll("[data-experience]").forEach(el => {
        el.textContent = experience;
    });

    document.documentElement.classList.add('loaded');
});

