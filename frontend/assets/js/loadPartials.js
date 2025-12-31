/* ============================================
   Finora - Load Partials (Navbar & Sidebar)
   ============================================ */

// Determine the correct base path
function getBasePath() {
    const path = window.location.pathname;
    
    // If in dashboard pages (pages/dashboard/)
    if (path.includes('/pages/dashboard/')) {
        return '../../';
    }
    // If in auth pages (pages/auth/)
    if (path.includes('/pages/auth/')) {
        return '../../';
    }
    // If in root
    return './';
}

// Load HTML content from a file
async function loadHTML(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error loading partial:', error);
        return '';
    }
}

// Load and inject navbar
async function loadNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const basePath = getBasePath();
        const navbarHTML = await loadHTML(`${basePath}partials/navbar.html`);
        navbarContainer.innerHTML = navbarHTML;
        initializeNavbar();
    }
}

// Load and inject sidebar
async function loadSidebar() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        const basePath = getBasePath();
        const sidebarHTML = await loadHTML(`${basePath}partials/sidebar.html`);
        sidebarContainer.innerHTML = sidebarHTML;
        initializeSidebar();
    }
}

// Initialize navbar functionality
function initializeNavbar() {
    // Update user name
    const userNameElement = document.querySelector('.navbar__user-name');
    if (userNameElement) {
        const user = window.FINORA_STATE.getUser();
        if (user) {
            userNameElement.textContent = user.firstName || 'User';
        }
    }
    
    // Dropdown toggle
    const dropdownToggle = document.querySelector('.navbar__dropdown-toggle');
    const dropdownMenu = document.querySelector('.navbar__dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.FINORA_ROUTER.handleLogout();
        });
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize sidebar functionality
function initializeSidebar() {
    // Highlight active menu item
    const currentRoute = window.FINORA_ROUTER.getCurrentRoute();
    const menuItems = document.querySelectorAll('.sidebar__item');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentRoute)) {
            item.classList.add('active');
        }
    });
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Load all partials on page load
async function loadAllPartials() {
    await Promise.all([
        loadNavbar(),
        loadSidebar()
    ]);
}

// Auto-load partials when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllPartials);
} else {
    loadAllPartials();
}

// Export functions
window.FINORA_PARTIALS = {
    loadNavbar,
    loadSidebar,
    loadAllPartials
};