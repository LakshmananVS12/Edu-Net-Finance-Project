// ============================================
// Finora - Profile Page JavaScript
// ============================================

(function() {
    'use strict';

    // Wait for DOM and dependencies to load
    function initProfile() {
        if (typeof window.FINORA_STATE === 'undefined' || typeof window.FINORA_CONFIG === 'undefined') {
            setTimeout(initProfile, 100);
            return;
        }

        loadProfileData();
        loadFinancialStats();
        setupModalHandlers();
        
        console.log('[Profile] Page initialized');
    }

    // Load user profile data
    function loadProfileData() {
        // Get user data from localStorage or use defaults
        const userData = JSON.parse(localStorage.getItem('finora_user') || '{}');
        const settings = JSON.parse(localStorage.getItem('finora_settings') || '{}');

        // Profile header
        const profileName = userData.fullName || 'User Name';
        const profileEmail = userData.email || 'user@example.com';
        const joinDate = userData.joinDate ? formatDate(new Date(userData.joinDate)) : 'December 2025';

        document.getElementById('profile-name').textContent = profileName;
        document.getElementById('profile-email').textContent = profileEmail;
        document.getElementById('join-date').textContent = joinDate;
        document.getElementById('user-greeting')?.textContent = profileName.split(' ')[0];

        // Personal information
        document.getElementById('info-fullname').textContent = userData.fullName || 'John Doe';
        document.getElementById('info-email').textContent = userData.email || 'john.doe@example.com';
        document.getElementById('info-phone').textContent = userData.phone || '+91 98765 43210';
        document.getElementById('info-dob').textContent = userData.dob ? formatDate(new Date(userData.dob)) : 'January 1, 1990';
        document.getElementById('info-location').textContent = userData.location || 'Mumbai, India';
        document.getElementById('info-occupation').textContent = userData.occupation || 'Software Engineer';

        // Load avatar
        if (userData.avatar) {
            document.getElementById('profile-avatar-img').src = userData.avatar;
        }

        // Quick preferences
        updatePreferencesDisplay(settings);
    }

    // Load financial statistics
    function loadFinancialStats() {
        const state = window.FINORA_STATE;
        const transactions = state.transactions || [];
        const budgets = state.budgets || [];

        // Calculate totals
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(txn => {
            const amount = parseFloat(txn.amount) || 0;
            if (txn.type === 'Income') {
                totalIncome += amount;
            } else {
                totalExpenses += amount;
            }
        });

        const netSavings = totalIncome - totalExpenses;
        const activeBudgets = budgets.filter(b => {
            const budgetDate = new Date(b.month);
            const now = new Date();
            return budgetDate.getMonth() === now.getMonth() && 
                   budgetDate.getFullYear() === now.getFullYear();
        }).length;

        // Update financial overview
        document.getElementById('total-income').textContent = formatCurrency(totalIncome);
        document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
        document.getElementById('net-savings').textContent = formatCurrency(netSavings);
        document.getElementById('total-transactions').textContent = transactions.length;

        // Update activity stats
        document.getElementById('active-budgets').textContent = activeBudgets;
        
        // Calculate active days (days with transactions)
        const uniqueDays = new Set(transactions.map(t => {
            const date = new Date(t.date);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }));
        document.getElementById('active-days').textContent = uniqueDays.size;

        // Last login (current time for now)
        document.getElementById('last-login').textContent = 'Just now';
    }

    // Setup modal handlers
    function setupModalHandlers() {
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const editAvatarBtn = document.getElementById('edit-avatar-btn');
        const modal = document.getElementById('edit-profile-modal');
        const closeBtn = document.getElementById('close-edit-profile');
        const cancelBtn = document.getElementById('cancel-edit-profile');
        const saveBtn = document.getElementById('save-profile');

        // Open modal
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', openEditModal);
        }

        // Avatar edit
        if (editAvatarBtn) {
            editAvatarBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = handleAvatarUpload;
                input.click();
            });
        }

        // Close modal handlers
        if (closeBtn) closeBtn.addEventListener('click', closeEditModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeEditModal);
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeEditModal();
                }
            });
        }

        // Save profile
        if (saveBtn) {
            saveBtn.addEventListener('click', saveProfile);
        }
    }

    // Open edit modal
    function openEditModal() {
        const userData = JSON.parse(localStorage.getItem('finora_user') || '{}');
        const modal = document.getElementById('edit-profile-modal');

        // Populate form
        document.getElementById('edit-fullname').value = userData.fullName || '';
        document.getElementById('edit-phone').value = userData.phone || '';
        document.getElementById('edit-dob').value = userData.dob || '';
        document.getElementById('edit-location').value = userData.location || '';
        document.getElementById('edit-occupation').value = userData.occupation || '';

        // Show modal
        modal.classList.add('active');
    }

    // Close edit modal
    function closeEditModal() {
        const modal = document.getElementById('edit-profile-modal');
        modal.classList.remove('active');
    }

    // Save profile changes
    function saveProfile() {
        const userData = JSON.parse(localStorage.getItem('finora_user') || '{}');

        // Get form values
        userData.fullName = document.getElementById('edit-fullname').value;
        userData.phone = document.getElementById('edit-phone').value;
        userData.dob = document.getElementById('edit-dob').value;
        userData.location = document.getElementById('edit-location').value;
        userData.occupation = document.getElementById('edit-occupation').value;

        // Save to localStorage
        localStorage.setItem('finora_user', JSON.stringify(userData));

        // Reload profile data
        loadProfileData();

        // Close modal
        closeEditModal();

        // Show success message
        showNotification('Profile updated successfully');
    }

    // Handle avatar upload
    function handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const avatarImg = document.getElementById('profile-avatar-img');
            avatarImg.src = event.target.result;

            // Save to localStorage
            const userData = JSON.parse(localStorage.getItem('finora_user') || '{}');
            userData.avatar = event.target.result;
            localStorage.setItem('finora_user', JSON.stringify(userData));

            showNotification('Profile picture updated');
        };
        reader.readAsDataURL(file);
    }

    // Update preferences display
    function updatePreferencesDisplay(settings) {
        // These are just display values - actual preference changes happen in settings page
        // This is just to show current settings
    }

    // Format currency
    function formatCurrency(amount) {
        return window.FINORA_UTILS.formatCurrency(amount);
    }

    // Format date
    function formatDate(date) {
        return window.FINORA_UTILS?.formatDateLong(date) || date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Show notification
    function showNotification(message) {
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

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProfile);
    } else {
        initProfile();
    }

})();
