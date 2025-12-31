/* ============================================
   Finora - Router & Navigation
   ============================================ */

// Get relative path based on current location
function getRelativePath(target) {
    const currentPath = window.location.pathname;
    
    // If we're in dashboard pages
    if (currentPath.includes('/pages/dashboard/')) {
        if (target.includes('auth/')) return '../' + target;
        if (target.includes('dashboard/')) return target.replace('dashboard/', '');
        return '../../' + target;
    }
    
    // If we're in auth pages
    if (currentPath.includes('/pages/auth/')) {
        if (target.includes('dashboard/')) return '../' + target;
        if (target.includes('auth/')) return target.replace('auth/', '');
        return '../../' + target;
    }
    
    // If we're at root (index.html)
    return 'pages/' + target;
}

// Protected routes that require authentication
const PROTECTED_ROUTES = [
    'dashboard.html',
    'transactions.html',
    'budgets.html',
    'reports.html'
];

// Check if current page requires authentication
function checkAuth() {
    const currentPath = window.location.pathname;
    const isProtectedRoute = PROTECTED_ROUTES.some(route => currentPath.includes(route));
    
    if (isProtectedRoute && !window.FINORA_STATE.isAuthenticated()) {
        window.location.href = getRelativePath('auth/login.html');
        return false;
    }
    
    if (window.FINORA_STATE.isAuthenticated() && 
        (currentPath.includes('/login.html') || currentPath.includes('/signup.html'))) {
        window.location.href = getRelativePath('dashboard/dashboard.html');
        return false;
    }
    
    return true;
}

function navigateTo(path) {
    window.location.href = path;
}

function handleLogout() {
    window.FINORA_STATE.logout();
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        navigateTo('../../index.html');
    } else {
        navigateTo('index.html');
    }
}

function getCurrentRoute() {
    const path = window.location.pathname;
    if (path.includes('dashboard.html')) return 'dashboard';
    if (path.includes('transactions.html')) return 'transactions';
    if (path.includes('budgets.html')) return 'budgets';
    if (path.includes('reports.html')) return 'reports';
    return '';
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

window.FINORA_ROUTER = {
    checkAuth,
    navigateTo,
    handleLogout,
    getCurrentRoute,
    getRelativePath
};
