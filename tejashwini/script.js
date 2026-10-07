/**
 * TEJASHWINI R. - Minimalist Futuristic Editorial Portfolio Hero Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Management (prefers-color-scheme + localStorage + Manual Toggle) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const toggleText = document.getElementById('theme-toggle-text');
    const htmlElement = document.documentElement;

    // Detect system preference or saved preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (toggleText) {
            toggleText.textContent = theme === 'dark' ? 'NIGHT' : 'DAY';
        }
    }

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark.matches ? 'dark' : 'light');
    }

    // Listen for OS system theme changes if user hasn't overridden
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Manual Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // --- 2. Interactive Artwork Parallax & Tilt Effect ---
    const heroStage = document.getElementById('hero-stage');
    const artworkInner = document.getElementById('artwork-inner');
    const heroSection = document.getElementById('hero');

    if (heroSection && artworkInner) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let currentRotateX = 0;
        let currentRotateY = 0;

        window.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            // Normalized mouse position from -1 to 1
            mouseX = (e.clientX / innerWidth - 0.5) * 2;
            mouseY = (e.clientY / innerHeight - 0.5) * 2;

            targetRotateX = -mouseY * 8; // Max 8deg tilt
            targetRotateY = mouseX * 8;
        });

        // Smooth damping animation loop
        function updateParallax() {
            currentX += (mouseX * 20 - currentX) * 0.06;
            currentY += (mouseY * 20 - currentY) * 0.06;
            currentRotateX += (targetRotateX - currentRotateX) * 0.06;
            currentRotateY += (targetRotateY - currentRotateY) * 0.06;

            artworkInner.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
            
            requestAnimationFrame(updateParallax);
        }
        updateParallax();
    }

    // --- 3. Header Scrolled State ---
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // --- 4. Interactive Glitch Sound / Micro-Interaction on Artwork Hover ---
    const artworkContainer = document.querySelector('.artwork-container');
    if (artworkContainer) {
        artworkContainer.addEventListener('mouseenter', () => {
            artworkContainer.style.transition = 'transform 0.15s ease';
        });

        artworkContainer.addEventListener('mouseleave', () => {
            artworkContainer.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }
});
