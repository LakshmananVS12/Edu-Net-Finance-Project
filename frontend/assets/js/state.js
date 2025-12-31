/* ============================================
   Finora - State Management (LocalStorage)
   ============================================ */

// User Management
function getUser() {
    const userStr = localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
}

function setUser(user) {
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.USER, JSON.stringify(user));
}

function clearUser() {
    localStorage.removeItem(window.FINORA_CONFIG.STORAGE_KEYS.USER);
}

// Authentication
function isAuthenticated() {
    return localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
}

function setAuthenticated(status) {
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.IS_AUTHENTICATED, status.toString());
}

function logout() {
    clearUser();
    setAuthenticated(false);
}

// Transactions Management
function getTransactions() {
    // TODO: Replace with API call -> GET /api/v1/transactions
    const transactionsStr = localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS);
    return transactionsStr ? JSON.parse(transactionsStr) : [];
}

function getTransactionById(id) {
    const transactions = getTransactions();
    return transactions.find(t => t.transactionId === id);
}

function addTransaction(transaction) {
    // TODO: Replace with API call -> POST /api/v1/transactions
    const transactions = getTransactions();
    transaction.transactionId = `txn-${Date.now()}`;
    transactions.unshift(transaction);
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return transaction;
}

function updateTransaction(id, updatedData) {
    // TODO: Replace with API call -> PUT /api/v1/transactions/:id
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.transactionId === id);
    if (index !== -1) {
        transactions[index] = { ...transactions[index], ...updatedData };
        localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
        return transactions[index];
    }
    return null;
}

function deleteTransaction(id) {
    // TODO: Replace with API call -> DELETE /api/v1/transactions/:id
    const transactions = getTransactions();
    const filtered = transactions.filter(t => t.transactionId !== id);
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
    return true;
}

// Budgets Management
function getBudgets() {
    // TODO: Replace with API call -> GET /api/v1/budgets
    const budgetsStr = localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.BUDGETS);
    return budgetsStr ? JSON.parse(budgetsStr) : [];
}

function getBudgetById(id) {
    const budgets = getBudgets();
    return budgets.find(b => b.budgetId === id);
}

function addBudget(budget) {
    // TODO: Replace with API call -> POST /api/v1/budgets
    const budgets = getBudgets();
    budget.budgetId = `bgt-${Date.now()}`;
    budgets.push(budget);
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
    return budget;
}

function updateBudget(id, updatedData) {
    // TODO: Replace with API call -> PUT /api/v1/budgets/:id
    const budgets = getBudgets();
    const index = budgets.findIndex(b => b.budgetId === id);
    if (index !== -1) {
        budgets[index] = { ...budgets[index], ...updatedData };
        localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
        return budgets[index];
    }
    return null;
}

function deleteBudget(id) {
    // TODO: Replace with API call -> DELETE /api/v1/budgets/:id
    const budgets = getBudgets();
    const filtered = budgets.filter(b => b.budgetId !== id);
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.BUDGETS, JSON.stringify(filtered));
    return true;
}

// Categories Management
function getCategories() {
    const categoriesStr = localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.CATEGORIES);
    return categoriesStr ? JSON.parse(categoriesStr) : [];
}

function getCategoryById(id) {
    const categories = getCategories();
    return categories.find(c => c.categoryId === id);
}

function getCategoryName(id) {
    const category = getCategoryById(id);
    return category ? category.name : 'Unknown';
}

// Export all state functions
window.FINORA_STATE = {
    // User
    getUser,
    setUser,
    clearUser,
    
    // Auth
    isAuthenticated,
    setAuthenticated,
    logout,
    
    // Transactions
    getTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    // Budgets
    getBudgets,
    getBudgetById,
    addBudget,
    updateBudget,
    deleteBudget,
    
    // Categories
    getCategories,
    getCategoryById,
    getCategoryName
};