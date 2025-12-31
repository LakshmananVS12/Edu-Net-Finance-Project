/* ============================================
   Finora - Authentication Logic
   ============================================ */

// Handle Login Form Submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('password-error', 'Password must be at least 6 characters');
        return;
    }
    
    // TODO: Replace with API call -> POST /api/v1/auth/login
    // Simulate successful login
    const user = {
        userId: 'user-' + Date.now(),
        email: email,
        firstName: email.split('@')[0],
        createdAt: new Date().toISOString()
    };
    
    // Save user and set authenticated
    window.FINORA_STATE.setUser(user);
    window.FINORA_STATE.setAuthenticated(true);
    
    // Redirect to dashboard
    window.location.href = '../dashboard/dashboard.html';
}

// Handle Signup Form Submission
function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName')?.value.trim() || '';
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate inputs
    if (!firstName) {
        showError('firstName-error', 'First name is required');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('password-error', 'Password must be at least 6 characters');
        return;
    }
    
    // TODO: Replace with API call -> POST /api/v1/auth/signup
    // Simulate successful signup
    const user = {
        userId: 'user-' + Date.now(),
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString()
    };
    
    // Save user and set authenticated
    window.FINORA_STATE.setUser(user);
    window.FINORA_STATE.setAuthenticated(true);
    
    // Redirect to dashboard
    window.location.href = '../dashboard/dashboard.html';
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

// Initialize auth page
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});