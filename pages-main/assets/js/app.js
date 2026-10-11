/**
 * ImageTools Shared UI & Design System Runtime
 * Handles theme toggling (dark/light), scroll effects, active nav states, and micro-interactions
 */

(function () {
    'use strict';

    // Theme initialization
    const THEME_KEY = 'imagetools_theme';
    const root = document.documentElement;

    function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        const toggles = document.querySelectorAll('.theme-toggle-btn');
        toggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun text-warning';
                } else {
                    icon.className = 'fas fa-moon text-slate-700';
                }
            }
        });
    }

    // Apply immediately to prevent flash
    applyTheme(getPreferredTheme());

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(getPreferredTheme());

        // Bind theme toggle clicks
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const current = root.getAttribute('data-theme') || 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                applyTheme(next);
            });
        });

        // Sticky Navbar shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const handleScroll = () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }

        // Back to top button
        const backToTop = document.getElementById('backToTopBtn');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, { passive: true });

            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Highlight active navbar link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkFile = href.split('/').pop().split('#')[0];
                if (linkFile && linkFile === currentPath) {
                    link.classList.add('active');
                }
            }
        });

        // Initialize tooltips if Bootstrap is present
        if (window.bootstrap && window.bootstrap.Tooltip) {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
        }
    });
})();
