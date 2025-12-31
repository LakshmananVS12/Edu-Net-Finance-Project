/* ============================================
   Finora - Dashboard Logic
   ============================================ */

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

// Get current month transactions
function getCurrentMonthTransactions() {
    const allTransactions = window.FINORA_STATE.getTransactions();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return allTransactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });
}

// Calculate summary metrics
function calculateSummary() {
    const monthTransactions = getCurrentMonthTransactions();
    
    let totalIncome = 0;
    let totalExpenses = 0;
    
    monthTransactions.forEach(t => {
        if (t.type === 'Income') {
            totalIncome += t.amount;
        } else {
            totalExpenses += t.amount;
        }
    });
    
    const netBalance = totalIncome - totalExpenses;
    
    return { totalIncome, totalExpenses, netBalance };
}

// Render summary cards
function renderSummary() {
    const { totalIncome, totalExpenses, netBalance } = calculateSummary();
    
    document.getElementById('total-income').textContent = formatCurrency(totalIncome);
    document.getElementById('total-expenses').textContent = formatCurrency(totalExpenses);
    
    const balanceElement = document.getElementById('net-balance');
    balanceElement.textContent = formatCurrency(netBalance);
    
    // Color code net balance
    balanceElement.classList.remove('summary-card__value--success', 'summary-card__value--danger');
    if (netBalance > 0) {
        balanceElement.classList.add('summary-card__value--success');
    } else if (netBalance < 0) {
        balanceElement.classList.add('summary-card__value--danger');
    }
}

// Render recent transactions
function renderRecentTransactions() {
    const transactions = window.FINORA_STATE.getTransactions();
    const recentTransactions = transactions.slice(0, 5);
    const tbody = document.getElementById('recent-transactions');
    
    if (recentTransactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-secondary">No transactions yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = recentTransactions.map(t => {
        const category = window.FINORA_STATE.getCategoryName(t.categoryId);
        const amountClass = t.type === 'Income' ? 'text-success' : 'text-danger';
        const amountPrefix = t.type === 'Income' ? '+' : '-';
        
        return `
            <tr>
                <td>${formatDate(t.date)}</td>
                <td>${t.description}</td>
                <td>
                    <span class="badge badge--secondary">${category}</span>
                </td>
                <td class="${amountClass}">${amountPrefix}${formatCurrency(t.amount)}</td>
            </tr>
        `;
    }).join('');
}

// Render budget overview
function renderBudgetOverview() {
    const budgets = window.FINORA_STATE.getBudgets();
    const monthTransactions = getCurrentMonthTransactions();
    const container = document.getElementById('budget-overview');
    
    if (budgets.length === 0) {
        container.innerHTML = '<p class="text-secondary text-center">No budgets set yet</p>';
        return;
    }
    
    const budgetHTML = budgets.slice(0, 5).map(budget => {
        const category = window.FINORA_STATE.getCategoryById(budget.categoryId);
        
        // Calculate spent amount
        const spent = monthTransactions
            .filter(t => t.categoryId === budget.categoryId && t.type === 'Expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const percentage = (spent / budget.limitAmount) * 100;
        const remaining = budget.limitAmount - spent;
        
        // Determine progress bar color
        let progressClass = 'progress__bar--success';
        if (percentage >= 100) {
            progressClass = 'progress__bar--danger';
        } else if (percentage >= 80) {
            progressClass = 'progress__bar--warning';
        }
        
        return `
            <div class="budget-item">
                <div class="budget-item__header">
                    <span class="budget-item__name">${category ? category.name : 'Unknown'}</span>
                    <span class="budget-item__amount">${formatCurrency(spent)} / ${formatCurrency(budget.limitAmount)}</span>
                </div>
                <div class="budget-item__progress">
                    <div class="progress">
                        <div class="progress__bar ${progressClass}" style="width: ${Math.min(percentage, 100)}%"></div>
                    </div>
                </div>
                <div class="budget-item__info">
                    <span>${percentage.toFixed(0)}% used</span>
                    <span class="${remaining < 0 ? 'text-danger' : 'text-secondary'}">
                        ${remaining >= 0 ? formatCurrency(remaining) + ' left' : 'Over by ' + formatCurrency(Math.abs(remaining))}
                    </span>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = budgetHTML;
}

// Render user card
function renderCard() {
    const user = window.FINORA_STATE.getUser();
    if (user) {
        const cardHolder = document.getElementById('card-holder');
        if (cardHolder) {
            const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
            cardHolder.textContent = fullName.toUpperCase() || 'USER NAME';
        }
    }
}

// Initialize dashboard
function initializeDashboard() {
    // TODO: Check authentication
    if (!window.FINORA_STATE.isAuthenticated()) {
        window.location.href = '../../pages/auth/login.html';
        return;
    }
    
    renderSummary();
    renderRecentTransactions();
    renderBudgetOverview();
    renderCard();
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initializeDashboard);
