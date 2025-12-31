// ============================================
// Finora - Settings Page JavaScript
// ============================================

(function() {
    'use strict';

    // Wait for DOM and config to load
    function initSettings() {
        if (typeof window.FINORA_CONFIG === 'undefined') {
            setTimeout(initSettings, 100);
            return;
        }

        setupNavigationHandlers();
        loadUserSettings();
        setupFormHandlers();
        
        console.log('[Settings] Page initialized');
    }

    // Setup navigation between settings sections
    function setupNavigationHandlers() {
        const navButtons = document.querySelectorAll('.settings-nav__item');
        const sections = document.querySelectorAll('.settings-section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.dataset.section;
                
                // Update active button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show corresponding section
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `section-${sectionId}`) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    // Load user settings from localStorage
    function loadUserSettings() {
        const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
        
        // Currency
        const currencySelect = document.getElementById('currency-select');
        if (currencySelect && settings.currency) {
            currencySelect.value = settings.currency;
        }

        // Date format
        const dateFormatSelect = document.getElementById('date-format-select');
        if (dateFormatSelect && settings.dateFormat) {
            dateFormatSelect.value = settings.dateFormat;
        }

        // Time format
        const timeFormatSelect = document.getElementById('time-format-select');
        if (timeFormatSelect && settings.timeFormat) {
            timeFormatSelect.value = settings.timeFormat;
        }

        // Language
        const languageSelect = document.getElementById('language-select');
        if (languageSelect && settings.language) {
            languageSelect.value = settings.language;
        }

        // Theme
        const themeButtons = document.querySelectorAll('.theme-option');
        const currentTheme = settings.theme || 'dark';
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === currentTheme) {
                btn.classList.add('active');
            }
        });

        // Toggles
        setToggle('compact-mode', settings.compactMode);
        setToggle('animations-toggle', settings.animations !== false);
        setToggle('budget-alerts', settings.budgetAlerts !== false);
        setToggle('transaction-alerts', settings.transactionAlerts);
        setToggle('monthly-reports', settings.monthlyReports !== false);
        setToggle('push-notifications', settings.pushNotifications);
    }

    // Helper to set toggle state
    function setToggle(id, value) {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.checked = value === true;
        }
    }

    // Setup form change handlers
    function setupFormHandlers() {
        // Currency change
        const currencySelect = document.getElementById('currency-select');
        if (currencySelect) {
            currencySelect.addEventListener('change', (e) => {
                saveSetting('currency', e.target.value);
                showNotification('Currency preference updated');
            });
        }

        // Date format change
        const dateFormatSelect = document.getElementById('date-format-select');
        if (dateFormatSelect) {
            dateFormatSelect.addEventListener('change', (e) => {
                saveSetting('dateFormat', e.target.value);
                showNotification('Date format updated - refresh to see changes');
            });
        }

        // Time format change
        const timeFormatSelect = document.getElementById('time-format-select');
        if (timeFormatSelect) {
            timeFormatSelect.addEventListener('change', (e) => {
                saveSetting('timeFormat', e.target.value);
                showNotification('Time format updated - refresh to see changes');
            });
        }

        // Language change
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                saveSetting('language', e.target.value);
                const langNames = {
                    'en': 'English',
                    'hi': 'हिन्दी',
                    'ta': 'தமிழ்',
                    'te': 'తెలుగు'
                };
                showNotification(`Language set to ${langNames[e.target.value] || e.target.value}`);
            });
        }

        // Theme selection
        const themeButtons = document.querySelectorAll('.theme-option');
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                themeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const theme = button.dataset.theme;
                saveSetting('theme', theme);
                
                // Apply theme using theme.js
                if (window.FINORA_THEME && typeof window.FINORA_THEME.setTheme === 'function') {
                    window.FINORA_THEME.setTheme(theme);
                } else {
                    // Fallback direct implementation
                    localStorage.setItem('finora_theme', theme);
                    document.documentElement.setAttribute('data-theme', theme);
                }
                
                showNotification(`Theme changed to ${theme}`);
            });
        });

        // Toggle switches
        setupToggleHandler('compact-mode', 'compactMode', 'Compact mode');
        setupToggleHandler('animations-toggle', 'animations', 'Animations');
        setupToggleHandler('budget-alerts', 'budgetAlerts', 'Budget alerts');
        setupToggleHandler('transaction-alerts', 'transactionAlerts', 'Transaction alerts');
        setupToggleHandler('monthly-reports', 'monthlyReports', 'Monthly reports');
        setupToggleHandler('push-notifications', 'pushNotifications', 'Push notifications');

        // Action buttons
        setupActionButtons();
    }

    // Setup toggle handler
    function setupToggleHandler(elementId, settingKey, label) {
        const toggle = document.getElementById(elementId);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                saveSetting(settingKey, e.target.checked);
                showNotification(`${label} ${e.target.checked ? 'enabled' : 'disabled'}`);
            });
        }
    }

    // Setup action buttons
    function setupActionButtons() {
        // Change password
        const changePasswordBtn = document.querySelector('[data-lucide="key"]')?.closest('.btn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                alert('Change Password feature will be implemented in a future update.');
            });
        }

        // Enable 2FA
        const enable2FABtn = document.querySelector('.btn--secondary.btn--sm');
        if (enable2FABtn && enable2FABtn.textContent.includes('2FA')) {
            enable2FABtn.addEventListener('click', () => {
                alert('Two-Factor Authentication will be implemented in a future update.');
            });
        }

        // Sign out all devices
        const signOutBtn = document.querySelector('.btn--danger.btn--sm');
        if (signOutBtn) {
            signOutBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to sign out from all devices?')) {
                    alert('This feature will be implemented in a future update.');
                }
            });
        }

        // Export data
        const exportBtn = document.querySelector('[data-lucide="download"]')?.closest('.btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportUserData);
        }

        // Clear data
        const clearDataBtn = document.querySelector('[data-lucide="trash-2"]')?.closest('.btn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', clearAllData);
        }

        // Delete account
        const deleteAccountBtn = document.querySelector('[data-lucide="alert-triangle"]')?.closest('.btn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', deleteAccount);
        }
    }

    // Save setting to localStorage
    function saveSetting(key, value) {
        const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');
        settings[key] = value;
        localStorage.setItem('finora_settings', JSON.stringify(settings));
    }

    // Export user data
    function exportUserData() {
        const data = {
            settings: JSON.parse(localStorage.getItem('finora_settings') || '{}'),
            state: JSON.parse(localStorage.getItem('finora_state') || '{}'),
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finora-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('Data exported successfully');
    }

    // Clear all data
    function clearAllData() {
        if (!confirm('Are you sure you want to clear all transactions and budgets? This action cannot be undone.')) {
            return;
        }

        if (!confirm('This will permanently delete all your financial data. Are you absolutely sure?')) {
            return;
        }

        // Clear state but keep settings
        localStorage.removeItem('finora_state');
        
        // Reload state if available
        if (typeof window.FINORA_STATE !== 'undefined') {
            window.FINORA_STATE = {
                transactions: [],
                budgets: [],
                categories: window.FINORA_CONFIG?.categories || []
            };
        }

        showNotification('All data cleared successfully');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }

    // Delete account
    function deleteAccount() {
        if (!confirm('Are you sure you want to delete your account? This will permanently delete all your data.')) {
            return;
        }

        if (!confirm('This action is irreversible. Type "DELETE" in the next prompt to confirm.')) {
            return;
        }

        const confirmation = prompt('Type "DELETE" to confirm account deletion:');
        if (confirmation !== 'DELETE') {
            alert('Account deletion cancelled.');
            return;
        }

        // Clear all localStorage
        localStorage.clear();

        alert('Your account has been deleted. You will be redirected to the login page.');
        
        // Redirect to login
        window.location.href = '../auth/login.html';
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: calc(var(--navbar-height) + 20px);
            right: 20px;
            background: var(--primary-accent);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSettings);
    } else {
        initSettings();
    }

})();
