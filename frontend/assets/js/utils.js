/* ============================================
   Finora - Utility Functions
   Shared utility functions for the application
   ============================================ */

/**
 * Format currency based on user settings
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    // Get user's currency preference from settings
    const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
    const currency = settings.currency || 'INR';
    
    // Currency symbols
    const currencySymbols = {
        'INR': '₹',
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥'
    };
    
    // Currency locales for proper number formatting
    const locales = {
        'INR': 'en-IN',
        'USD': 'en-US',
        'EUR': 'de-DE',
        'GBP': 'en-GB',
        'JPY': 'ja-JP'
    };
    
    const locale = locales[currency] || 'en-IN';
    const symbol = currencySymbols[currency] || '₹';
    
    // Format number with proper locale
    const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: currency === 'JPY' ? 0 : 2,
        maximumFractionDigits: currency === 'JPY' ? 0 : 2
    }).format(Math.abs(amount));
    
    return `${symbol}${formatted}`;
}

/**
 * Format date based on user settings
 * @param {Date|string} date - The date to format
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Formatted date string
 */
function formatDate(date, includeTime = false) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
    const dateFormat = settings.dateFormat || 'DD/MM/YYYY';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    let dateStr;
    switch (dateFormat) {
        case 'MM/DD/YYYY':
            dateStr = `${month}/${day}/${year}`;
            break;
        case 'YYYY-MM-DD':
            dateStr = `${year}-${month}-${day}`;
            break;
        case 'DD/MM/YYYY':
        default:
            dateStr = `${day}/${month}/${year}`;
    }
    
    if (includeTime) {
        dateStr += ' ' + formatTime(date);
    }
    
    return dateStr;
}

/**
 * Format time based on user settings
 * @param {Date|string} date - The date/time to format
 * @returns {string} Formatted time string
 */
function formatTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
    const timeFormat = settings.timeFormat || '12';
    
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    if (timeFormat === '12') {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    } else {
        return `${String(hours).padStart(2, '0')}:${minutes}`;
    }
}

/**
 * Format date for display (with month name)
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string like "Dec 30, 2025"
 */
function formatDateLong(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    
    const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
    const dateFormat = settings.dateFormat || 'DD/MM/YYYY';
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    switch (dateFormat) {
        case 'MM/DD/YYYY':
            return `${month} ${day}, ${year}`;
        case 'YYYY-MM-DD':
            return `${year} ${month} ${day}`;
        case 'DD/MM/YYYY':
        default:
            return `${day} ${month} ${year}`;
    }
}

/**
 * Get category icon
 * @param {string} categoryName - Category name
 * @returns {string} Icon name
 */
function getCategoryIcon(categoryName) {
    const categories = window.FINORA_CONFIG?.categories || [];
    const category = categories.find(c => c.name === categoryName);
    return category?.icon || 'circle';
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export to global scope
window.FINORA_UTILS = {
    formatCurrency,
    formatDate,
    formatTime,
    formatDateLong,
    getCategoryIcon,
    debounce
};
