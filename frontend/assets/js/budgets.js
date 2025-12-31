/* ============================================
   Finora - Budgets Page Logic
   ============================================ */

console.log('✓ budgets.js loaded successfully');

let editingBudgetId = null;
let deleteBudgetId = null;

// Format currency
function formatCurrency(amount) {
    return window.FINORA_UTILS?.formatCurrency(amount) || new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Get current month/year
function getCurrentMonthYear() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

// Get month name
function getMonthName() {
    const date = new Date();
    return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

// Get current month transactions
function getCurrentMonthTransactions() {
    const allTransactions = window.FINORA_STATE.getTransactions();
    const currentMonthYear = getCurrentMonthYear();
    
    return allTransactions.filter(t => {
        const tDate = new Date(t.date);
        const tMonthYear = `${tDate.getFullYear()}-${String(tDate.getMonth() + 1).padStart(2, '0')}`;
        return tMonthYear === currentMonthYear;
    });
}

// Calculate spending for a category
function calculateCategorySpending(categoryId) {
    const monthTransactions = getCurrentMonthTransactions();
    return monthTransactions
        .filter(t => t.categoryId === categoryId && t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
}

// Populate category dropdown (Expense categories only)
function populateCategoryDropdown() {
    const categories = window.FINORA_STATE.getCategories();
    const expenseCategories = categories.filter(cat => cat.type === 'Expense');
    
    const categorySelect = document.getElementById('budget-category');
    if (!categorySelect) return;
    
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    
    expenseCategories.forEach(cat => {
        categorySelect.innerHTML += `<option value="${cat.categoryId}">${cat.name}</option>`;
    });
}

// Update budget preview
function updateBudgetPreview() {
    const categoryId = document.getElementById('budget-category')?.value;
    const limitAmount = parseFloat(document.getElementById('budget-limit')?.value) || 0;
    const preview = document.getElementById('budget-preview');
    
    if (!preview) return;
    
    if (!categoryId || limitAmount <= 0) {
        preview.style.display = 'none';
        return;
    }
    
    const spent = calculateCategorySpending(categoryId);
    const percentage = (spent / limitAmount) * 100;
    const remaining = limitAmount - spent;
    
    const previewSpent = document.getElementById('preview-spent');
    const previewProgress = document.getElementById('preview-progress');
    const previewMessage = document.getElementById('preview-message');
    
    if (previewSpent) previewSpent.textContent = formatCurrency(spent);
    if (previewProgress) {
        previewProgress.style.width = `${Math.min(percentage, 100)}%`;
        previewProgress.className = 'progress__bar';
        if (percentage >= 100) {
            previewProgress.classList.add('progress__bar--danger');
        } else if (percentage >= 80) {
            previewProgress.classList.add('progress__bar--warning');
        } else {
            previewProgress.classList.add('progress__bar--success');
        }
    }
    
    let message = remaining > 0 ? `You have ${formatCurrency(remaining)} left to spend in this category.` :
                  remaining === 0 ? 'You have reached your budget limit for this category.' :
                  `You are over budget by ${formatCurrency(Math.abs(remaining))}!`;
    if (previewMessage) previewMessage.textContent = message;
    
    preview.style.display = 'block';
}

// Render budget summary
function renderBudgetSummary() {
    const budgets = window.FINORA_STATE.getBudgets();
    const currentMonthYear = getCurrentMonthYear();
    const monthBudgets = budgets.filter(b => b.monthYear === currentMonthYear);
    
    let totalBudget = 0;
    let totalSpent = 0;
    
    monthBudgets.forEach(budget => {
        totalBudget += budget.limitAmount;
        totalSpent += calculateCategorySpending(budget.categoryId);
    });
    
    const totalRemaining = totalBudget - totalSpent;
    
    const totalBudgetEl = document.getElementById('total-budget');
    const totalSpentEl = document.getElementById('total-spent');
    const totalRemainingEl = document.getElementById('total-remaining');
    
    if (totalBudgetEl) totalBudgetEl.textContent = formatCurrency(totalBudget);
    if (totalSpentEl) totalSpentEl.textContent = formatCurrency(totalSpent);
    if (totalRemainingEl) totalRemainingEl.textContent = formatCurrency(totalRemaining);
}

// Render budget cards
function renderBudgets() {
    console.log('renderBudgets() called');
    const budgets = window.FINORA_STATE.getBudgets();
    const currentMonthYear = getCurrentMonthYear();
    const container = document.getElementById('budgets-grid');
    const emptyState = document.getElementById('empty-budgets');
    
    console.log('Container found:', !!container);
    console.log('Empty state found:', !!emptyState);
    console.log('All budgets:', budgets.length);
    console.log('Current month:', currentMonthYear);
    
    if (!container || !emptyState) {
        console.error('Required elements not found!');
        return;
    }
    
    const monthBudgets = budgets.filter(b => b.monthYear === currentMonthYear);
    console.log('Month budgets:', monthBudgets.length, monthBudgets);
    
    if (monthBudgets.length === 0) {
        console.log('No budgets for current month - showing empty state');
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    console.log('Rendering', monthBudgets.length, 'budget cards');
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    const budgetHTML = monthBudgets.map(budget => {
        const category = window.FINORA_STATE.getCategoryById(budget.categoryId);
        const spent = calculateCategorySpending(budget.categoryId);
        const percentage = (spent / budget.limitAmount) * 100;
        const remaining = budget.limitAmount - spent;
        
        let cardClass = 'budget-card';
        let progressClass = 'progress__bar--success';
        let remainingClass = 'budget-card__remaining--safe';
        let warningBadge = '';
        
        if (percentage >= 100) {
            cardClass += ' budget-card--danger';
            progressClass = 'progress__bar--danger';
            remainingClass = 'budget-card__remaining--danger';
            warningBadge = '<div class="budget-warning budget-warning--red"><i data-lucide="alert-circle"></i>Over Budget!</div>';
        } else if (percentage >= 80) {
            cardClass += ' budget-card--warning';
            progressClass = 'progress__bar--warning';
            remainingClass = 'budget-card__remaining--warning';
            warningBadge = '<div class="budget-warning budget-warning--yellow"><i data-lucide="alert-triangle"></i>Approaching Limit</div>';
        }
        
        return `
            <div class="${cardClass}">
                <div class="budget-card__header">
                    <div class="budget-card__category">
                        <div class="budget-card__icon">
                            <i data-lucide="${category?.icon || 'tag'}"></i>
                        </div>
                        <div>
                            <div class="budget-card__name">${category?.name || 'Unknown'}</div>
                        </div>
                    </div>
                    <div class="budget-card__actions">
                        <button class="budget-card__action-btn" onclick="editBudget('${budget.budgetId}')" title="Edit">
                            <i data-lucide="edit-2"></i>
                        </button>
                        <button class="budget-card__action-btn" onclick="deleteBudget('${budget.budgetId}')" title="Delete">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
                
                <div class="budget-card__amount">
                    <span class="budget-card__spent">${formatCurrency(spent)}</span>
                    <span class="budget-card__limit">of ${formatCurrency(budget.limitAmount)}</span>
                </div>
                
                <div class="budget-card__progress">
                    <div class="progress">
                        <div class="progress__bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
                
                <div class="budget-card__status">
                    <span class="budget-card__percentage">${percentage.toFixed(0)}% used</span>
                    <span class="budget-card__remaining ${remainingClass}">
                        ${remaining >= 0 ? formatCurrency(remaining) + ' left' : 'Over by ' + formatCurrency(Math.abs(remaining))}
                    </span>
                </div>
                
                ${warningBadge}
            </div>
        `;
    }).join('');
    
    container.innerHTML = budgetHTML;
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Modal functions
function openAddModal() {
    console.log('openAddModal() called');
    editingBudgetId = null;
    const modal = document.getElementById('budget-modal');
    const form = document.getElementById('budget-form');
    const preview = document.getElementById('budget-preview');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    document.getElementById('modal-title').textContent = 'Set Budget';
    if (form) form.reset();
    if (preview) preview.style.display = 'none';
    modal.classList.add('active');
    console.log('Modal opened');
}

function editBudget(id) {
    editingBudgetId = id;
    const budget = window.FINORA_STATE.getBudgetById(id);
    const modal = document.getElementById('budget-modal');
    
    if (!budget || !modal) return;
    
    document.getElementById('modal-title').textContent = 'Edit Budget';
    document.getElementById('budget-category').value = budget.categoryId;
    document.getElementById('budget-limit').value = budget.limitAmount;
    
    updateBudgetPreview();
    modal.classList.add('active');
}

function deleteBudget(id) {
    deleteBudgetId = id;
    const modal = document.getElementById('delete-modal');
    if (modal) modal.classList.add('active');
}

function confirmDelete() {
    if (deleteBudgetId) {
        window.FINORA_STATE.deleteBudget(deleteBudgetId);
        document.getElementById('delete-modal').classList.remove('active');
        deleteBudgetId = null;
        refreshPage();
    }
}

function saveBudget(e) {
    e.preventDefault();
    
    const categoryId = document.getElementById('budget-category')?.value;
    const limitAmount = parseFloat(document.getElementById('budget-limit')?.value);
    const currentMonthYear = getCurrentMonthYear();
    
    if (!categoryId || !limitAmount || limitAmount <= 0) {
        alert('Please fill in all required fields');
        return;
    }
    
    const existingBudgets = window.FINORA_STATE.getBudgets();
    const duplicate = existingBudgets.find(b => 
        b.categoryId === categoryId && 
        b.monthYear === currentMonthYear && 
        b.budgetId !== editingBudgetId
    );
    
    if (duplicate) {
        alert('A budget already exists for this category in the current month');
        return;
    }
    
    const budgetData = {
        categoryId: categoryId,
        monthYear: currentMonthYear,
        limitAmount: limitAmount
    };
    
    if (editingBudgetId) {
        window.FINORA_STATE.updateBudget(editingBudgetId, budgetData);
    } else {
        window.FINORA_STATE.addBudget(budgetData);
    }
    
    document.getElementById('budget-modal').classList.remove('active');
    refreshPage();
}

function refreshPage() {
    renderBudgetSummary();
    renderBudgets();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    const addBtn = document.getElementById('add-budget-btn');
    console.log('Add budget button:', addBtn ? '✓ Found' : '✗ Not found');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            console.log('Add budget button clicked!');
            openAddModal();
        });
    }
    
    const budgetForm = document.getElementById('budget-form');
    console.log('Budget form:', budgetForm ? '✓ Found' : '✗ Not found');
    if (budgetForm) {
        budgetForm.addEventListener('submit', saveBudget);
    }
    
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('budget-modal').classList.remove('active');
        });
    }
    
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            document.getElementById('budget-modal').classList.remove('active');
        });
    }
    
    const closeDeleteModalBtn = document.getElementById('close-delete-modal-btn');
    if (closeDeleteModalBtn) {
        closeDeleteModalBtn.addEventListener('click', () => {
            document.getElementById('delete-modal').classList.remove('active');
        });
    }
    
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            document.getElementById('delete-modal').classList.remove('active');
        });
    }
    
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    console.log('Confirm delete button:', confirmDeleteBtn ? '✓ Found' : '✗ Not found');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
    
    const budgetCategory = document.getElementById('budget-category');
    if (budgetCategory) {
        budgetCategory.addEventListener('change', updateBudgetPreview);
    }
    
    const budgetLimit = document.getElementById('budget-limit');
    if (budgetLimit) {
        budgetLimit.addEventListener('input', updateBudgetPreview);
    }
    
    const budgetModal = document.getElementById('budget-modal');
    if (budgetModal) {
        budgetModal.addEventListener('click', (e) => {
            if (e.target.id === 'budget-modal') e.target.style.display = 'none';
        });
    }
    
    const deleteModal = document.getElementById('delete-modal');
    if (deleteModal) {
        deleteModal.addEventListener('click', (e) => {
            if (e.target.id === 'delete-modal') e.target.style.display = 'none';
        });
    }
    
    console.log('✓ All event listeners attached');
}

async function initializeBudgets() {
    console.log('✓ initializeBudgets() called');
    console.log('✓ Config available:', !!window.FINORA_CONFIG);
    console.log('✓ State available:', !!window.FINORA_STATE);
    
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const currentMonthEl = document.getElementById('current-month');
    if (currentMonthEl) {
        currentMonthEl.textContent = getMonthName();
        console.log('✓ Month set:', getMonthName());
    }
    
    populateCategoryDropdown();
    console.log('✓ Categories populated');
    
    setupEventListeners();
    console.log('✓ Event listeners set up');
    
    refreshPage();
    console.log('✓ Page rendered');
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('✓ Lucide icons initialized');
    }
    
    console.log('✓ Budget page fully initialized!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBudgets);
} else {
    initializeBudgets();
}

window.openAddModal = openAddModal;
window.editBudget = editBudget;
window.deleteBudget = deleteBudget;