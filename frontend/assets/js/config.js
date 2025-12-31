/* ============================================
   Finora - Configuration & Constants
   ============================================ */

// LocalStorage Keys
const STORAGE_KEYS = {
    USER: 'finora_user',
    TRANSACTIONS: 'finora_transactions',
    BUDGETS: 'finora_budgets',
    CATEGORIES: 'finora_categories',
    IS_AUTHENTICATED: 'finora_isAuthenticated'
};

// API Base URL (for future backend integration)
const API_BASE_URL = '/api/v1';

// Predefined Categories
const CATEGORIES = [
    { categoryId: 'cat-001', name: 'Salary', type: 'Income', icon: 'briefcase' },
    { categoryId: 'cat-002', name: 'Freelance', type: 'Income', icon: 'code' },
    { categoryId: 'cat-003', name: 'Investment Returns', type: 'Income', icon: 'trending-up' },
    { categoryId: 'cat-004', name: 'Groceries', type: 'Expense', icon: 'shopping-cart' },
    { categoryId: 'cat-005', name: 'Dining Out', type: 'Expense', icon: 'utensils' },
    { categoryId: 'cat-006', name: 'Transportation', type: 'Expense', icon: 'car' },
    { categoryId: 'cat-007', name: 'Rent', type: 'Expense', icon: 'home' },
    { categoryId: 'cat-008', name: 'Utilities', type: 'Expense', icon: 'zap' },
    { categoryId: 'cat-009', name: 'Entertainment', type: 'Expense', icon: 'film' },
    { categoryId: 'cat-010', name: 'Healthcare', type: 'Expense', icon: 'heart' },
    { categoryId: 'cat-011', name: 'Shopping', type: 'Expense', icon: 'shopping-bag' },
    { categoryId: 'cat-012', name: 'Education', type: 'Expense', icon: 'book' },
    { categoryId: 'cat-013', name: 'Subscriptions', type: 'Expense', icon: 'repeat' }
];

// Payment Sources
const PAYMENT_SOURCES = [
    'Cash',
    'Debit Card',
    'Credit Card',
    'Bank Transfer',
    'Digital Wallet',
    'Other'
];

// Generate Dummy Transactions (30-50 items)
function generateDummyTransactions() {
    const transactions = [];
    const expenseCategories = CATEGORIES.filter(cat => cat.type === 'Expense');
    const incomeCategories = CATEGORIES.filter(cat => cat.type === 'Income');
    
    // Generate transactions for the last 3 months
    const today = new Date();
    const descriptions = {
        'cat-001': ['Monthly Salary', 'Salary Payment', 'Paycheck'],
        'cat-002': ['Freelance Project', 'Consulting Work', 'Side Project'],
        'cat-003': ['Stock Dividend', 'Investment Return'],
        'cat-004': ['Weekly Groceries', 'Supermarket Shopping', 'Grocery Store'],
        'cat-005': ['Restaurant', 'Cafe', 'Food Delivery', 'Lunch Out'],
        'cat-006': ['Gas', 'Uber Ride', 'Metro Card', 'Parking'],
        'cat-007': ['Monthly Rent', 'Apartment Rent'],
        'cat-008': ['Electricity Bill', 'Water Bill', 'Internet Bill'],
        'cat-009': ['Movie Tickets', 'Concert', 'Netflix', 'Gaming'],
        'cat-010': ['Pharmacy', 'Doctor Visit', 'Gym Membership'],
        'cat-011': ['Online Shopping', 'Clothing', 'Electronics'],
        'cat-012': ['Course Fee', 'Books', 'Online Course'],
        'cat-013': ['Spotify', 'Adobe', 'Cloud Storage', 'Streaming Service']
    };

    // Generate 45 transactions
    for (let i = 0; i < 45; i++) {
        const isIncome = Math.random() > 0.7; // 30% income, 70% expense
        const category = isIncome 
            ? incomeCategories[Math.floor(Math.random() * incomeCategories.length)]
            : expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
        
        const daysAgo = Math.floor(Math.random() * 90);
        const date = new Date(today);
        date.setDate(date.getDate() - daysAgo);
        
        const amount = isIncome 
            ? Math.floor(Math.random() * 3000) + 1000 // Income: 1000-4000
            : Math.floor(Math.random() * 300) + 10;    // Expense: 10-310
        
        const desc = descriptions[category.categoryId];
        const description = desc[Math.floor(Math.random() * desc.length)];
        
        transactions.push({
            transactionId: `txn-${Date.now()}-${i}`,
            date: date.toISOString().split('T')[0],
            amount: parseFloat(amount.toFixed(2)),
            type: category.type,
            categoryId: category.categoryId,
            description: description,
            paymentSource: PAYMENT_SOURCES[Math.floor(Math.random() * PAYMENT_SOURCES.length)],
            isRecurring: Math.random() > 0.85 // 15% recurring
        });
    }
    
    // Sort by date (newest first)
    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate Dummy Budgets (5-6 items)
function generateDummyBudgets() {
    const currentDate = new Date();
    const monthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    
    return [
        { budgetId: 'bgt-001', categoryId: 'cat-004', monthYear: monthYear, limitAmount: 400 },
        { budgetId: 'bgt-002', categoryId: 'cat-005', monthYear: monthYear, limitAmount: 300 },
        { budgetId: 'bgt-003', categoryId: 'cat-006', monthYear: monthYear, limitAmount: 200 },
        { budgetId: 'bgt-004', categoryId: 'cat-009', monthYear: monthYear, limitAmount: 150 },
        { budgetId: 'bgt-005', categoryId: 'cat-011', monthYear: monthYear, limitAmount: 250 },
        { budgetId: 'bgt-006', categoryId: 'cat-013', monthYear: monthYear, limitAmount: 100 }
    ];
}

// Initialize LocalStorage with Empty Data (First Time Setup)
function initializeApp() {
    // Check if data already exists
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(CATEGORIES));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
        // Start with empty transactions for new users
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.BUDGETS)) {
        // Start with empty budgets for new users
        localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED)) {
        localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'false');
    }
}

// Auto-initialize on script load
initializeApp();

// Export for use in other modules
window.FINORA_CONFIG = {
    STORAGE_KEYS,
    API_BASE_URL,
    CATEGORIES,
    PAYMENT_SOURCES
};