/* ============================================
   Finora - Theme Management (Light/Dark Mode)
   ============================================ */

const THEME_KEY = 'finora_theme';

// Get current theme
function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
}

// Set theme
function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Toggle between light and dark
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Update the theme toggle icon
function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize theme on page load
function initializeTheme() {
    const theme = getCurrentTheme();
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

// Run on script load
initializeTheme();

// Attach toggle to global scope
window.toggleTheme = toggleTheme;

// Export theme functions
window.FINORA_THEME = {
    getCurrentTheme,
    setTheme,
    toggleTheme,
    initializeTheme
};
