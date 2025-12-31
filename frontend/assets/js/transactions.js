/* ============================================
   Finora - Transactions Page Logic
   ============================================ */

let currentPage = 1;
const itemsPerPage = 10;
let filteredTransactions = [];
let editingTransactionId = null;

// Format currency
function formatCurrency(amount) {
    return window.FINORA_UTILS?.formatCurrency(amount) || new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    return window.FINORA_UTILS?.formatDateLong(dateString) || new Date(dateString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Populate category dropdowns
function populateCategoryDropdowns() {
    const categories = window.FINORA_STATE.getCategories();
    
    // Filter dropdown
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
        categoryFilter.innerHTML += `<option value="${cat.categoryId}">${cat.name}</option>`;
    });
    
    // Modal category dropdown
    const transactionCategory = document.getElementById('transaction-category');
    transactionCategory.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(cat => {
        transactionCategory.innerHTML += `<option value="${cat.categoryId}">${cat.name} (${cat.type})</option>`;
    });
}

// Apply filters
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const typeFilter = document.getElementById('type-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    const dateFrom = document.getElementById('date-from-filter').value;
    const dateTo = document.getElementById('date-to-filter').value;
    
    const allTransactions = window.FINORA_STATE.getTransactions();
    
    filteredTransactions = allTransactions.filter(t => {
        const matchesSearch = !searchTerm || 
            t.description.toLowerCase().includes(searchTerm) ||
            window.FINORA_STATE.getCategoryName(t.categoryId).toLowerCase().includes(searchTerm);
        
        const matchesType = !typeFilter || t.type === typeFilter;
        const matchesCategory = !categoryFilter || t.categoryId === categoryFilter;
        
        const matchesDateFrom = !dateFrom || new Date(t.date) >= new Date(dateFrom);
        const matchesDateTo = !dateTo || new Date(t.date) <= new Date(dateTo);
        
        return matchesSearch && matchesType && matchesCategory && matchesDateFrom && matchesDateTo;
    });
    
    currentPage = 1;
    renderTransactions();
    renderPagination();
    updateStats();
}

// Clear filters
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('type-filter').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('date-from-filter').value = '';
    document.getElementById('date-to-filter').value = '';
    applyFilters();
}

// Render transactions table
function renderTransactions() {
    const tbody = document.getElementById('transactions-tbody');
    
    if (filteredTransactions.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <img src="../../assets/images/empty-transactions.svg" alt="No transactions" class="empty-state__image">
                        <h3 class="empty-state__title">No transactions found</h3>
                        <p class="empty-state__message">Try adjusting your filters or add a new transaction to get started</p>
                        <button class="btn btn--primary" onclick="openAddModal()">
                            <i data-lucide="plus"></i>
                            Add Your First Transaction
                        </button>
                    </div>
                </td>
            </tr>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTransactions = filteredTransactions.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageTransactions.map(t => {
        const category = window.FINORA_STATE.getCategoryName(t.categoryId);
        const amountClass = t.type === 'Income' ? 'text-success' : 'text-danger';
        const amountPrefix = t.type === 'Income' ? '+' : '-';
        const typeIcon = t.type === 'Income' ? 'trending-up' : 'trending-down';
        const typeClass = t.type === 'Income' ? 'badge--success' : 'badge--danger';
        
        return `
            <tr>
                <td>${formatDate(t.date)}</td>
                <td>
                    ${t.description}
                    ${t.isRecurring ? '<span class="recurring-badge"><i data-lucide="repeat"></i>Recurring</span>' : ''}
                </td>
                <td><span class="badge badge--secondary">${category}</span></td>
                <td>
                    <span class="badge ${typeClass}">
                        <i data-lucide="${typeIcon}"></i>
                        ${t.type}
                    </span>
                </td>
                <td class="text-secondary">${t.paymentSource}</td>
                <td class="${amountClass} text-bold">${amountPrefix}${formatCurrency(t.amount)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn--icon btn--ghost" onclick="editTransaction('${t.transactionId}')" title="Edit">
                            <i data-lucide="edit-2"></i>
                        </button>
                        <button class="btn btn--icon btn--ghost" onclick="deleteTransaction('${t.transactionId}')" title="Delete">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = `
        <button class="pagination__btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            <i data-lucide="chevron-left"></i>
        </button>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <button class="pagination__btn ${i === currentPage ? 'pagination__btn--active' : ''}" onclick="goToPage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<span class="pagination__info">...</span>';
        }
    }
    
    html += `
        <button class="pagination__btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            <i data-lucide="chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = html;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Go to page
function goToPage(page) {
    currentPage = page;
    renderTransactions();
    renderPagination();
}

// Open add transaction modal
function openAddModal() {
    editingTransactionId = null;
    document.getElementById('modal-title').textContent = 'Add Transaction';
    document.getElementById('transaction-form').reset();
    document.getElementById('transaction-id').value = '';
    document.getElementById('transaction-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('transaction-modal').classList.add('active');
}

// Edit transaction
function editTransaction(id) {
    const transaction = window.FINORA_STATE.getTransactionById(id);
    if (!transaction) return;
    
    editingTransactionId = id;
    document.getElementById('modal-title').textContent = 'Edit Transaction';
    document.getElementById('transaction-id').value = id;
    document.getElementById('transaction-type').value = transaction.type;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-category').value = transaction.categoryId;
    document.getElementById('transaction-date').value = transaction.date;
    document.getElementById('transaction-description').value = transaction.description;
    document.getElementById('transaction-payment').value = transaction.paymentSource;
    document.getElementById('transaction-recurring').checked = transaction.isRecurring;
    
    document.getElementById('transaction-modal').classList.add('active');
}

// Delete transaction
let deleteTransactionId = null;

function deleteTransaction(id) {
    deleteTransactionId = id;
    document.getElementById('delete-modal').classList.add('active');
}

function confirmDelete() {
    if (deleteTransactionId) {
        window.FINORA_STATE.deleteTransaction(deleteTransactionId);
        applyFilters();
        closeDeleteModal();
    }
}

// Save transaction
function saveTransaction(e) {
    e.preventDefault();
    
    const transactionData = {
        type: document.getElementById('transaction-type').value,
        amount: parseFloat(document.getElementById('transaction-amount').value),
        categoryId: document.getElementById('transaction-category').value,
        date: document.getElementById('transaction-date').value,
        description: document.getElementById('transaction-description').value,
        paymentSource: document.getElementById('transaction-payment').value,
        isRecurring: document.getElementById('transaction-recurring').checked
    };
    
    if (editingTransactionId) {
        // Update existing transaction
        window.FINORA_STATE.updateTransaction(editingTransactionId, transactionData);
    } else {
        // Add new transaction
        window.FINORA_STATE.addTransaction(transactionData);
    }
    
    closeModal();
    applyFilters();
}

// Calculate and display stats
function updateStats() {
    const transactions = filteredTransactions.length ? filteredTransactions : window.FINORA_STATE.getTransactions();
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(t => {
        if (t.type === 'Income') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });
    
    document.getElementById('total-income-stat').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expense-stat').textContent = formatCurrency(totalExpense);
    document.getElementById('transaction-count-stat').textContent = transactions.length;
}

// Close modals
function closeModal() {
    document.getElementById('transaction-modal').classList.remove('active');
}

function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('active');
    deleteTransactionId = null;
}

// Initialize page
function initializeTransactionsPage() {
    // Check authentication
    if (!window.FINORA_STATE.isAuthenticated()) {
        window.location.href = '../../pages/auth/login.html';
        return;
    }
    
    // Populate dropdowns
    populateCategoryDropdowns();
    
    // Initial render
    applyFilters();
    
    // Event listeners
    document.getElementById('add-transaction-btn').addEventListener('click', openAddModal);
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('transaction-form').addEventListener('submit', saveTransaction);
    
    document.getElementById('close-delete-modal-btn').addEventListener('click', closeDeleteModal);
    document.getElementById('cancel-delete-btn').addEventListener('click', closeDeleteModal);
    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);
    
    // Filter listeners
    document.getElementById('search-input').addEventListener('input', applyFilters);
    document.getElementById('type-filter').addEventListener('change', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('date-from-filter').addEventListener('change', applyFilters);
    document.getElementById('date-to-filter').addEventListener('change', applyFilters);
    document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);
    
    // Close modal on overlay click
    document.getElementById('transaction-modal').addEventListener('click', (e) => {
        if (e.target.id === 'transaction-modal') closeModal();
    });
    
    document.getElementById('delete-modal').addEventListener('click', (e) => {
        if (e.target.id === 'delete-modal') closeDeleteModal();
    });
}

// Make functions global
window.openAddModal = openAddModal;
window.editTransaction = editTransaction;
window.deleteTransaction = deleteTransaction;
window.goToPage = goToPage;

// Run on page load
document.addEventListener('DOMContentLoaded', initializeTransactionsPage);


