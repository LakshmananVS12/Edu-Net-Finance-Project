// Reports Page JavaScript - Enhanced with Analytics Components

let period = 'current-month'; // current-month, last-month, or year
let catChart, trendChart;

setTimeout(() => {
    const checkReady = setInterval(() => {
        if (window.Chart && window.FINORA_CONFIG && window.FINORA_STATE) {
            clearInterval(checkReady);
            console.log('✅ Chart.js loaded, initializing reports...');
            initReports();
        }
    }, 50);
}, 200);

function initReports() {
    updateStats();
    drawCharts();
    generateInsights();
    renderTopSpendingDrivers();
    renderCategoryComparison();
    renderSummaryFooter();
    
    // Period toggle listeners
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            period = btn.dataset.period;
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateStats();
            drawCharts();
            generateInsights();
            renderTopSpendingDrivers();
            renderCategoryComparison();
            renderSummaryFooter();
        });
    });

    // TODO: Replace with actual backend API calls for download functionality
    document.getElementById('download-btn')?.addEventListener('click', () => {
        alert('Download functionality will be implemented with backend API');
        console.log('TODO: Implement PDF/CSV export with backend aggregation API');
    });

    // TODO: Replace with actual share functionality
    document.getElementById('share-btn')?.addEventListener('click', () => {
        alert('Share functionality will be implemented with backend API');
        console.log('TODO: Implement share via email/link generation');
    });
    
    if (window.lucide) lucide.createIcons();
}

function updateStats() {
    const txns = getTxns();
    const prevTxns = getPreviousPeriodTxns();
    
    let inc = 0, exp = 0, prevInc = 0, prevExp = 0;
    
    txns.forEach(t => {
        if (t.type === 'Income') inc += t.amount;
        else if (t.type === 'Expense') exp += t.amount;
    });
    
    prevTxns.forEach(t => {
        if (t.type === 'Income') prevInc += t.amount;
        else if (t.type === 'Expense') prevExp += t.amount;
    });
    
    const sav = inc - exp;
    const prevSav = prevInc - prevExp;
    const rate = inc > 0 ? ((sav / inc) * 100).toFixed(1) : 0;
    const prevRate = prevInc > 0 ? ((prevSav / prevInc) * 100).toFixed(1) : 0;
    
    // Update values
    document.getElementById('income-value').textContent = fmt(inc);
    document.getElementById('expense-value').textContent = fmt(exp);
    document.getElementById('savings-value').textContent = fmt(sav);
    document.getElementById('rate-value').textContent = rate + '%';
    
    // Update change indicators (only for month comparisons)
    if (period !== 'year') {
        updateChangeIndicator('income-change', inc, prevInc);
        updateChangeIndicator('expense-change', exp, prevExp, true); // Inverse logic for expenses
        updateChangeIndicator('savings-change', sav, prevSav);
        updateChangeIndicator('rate-change', parseFloat(rate), parseFloat(prevRate), false, '%');
    } else {
        // Hide change indicators for year view
        ['income-change', 'expense-change', 'savings-change', 'rate-change'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    }
}

function updateChangeIndicator(elementId, current, previous, inverse = false, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (previous === 0) {
        el.textContent = '';
        return;
    }
    
    const change = current - previous;
    const percentChange = ((change / previous) * 100).toFixed(1);
    
    if (change === 0) {
        el.textContent = '';
        el.className = 'stat-change';
        return;
    }
    
    const isPositive = inverse ? change < 0 : change > 0;
    const arrow = change > 0 ? '↑' : '↓';
    const className = isPositive ? 'stat-change stat-change--positive' : 'stat-change stat-change--negative';
    
    el.textContent = `${arrow} ${Math.abs(percentChange)}%${suffix}`;
    el.className = className;
}

function drawCharts() {
    const ctx1 = document.getElementById('categoryChart');
    const ctx2 = document.getElementById('trendChart');
    
    if (catChart) catChart.destroy();
    if (trendChart) trendChart.destroy();
    
    // Category Chart
    const catData = getCatData();
    
    if (catData.length > 0) {
        catChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: catData.map(d => d.name),
                datasets: [{
                    data: catData.map(d => d.amount),
                    backgroundColor: catData.map(d => d.color),
                    borderColor: '#1C1C1E',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#FFF', padding: 15 }
                    }
                }
            }
        });
    }
    
    // Trend Chart
    if (period === 'year') {
        const months = getYearData();
        
        trendChart = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Income',
                    data: months.map(m => m.inc),
                    borderColor: '#34C759',
                    backgroundColor: 'rgba(52,199,89,0.1)',
                    fill: true,
                    tension: 0.3
                }, {
                    label: 'Expenses',
                    data: months.map(m => m.exp),
                    borderColor: '#FF3B30',
                    backgroundColor: 'rgba(255,59,48,0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#FFF' } } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2C2C2E' },
                        ticks: { color: '#FFF' }
                    },
                    x: {
                        grid: { color: '#2C2C2E' },
                        ticks: { color: '#FFF' }
                    }
                }
            }
        });
    } else {
        const txns = getTxns();
        let inc = 0, exp = 0;
        txns.forEach(t => {
            if (t.type === 'Income') inc += t.amount;
            else if (t.type === 'Expense') exp += t.amount;
        });
        
        trendChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses'],
                datasets: [{
                    data: [inc, exp],
                    backgroundColor: ['#34C759', '#FF3B30'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2C2C2E' },
                        ticks: { color: '#FFF' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#FFF' }
                    }
                }
            }
        });
    }
}

// TODO: Replace with backend AI/ML insights API
function generateInsights() {
    const txns = getTxns();
    const prevTxns = getPreviousPeriodTxns();
    
    let inc = 0, exp = 0, prevInc = 0, prevExp = 0;
    
    txns.forEach(t => {
        if (t.type === 'Income') inc += t.amount;
        else if (t.type === 'Expense') exp += t.amount;
    });
    
    prevTxns.forEach(t => {
        if (t.type === 'Income') prevInc += t.amount;
        else if (t.type === 'Expense') prevExp += t.amount;
    });
    
    const catData = getCatData();
    const sav = inc - exp;
    const savRate = inc > 0 ? ((sav / inc) * 100) : 0;
    
    const insights = [];
    
    // Insight 1: Spending trend
    if (period !== 'year' && prevExp > 0) {
        const expChange = ((exp - prevExp) / prevExp) * 100;
        if (expChange > 10) {
            insights.push({
                icon: 'alert-circle',
                text: `Your spending increased by ${expChange.toFixed(1)}% compared to last month.`,
                type: 'warning'
            });
        } else if (expChange < -10) {
            insights.push({
                icon: 'check-circle',
                text: `Great job! Your spending decreased by ${Math.abs(expChange).toFixed(1)}% compared to last month.`,
                type: 'success'
            });
        } else {
            insights.push({
                icon: 'info',
                text: `Your spending is stable, with only ${Math.abs(expChange).toFixed(1)}% change from last month.`,
                type: 'info'
            });
        }
    }
    
    // Insight 2: Top category
    if (catData.length > 0) {
        const topCat = catData[0];
        const percentage = exp > 0 ? ((topCat.amount / exp) * 100).toFixed(1) : 0;
        insights.push({
            icon: 'pie-chart',
            text: `${topCat.name} is your highest expense category at ${fmt(topCat.amount)} (${percentage}% of total).`,
            type: 'info'
        });
    }
    
    // Insight 3: Savings status
    if (savRate >= 30) {
        insights.push({
            icon: 'trending-up',
            text: `Excellent savings rate of ${savRate.toFixed(1)}%! You're on track to meet your financial goals.`,
            type: 'success'
        });
    } else if (savRate >= 15) {
        insights.push({
            icon: 'target',
            text: `Good savings rate of ${savRate.toFixed(1)}%. Consider increasing it to 30% for better financial health.`,
            type: 'info'
        });
    } else if (savRate > 0) {
        insights.push({
            icon: 'alert-triangle',
            text: `Low savings rate of ${savRate.toFixed(1)}%. Try to reduce discretionary spending to save more.`,
            type: 'warning'
        });
    } else {
        insights.push({
            icon: 'alert-circle',
            text: `You're spending more than you earn. Review your expenses and create a budget plan.`,
            type: 'danger'
        });
    }
    
    // Insight 4: Income trend (if comparing months)
    if (period !== 'year' && prevInc > 0) {
        const incChange = ((inc - prevInc) / prevInc) * 100;
        if (incChange > 5) {
            insights.push({
                icon: 'arrow-up',
                text: `Your income increased by ${incChange.toFixed(1)}% this period. Great work!`,
                type: 'success'
            });
        } else if (incChange < -5) {
            insights.push({
                icon: 'arrow-down',
                text: `Your income decreased by ${Math.abs(incChange).toFixed(1)}%. Consider diversifying income sources.`,
                type: 'warning'
            });
        }
    }
    
    // Render insights
    const insightsList = document.getElementById('insights-list');
    if (insightsList && insights.length > 0) {
        insightsList.innerHTML = insights.map(insight => `
            <li class="insights-item insights-item--${insight.type}">
                <i data-lucide="${insight.icon}"></i>
                <span>${insight.text}</span>
            </li>
        `).join('');
        
        if (window.lucide) lucide.createIcons();
    }
}

// TODO: Replace with backend aggregation API
function renderTopSpendingDrivers() {
    const catData = getCatData().slice(0, 3); // Top 3
    const driversList = document.getElementById('drivers-list');
    
    if (!driversList) return;
    
    if (catData.length === 0) {
        driversList.innerHTML = '<div class="driver-item driver-item--empty">No expense data available</div>';
        return;
    }
    
    const totalExp = catData.reduce((sum, cat) => sum + cat.amount, 0);
    
    driversList.innerHTML = catData.map((cat, index) => {
        const percentage = totalExp > 0 ? ((cat.amount / totalExp) * 100).toFixed(1) : 0;
        return `
            <div class="driver-item">
                <div class="driver-rank">#${index + 1}</div>
                <div class="driver-content">
                    <div class="driver-header">
                        <span class="driver-name">${cat.name}</span>
                        <span class="driver-amount">${fmt(cat.amount)}</span>
                    </div>
                    <div class="driver-bar">
                        <div class="driver-bar__fill" style="width: ${percentage}%; background-color: ${cat.color};"></div>
                    </div>
                    <span class="driver-percentage">${percentage}% of top 3 expenses</span>
                </div>
            </div>
        `;
    }).join('');
}

// TODO: Replace with backend month-over-month aggregation API
function renderCategoryComparison() {
    const tbody = document.getElementById('comparison-tbody');
    if (!tbody) return;
    
    if (period === 'year') {
        tbody.innerHTML = '<tr><td colspan="4" class="comparison-empty">Category comparison is only available for month view</td></tr>';
        return;
    }
    
    // Get current and previous month data
    const currentCats = getCategoryBreakdown(period === 'current-month' ? 0 : 1);
    const previousCats = getCategoryBreakdown(period === 'current-month' ? 1 : 2);
    
    // Merge categories
    const allCatIds = new Set([...Object.keys(currentCats), ...Object.keys(previousCats)]);
    const cats = window.FINORA_CONFIG?.CATEGORIES || [];
    
    const comparison = Array.from(allCatIds).map(catId => {
        const cat = cats.find(c => c.categoryId === catId);
        const current = currentCats[catId] || 0;
        const previous = previousCats[catId] || 0;
        const change = current - previous;
        const percentChange = previous > 0 ? ((change / previous) * 100) : (current > 0 ? 100 : 0);
        
        return {
            name: cat?.name || 'Other',
            current,
            previous,
            change,
            percentChange
        };
    }).filter(item => item.current > 0 || item.previous > 0)
      .sort((a, b) => b.current - a.current);
    
    if (comparison.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="comparison-empty">No expense data available for comparison</td></tr>';
        return;
    }
    
    tbody.innerHTML = comparison.map(item => {
        const changeClass = item.change > 0 ? 'negative' : (item.change < 0 ? 'positive' : 'neutral');
        const arrow = item.change > 0 ? '↑' : (item.change < 0 ? '↓' : '−');
        
        return `
            <tr class="comparison-row">
                <td class="comparison-category">${item.name}</td>
                <td class="comparison-amount">${fmt(item.current)}</td>
                <td class="comparison-amount">${fmt(item.previous)}</td>
                <td class="comparison-change">
                    <span class="change-badge change-badge--${changeClass}">
                        ${arrow} ${Math.abs(item.percentChange).toFixed(1)}%
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

function renderSummaryFooter() {
    const txns = getTxns();
    let inc = 0, exp = 0;
    
    txns.forEach(t => {
        if (t.type === 'Income') inc += t.amount;
        else if (t.type === 'Expense') exp += t.amount;
    });
    
    const sav = inc - exp;
    
    const periodText = period === 'current-month' ? 'This Month' : 
                       period === 'last-month' ? 'Last Month' : 'This Year';
    
    document.getElementById('footer-period').textContent = periodText;
    document.getElementById('footer-income').textContent = fmt(inc);
    document.getElementById('footer-expense').textContent = fmt(exp);
    document.getElementById('footer-savings').textContent = fmt(sav);
}

function getTxns() {
    const all = window.FINORA_STATE.getTransactions();
    const now = new Date();
    
    if (period === 'current-month') {
        const m = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        return all.filter(t => {
            const d = new Date(t.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
        });
    } else if (period === 'last-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const m = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        return all.filter(t => {
            const d = new Date(t.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
        });
    } else {
        const y = now.getFullYear();
        return all.filter(t => new Date(t.date).getFullYear() === y);
    }
}

function getPreviousPeriodTxns() {
    const all = window.FINORA_STATE.getTransactions();
    const now = new Date();
    
    if (period === 'current-month') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const m = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
        return all.filter(t => {
            const d = new Date(t.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
        });
    } else if (period === 'last-month') {
        const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const m = `${twoMonthsAgo.getFullYear()}-${String(twoMonthsAgo.getMonth() + 1).padStart(2, '0')}`;
        return all.filter(t => {
            const d = new Date(t.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
        });
    }
    
    return [];
}

function getCategoryBreakdown(monthsAgo) {
    const all = window.FINORA_STATE.getTransactions();
    const now = new Date();
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
    const m = `${targetMonth.getFullYear()}-${String(targetMonth.getMonth() + 1).padStart(2, '0')}`;
    
    const txns = all.filter(t => {
        const d = new Date(t.date);
        return t.type === 'Expense' && `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
    });
    
    const map = {};
    txns.forEach(t => {
        map[t.categoryId] = (map[t.categoryId] || 0) + t.amount;
    });
    
    return map;
}

function getCatData() {
    const txns = getTxns();
    const cats = window.FINORA_CONFIG?.CATEGORIES || [];
    const colorPalette = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#06B6D4'];
    
    if (!cats || cats.length === 0) return [];
    
    const map = {};
    txns.forEach(t => {
        if (t.type === 'Expense') {
            map[t.categoryId] = (map[t.categoryId] || 0) + t.amount;
        }
    });
    
    return Object.entries(map).map(([id, amt], index) => {
        const c = cats.find(x => x.categoryId === id);
        return { 
            name: c?.name || 'Other', 
            amount: amt, 
            color: colorPalette[index % colorPalette.length]
        };
    }).sort((a, b) => b.amount - a.amount);
}

function getYearData() {
    const all = window.FINORA_STATE.getTransactions();
    const y = new Date().getFullYear();
    const result = [];
    for (let i = 0; i < 12; i++) {
        const m = `${y}-${String(i + 1).padStart(2, '0')}`;
        const txns = all.filter(t => {
            const d = new Date(t.date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === m;
        });
        let inc = 0, exp = 0;
        txns.forEach(t => {
            if (t.type === 'Income') inc += t.amount;
            else if (t.type === 'Expense') exp += t.amount;
        });
        result.push({ inc, exp });
    }
    return result;
}

function fmt(n) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}
