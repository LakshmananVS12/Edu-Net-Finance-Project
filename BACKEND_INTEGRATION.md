# 🔧 Backend Integration Guide for Finora

> **Complete reference for backend developers to integrate RESTful APIs with the Finora frontend**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [API Endpoint Requirements](#api-endpoint-requirements)
- [Data Schemas](#data-schemas)
- [Authentication Flow](#authentication-flow)
- [Integration Points](#integration-points)
- [File-by-File Breakdown](#file-by-file-breakdown)
- [Testing Checklist](#testing-checklist)
- [Common Pitfalls](#common-pitfalls)

---

## 🎯 Overview

### Current Implementation
- **Frontend**: Complete, production-ready
- **Data Persistence**: localStorage (browser-based)
- **State Management**: Centralized in `state.js`
- **API Placeholders**: 15+ TODO comments marking integration points

### Integration Goal
Replace all localStorage operations with RESTful API calls to your backend, maintaining the exact same UI/UX behavior.

### Key Advantages
✅ **Zero Frontend Refactoring** - Function signatures remain identical  
✅ **Clear Separation** - All data logic isolated in `state.js`  
✅ **Predictable Schema** - Data structures already defined and tested  
✅ **Error Handling** - Existing validation logic works unchanged  

---

## 🚀 Quick Start

### Step 1: Understand the Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │          Page Scripts (UI Logic)                   │  │
│  │   dashboard.js, transactions.js, budgets.js, etc. │  │
│  └──────────────────┬────────────────────────────────┘  │
│                     │                                    │
│                     ▼                                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │         state.js (Data Abstraction Layer)         │  │
│  │  ✅ ONLY FILE YOU NEED TO MODIFY                  │  │
│  │                                                     │  │
│  │  Currently: localStorage operations                │  │
│  │  After:     fetch() calls to your backend         │  │
│  └──────────────────┬────────────────────────────────┘  │
│                     │                                    │
└─────────────────────┼────────────────────────────────────┘
                      │
                      ▼ HTTP Requests (JSON)
┌─────────────────────────────────────────────────────────┐
│                   Your Backend Server                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │               RESTful API Endpoints                │  │
│  │   /api/v1/auth/login                              │  │
│  │   /api/v1/auth/signup                             │  │
│  │   /api/v1/transactions (GET, POST, PUT, DELETE)   │  │
│  │   /api/v1/budgets      (GET, POST, PUT, DELETE)   │  │
│  │   /api/v1/user         (GET, PUT)                 │  │
│  └──────────────────┬────────────────────────────────┘  │
│                     ▼                                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │            Database (PostgreSQL/MongoDB)          │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Step 2: Set API Base URL

**File**: `frontend/assets/js/config.js` (Line 15)

```javascript
// Current:
const API_BASE_URL = '/api/v1';

// Update to your backend URL:
const API_BASE_URL = 'https://your-backend-domain.com/api/v1';
// OR for local development:
const API_BASE_URL = 'http://localhost:5000/api/v1';
```

### Step 3: Focus on `state.js`

**All data operations** are centralized in `frontend/assets/js/state.js`. This is the **ONLY file** you need to modify for API integration.

---

## 🌐 API Endpoint Requirements

### Base URL
```
https://your-backend.com/api/v1
```

### Required Endpoints

| Method | Endpoint | Request Body | Response | Status Codes |
|--------|----------|--------------|----------|--------------|
| **POST** | `/auth/login` | `{ email, password }` | `{ token, user }` | 200, 401 |
| **POST** | `/auth/signup` | `{ email, password, firstName, lastName }` | `{ token, user }` | 201, 400, 409 |
| **GET** | `/auth/logout` | - | `{ message }` | 200 |
| **GET** | `/user` | - | `{ user }` | 200, 401 |
| **PUT** | `/user` | `{ firstName, lastName, phone, bio, avatar }` | `{ user }` | 200, 401 |
| **GET** | `/transactions` | Query: `?userId={id}&startDate={date}&endDate={date}` | `{ transactions: [] }` | 200, 401 |
| **GET** | `/transactions/{id}` | - | `{ transaction }` | 200, 404 |
| **POST** | `/transactions` | `{ transaction }` (see schema) | `{ transaction }` | 201, 400 |
| **PUT** | `/transactions/{id}` | `{ transaction }` (partial) | `{ transaction }` | 200, 404 |
| **DELETE** | `/transactions/{id}` | - | `{ message }` | 200, 404 |
| **GET** | `/budgets` | Query: `?userId={id}&monthYear={YYYY-MM}` | `{ budgets: [] }` | 200, 401 |
| **GET** | `/budgets/{id}` | - | `{ budget }` | 200, 404 |
| **POST** | `/budgets` | `{ budget }` (see schema) | `{ budget }` | 201, 400 |
| **PUT** | `/budgets/{id}` | `{ budget }` (partial) | `{ budget }` | 200, 404 |
| **DELETE** | `/budgets/{id}` | - | `{ message }` | 200, 404 |
| **GET** | `/categories` | - | `{ categories: [] }` | 200 |

### Authentication Header
All protected endpoints must accept:
```
Authorization: Bearer {jwt_token}
```

---

## 📊 Data Schemas

### User Schema
```json
{
  "userId": "uuid-string",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "Finance enthusiast",
  "avatar": "url-or-base64-string",
  "createdAt": "2024-06-15T10:30:00.000Z",
  "updatedAt": "2024-06-15T10:30:00.000Z"
}
```

### Transaction Schema
```json
{
  "transactionId": "uuid-string",
  "userId": "uuid-string",
  "date": "2024-06-15",
  "amount": 45.50,
  "type": "Expense",
  "categoryId": "cat-004",
  "description": "Weekly groceries",
  "paymentSource": "Debit Card",
  "isRecurring": false,
  "createdAt": "2024-06-15T10:30:00.000Z",
  "updatedAt": "2024-06-15T10:30:00.000Z"
}
```

**Field Validation**:
- `amount`: Positive number, max 2 decimal places
- `type`: Enum `["Income", "Expense"]`
- `date`: ISO date string (YYYY-MM-DD)
- `categoryId`: Must exist in categories table
- `paymentSource`: Optional string

### Budget Schema
```json
{
  "budgetId": "uuid-string",
  "userId": "uuid-string",
  "categoryId": "cat-004",
  "monthYear": "2024-06",
  "limitAmount": 400.00,
  "createdAt": "2024-06-15T10:30:00.000Z",
  "updatedAt": "2024-06-15T10:30:00.000Z"
}
```

**Field Validation**:
- `monthYear`: Format `YYYY-MM`
- `limitAmount`: Positive number
- `categoryId`: Must exist in categories table
- Unique constraint: `(userId, categoryId, monthYear)`

### Category Schema
```json
{
  "categoryId": "cat-001",
  "name": "Salary",
  "type": "Income",
  "icon": "briefcase",
  "createdAt": "2024-06-15T10:30:00.000Z"
}
```

**Predefined Categories** (frontend expects these 13):
```javascript
[
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
]
```

---

## 🔐 Authentication Flow

### Current Flow (localStorage)
```javascript
// Login
localStorage.setItem('finora_user', JSON.stringify(user));
localStorage.setItem('finora_isAuthenticated', 'true');

// Check Auth
const isAuth = localStorage.getItem('finora_isAuthenticated') === 'true';

// Logout
localStorage.removeItem('finora_user');
localStorage.setItem('finora_isAuthenticated', 'false');
```

### Required Backend Flow (JWT)

#### 1. Login (`POST /api/v1/auth/login`)

**Request**:
```javascript
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200 OK):
```javascript
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Response** (401 Unauthorized):
```javascript
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### 2. Signup (`POST /api/v1/auth/signup`)

**Request**:
```javascript
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response** (201 Created):
```javascript
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "user-456",
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith"
  }
}
```

#### 3. Protected Endpoints

All subsequent requests must include:
```javascript
headers: {
  'Authorization': 'Bearer ' + token,
  'Content-Type': 'application/json'
}
```

---

## 🔌 Integration Points

### Priority 1: Authentication (`auth.js`)

**File**: `frontend/assets/js/auth.js`

#### Location 1: Line 26 (Login)
```javascript
// TODO: Replace with API call -> POST /api/v1/auth/login

// CURRENT CODE:
if (email && password.length >= 6) {
    window.FINORA_STATE.setUser({
        userId: 'user-' + Date.now(),
        email: email,
        firstName: email.split('@')[0]
    });
    window.FINORA_STATE.setAuthenticated(true);
    window.location.href = '../../pages/dashboard/dashboard.html';
}

// REPLACE WITH:
try {
    const response = await fetch(`${window.FINORA_CONFIG.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
        // Store JWT token
        localStorage.setItem('finora_token', data.token);
        
        // Store user data
        window.FINORA_STATE.setUser(data.user);
        window.FINORA_STATE.setAuthenticated(true);
        
        // Redirect
        window.location.href = '../../pages/dashboard/dashboard.html';
    } else {
        showError(data.message || 'Invalid credentials');
    }
} catch (error) {
    console.error('Login error:', error);
    showError('Network error. Please try again.');
}
```

#### Location 2: Line 71 (Signup)
```javascript
// TODO: Replace with API call -> POST /api/v1/auth/signup

// Similar pattern to login above
```

---

### Priority 2: Transactions (`state.js`)

**File**: `frontend/assets/js/state.js`

#### Function: `getTransactions()` (Line 35)
```javascript
// TODO: Replace with API call -> GET /api/v1/transactions

// CURRENT CODE:
function getTransactions() {
    const transactionsStr = localStorage.getItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS);
    return transactionsStr ? JSON.parse(transactionsStr) : [];
}

// REPLACE WITH:
async function getTransactions() {
    try {
        const token = localStorage.getItem('finora_token');
        const response = await fetch(`${window.FINORA_CONFIG.API_BASE_URL}/transactions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Token expired, redirect to login
                window.location.href = '/pages/auth/login.html';
                return [];
            }
            throw new Error('Failed to fetch transactions');
        }
        
        const data = await response.json();
        return data.transactions || [];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}
```

#### Function: `addTransaction(transaction)` (Line 46)
```javascript
// TODO: Replace with API call -> POST /api/v1/transactions

// CURRENT CODE:
function addTransaction(transaction) {
    const transactions = getTransactions();
    transaction.transactionId = `txn-${Date.now()}`;
    transactions.unshift(transaction);
    localStorage.setItem(window.FINORA_CONFIG.STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return transaction;
}

// REPLACE WITH:
async function addTransaction(transaction) {
    try {
        const token = localStorage.getItem('finora_token');
        const response = await fetch(`${window.FINORA_CONFIG.API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add transaction');
        }
        
        const data = await response.json();
        return data.transaction;
    } catch (error) {
        console.error('Error adding transaction:', error);
        throw error;
    }
}
```

#### Function: `updateTransaction(id, updatedData)` (Line 55)
```javascript
// TODO: Replace with API call -> PUT /api/v1/transactions/:id

async function updateTransaction(id, updatedData) {
    try {
        const token = localStorage.getItem('finora_token');
        const response = await fetch(`${window.FINORA_CONFIG.API_BASE_URL}/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update transaction');
        }
        
        const data = await response.json();
        return data.transaction;
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
}
```

#### Function: `deleteTransaction(id)` (Line 67)
```javascript
// TODO: Replace with API call -> DELETE /api/v1/transactions/:id

async function deleteTransaction(id) {
    try {
        const token = localStorage.getItem('finora_token');
        const response = await fetch(`${window.FINORA_CONFIG.API_BASE_URL}/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete transaction');
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        throw error;
    }
}
```

---

### Priority 3: Budgets (`state.js`)

**File**: `frontend/assets/js/state.js`

#### Function: `getBudgets()` (Line 76)
```javascript
// TODO: Replace with API call -> GET /api/v1/budgets
// (Same pattern as getTransactions)
```

#### Function: `addBudget(budget)` (Line 87)
```javascript
// TODO: Replace with API call -> POST /api/v1/budgets
// (Same pattern as addTransaction)
```

#### Function: `updateBudget(id, updatedData)` (Line 96)
```javascript
// TODO: Replace with API call -> PUT /api/v1/budgets/:id
// (Same pattern as updateTransaction)
```

#### Function: `deleteBudget(id)` (Line 108)
```javascript
// TODO: Replace with API call -> DELETE /api/v1/budgets/:id
// (Same pattern as deleteTransaction)
```

---

## 📂 File-by-File Breakdown

### Files Requiring API Integration

| File | Lines | Changes Required | Priority |
|------|-------|------------------|----------|
| **config.js** | 15 | Update `API_BASE_URL` | 🔴 Critical |
| **state.js** | 35-120 | Replace 9 functions with fetch calls | 🔴 Critical |
| **auth.js** | 26, 71 | Replace 2 login/signup functions | 🔴 Critical |
| **reports.js** | 39, 236, 353, 387 | Optional: Add export/analytics APIs | 🟡 Optional |

### Files NOT Requiring Changes

✅ **All page-specific JS files** (`dashboard.js`, `transactions.js`, `budgets.js`, etc.)  
✅ **All CSS files**  
✅ **All HTML files**  
✅ **router.js**, **loadPartials.js**, **theme.js**, **utils.js**

---

## ✅ Testing Checklist

### Authentication
- [ ] Login with valid credentials → Success
- [ ] Login with invalid credentials → Error message
- [ ] Signup with new email → Account created
- [ ] Signup with existing email → Error message
- [ ] Logout → Clears session, redirects to login
- [ ] Access protected page without login → Redirects to login
- [ ] Token expiration → Redirects to login

### Transactions
- [ ] Load transactions page → Displays user's transactions
- [ ] Add new transaction → Appears in table immediately
- [ ] Edit transaction → Updates in table
- [ ] Delete transaction → Removes from table
- [ ] Filter by category → Shows correct subset
- [ ] Filter by date range → Shows correct period
- [ ] Dashboard shows updated totals after transaction CRUD

### Budgets
- [ ] Load budgets page → Displays user's budgets
- [ ] Create budget → Appears with 0% progress
- [ ] Add transaction in budget category → Progress bar updates
- [ ] Edit budget limit → Recalculates percentage
- [ ] Delete budget → Removes from page
- [ ] Budget warning colors → Green/Yellow/Red based on usage

### Data Integrity
- [ ] Dashboard total income matches sum of income transactions
- [ ] Dashboard total expenses matches sum of expense transactions
- [ ] Budget spent amount matches sum of category transactions
- [ ] Reports charts reflect actual data
- [ ] Multi-tab consistency (add transaction in tab 1, see it in tab 2)

---

## ⚠️ Common Pitfalls

### 1. Async/Await Conversion
**Problem**: All localStorage operations are synchronous. API calls are asynchronous.

**Solution**: Update calling code to handle promises:

```javascript
// BEFORE (localStorage):
const transactions = getTransactions(); // Synchronous
renderTable(transactions);

// AFTER (API):
const transactions = await getTransactions(); // Async
renderTable(transactions);
// OR
getTransactions().then(transactions => {
    renderTable(transactions);
});
```

### 2. Error Handling
**Problem**: localStorage never fails. API calls can fail.

**Solution**: Add try-catch and user feedback:

```javascript
try {
    const transaction = await addTransaction(data);
    showSuccessToast('Transaction added!');
} catch (error) {
    showErrorToast('Failed to add transaction. Please try again.');
}
```

### 3. Loading States
**Problem**: localStorage is instant. API calls take time.

**Solution**: Add loading indicators:

```javascript
showLoadingSpinner();
const transactions = await getTransactions();
hideLoadingSpinner();
renderTable(transactions);
```

### 4. CORS Issues
**Problem**: Browser blocks cross-origin requests.

**Solution**: Configure CORS headers on backend:

```javascript
// Express.js example
app.use(cors({
    origin: 'https://your-frontend-domain.com',
    credentials: true
}));
```

### 5. Token Storage
**Problem**: Security concerns with localStorage.

**Solution**: Use httpOnly cookies (backend sets, frontend auto-sends):

```javascript
// Backend sets cookie on login
res.cookie('token', jwt, { 
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict' 
});

// Frontend doesn't need to manage token manually
```

### 6. Date Formatting
**Problem**: Frontend expects `YYYY-MM-DD`, backend might return ISO 8601.

**Solution**: Ensure backend returns dates in correct format:

```javascript
// Backend should return:
{ "date": "2024-06-15" }

// NOT:
{ "date": "2024-06-15T10:30:00.000Z" }

// OR frontend converts:
const date = new Date(isoString).toISOString().split('T')[0];
```

---

## 🔄 Migration Strategy

### Phase 1: Setup (Week 1)
1. Set up backend server (Node.js/Express, Django, etc.)
2. Create database schema (PostgreSQL/MongoDB)
3. Implement authentication endpoints
4. Test with Postman/Insomnia

### Phase 2: Authentication (Week 2)
1. Update `config.js` with backend URL
2. Modify `auth.js` login function
3. Modify `auth.js` signup function
4. Test auth flow end-to-end

### Phase 3: Core Data (Week 3)
1. Update `getTransactions()` in `state.js`
2. Update `addTransaction()` in `state.js`
3. Update `updateTransaction()` in `state.js`
4. Update `deleteTransaction()` in `state.js`
5. Test transaction CRUD

### Phase 4: Budgets (Week 4)
1. Update budget functions in `state.js`
2. Test budget calculations
3. Test cross-page updates

### Phase 5: Polish (Week 5)
1. Add loading states
2. Improve error messages
3. Add retry logic
4. Performance optimization

---

## 📞 Support

If you encounter issues during integration:

1. **Check TODO comments** - All 15 locations are marked
2. **Verify data schemas** - Frontend expects exact field names
3. **Test with Postman first** - Ensure backend works independently
4. **Check browser console** - Look for CORS/network errors
5. **Compare with localStorage** - Ensure same data flow

---

## 🎓 Example: Complete Function Conversion

### Before (localStorage)
```javascript
// state.js
function getTransactions() {
    const transactionsStr = localStorage.getItem('finora_transactions');
    return transactionsStr ? JSON.parse(transactionsStr) : [];
}

// dashboard.js
function loadDashboard() {
    const transactions = getTransactions(); // Synchronous
    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('income-value').textContent = totalIncome;
}
```

### After (API)
```javascript
// state.js
async function getTransactions() {
    try {
        const token = localStorage.getItem('finora_token');
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        return data.transactions || [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// dashboard.js
async function loadDashboard() {
    showLoadingSpinner(); // NEW: Show loading state
    
    const transactions = await getTransactions(); // NOW ASYNC
    
    const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('income-value').textContent = totalIncome;
    
    hideLoadingSpinner(); // NEW: Hide loading state
}
```

---

## ✨ Final Notes

- **Start small**: Integrate auth first, then one CRUD operation at a time
- **Test frequently**: After each function conversion, test the UI
- **Maintain schemas**: Don't change field names or data types
- **Keep it simple**: The frontend is designed to make your job easy
- **Ask questions**: Check TODO comments for exact requirements

**Good luck with the integration! 🚀**

---

<div align="center">

**Questions?** Open an issue or contact the frontend team.

[⬆ Back to Top](#-backend-integration-guide-for-finora)

</div>
