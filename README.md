# 💰 Finora - Personal Finance Manager

<div align="center">

![Finora Logo](frontend/assets/images/logo.svg)

**A Modern, Interactive Personal Finance Management Application**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Styling System](#styling-system)
- [State Management](#state-management)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

Finora is a **frontend-only** personal finance management application built with pure **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. It provides a complete, interactive user experience for tracking expenses, managing budgets, and analyzing spending patterns—all without requiring a backend server.

### Why Finora?

- ✅ **Zero Dependencies** - No frameworks, no build tools, just pure web technologies
- ✅ **Offline-First** - Works entirely in the browser using localStorage
- ✅ **Backend-Ready** - Clean architecture with clear API integration points
- ✅ **Modern UI/UX** - Fintech-inspired dark theme with smooth animations
- ✅ **Fully Interactive** - SPA-like experience with dynamic DOM updates
- ✅ **Production-Ready** - Clean, modular, maintainable codebase

### Target Audience

Students, early-career professionals, and anyone seeking a simple yet powerful tool to manage personal finances.

---

## ⭐ Key Features

### 🔐 Authentication System
- **Login/Signup** flows with client-side validation
- Session management using localStorage
- Protected routes with automatic redirects

### 📊 Dashboard Overview
- Real-time financial summary (Income, Expenses, Net Balance)
- Recent transactions list
- Budget health preview
- Interactive charts (Chart.js integration)
- Personalized greeting with user avatar

### 💸 Transaction Management
- **Full CRUD Operations** - Add, Edit, Delete transactions
- **Advanced Filtering** - By category, date range, type (Income/Expense)
- **Smart Categorization** - 13 predefined categories with icons
- **Payment Sources** - Track payment methods (Cash, Card, UPI, etc.)
- **Recurring Transactions** - Flag for subscription tracking
- **Pagination & Search** - Handle large datasets efficiently

### 💰 Budget Management
- **Monthly Budgets** - Set spending limits per category
- **Real-Time Tracking** - Visual progress bars with percentage
- **Warning System** - Color-coded alerts (Green → Yellow → Red)
- **Overspending Detection** - Instant notifications when limits exceeded
- **Budget Analytics** - Spent vs. Remaining breakdown

### 📈 Reports & Analytics
- **Time Period Toggle** - Monthly/Yearly views
- **Spending Insights** - AI-like analysis cards
- **Category Breakdown** - Visual spending distribution
- **Spending Drivers** - Top expense categories
- **Comparison Tables** - Current vs. previous period
- **Trend Charts** - Income vs. Expense over time
- **Export Functionality** - PDF/CSV download (placeholder)

### ⚙️ Settings & Customization
- **Theme Modes** - Dark, Light, Auto (system preference)
- **Currency Support** - INR (₹), USD ($), EUR (€), GBP (£), JPY (¥)
- **Date Formats** - DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
- **Time Formats** - 12-hour (AM/PM), 24-hour
- **Language Selection** - Placeholder for i18n
- **Notification Preferences** - Toggle alerts
- **Data Management** - Export, Clear, Delete account

### 👤 Profile Management
- **User Profile** - Edit name, email, phone, bio
- **Avatar Upload** - Custom profile pictures
- **Financial Overview** - Total transactions, budgets, categories
- **Activity Stats** - Spending patterns, savings rate
- **Preferences Display** - Quick view of active settings

### 🎨 UI/UX Enhancements
- **Smooth Animations** - 8 keyframes with reduced-motion support
- **Responsive Design** - Mobile, tablet, desktop optimized
- **Loading States** - Skeleton screens and spinners
- **Empty States** - Helpful illustrations for no data
- **Toast Notifications** - Success/error feedback
- **Modal Dialogs** - Clean, accessible modals

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | Standard | Semantic markup structure |
| **CSS3** | Standard | Styling with CSS Variables, Grid, Flexbox |
| **JavaScript (ES6+)** | ES2020+ | Interactivity, DOM manipulation, state management |

### Libraries & Tools

| Library | Version | CDN | Usage |
|---------|---------|-----|-------|
| **Chart.js** | 4.4.0 | [unpkg](https://unpkg.com/chart.js@4.4.0/dist/chart.umd.js) | Interactive charts (Doughnut, Bar, Line) |
| **Lucide Icons** | Latest | [unpkg](https://unpkg.com/lucide@latest) | Beautiful, consistent iconography |

### State Management
- **localStorage** - Client-side persistence
- **Custom State Module** - Centralized CRUD operations

### Design System
- **Color Palette** - Modern fintech dark theme
- **Typography** - Inter font family (sans-serif fallback)
- **Spacing** - 8px baseline grid system
- **Components** - Modular, reusable UI elements

---

## 📁 Project Structure

```
finora/
│
├── README.md                           # Main documentation
├── BACKEND_INTEGRATION.md              # Backend developer guide
├── finora_all_documentation.md         # Complete PRD & specs
│
└── frontend/
    │
    ├── index.html                      # Landing page (marketing)
    │
    ├── pages/
    │   ├── auth/
    │   │   ├── login.html              # Login page
    │   │   └── signup.html             # Signup page
    │   │
    │   └── dashboard/
    │       ├── dashboard.html          # Main dashboard
    │       ├── transactions.html       # Transaction management
    │       ├── budgets.html            # Budget management
    │       ├── reports.html            # Analytics & reports
    │       ├── settings.html           # User settings
    │       └── profile.html            # User profile
    │
    ├── partials/
    │   ├── navbar.html                 # Top navigation bar
    │   └── sidebar.html                # Side navigation menu
    │
    ├── assets/
    │   ├── css/
    │   │   ├── base.css                # Global styles, variables, animations
    │   │   ├── layout.css              # Grid systems, navbar, sidebar
    │   │   ├── components.css          # Reusable UI components
    │   │   ├── illustrations.css       # SVG styling
    │   │   └── pages/
    │   │       ├── landing.css         # Landing page styles
    │   │       ├── auth.css            # Login/Signup styles
    │   │       ├── dashboard.css       # Dashboard styles
    │   │       ├── transactions.css    # Transactions page styles
    │   │       ├── budgets.css         # Budgets page styles
    │   │       ├── reports.css         # Reports page styles
    │   │       ├── settings.css        # Settings page styles
    │   │       └── profile.css         # Profile page styles
    │   │
    │   ├── js/
    │   │   ├── config.js               # Constants, categories, initial setup
    │   │   ├── state.js                # localStorage CRUD operations
    │   │   ├── router.js               # Navigation & route protection
    │   │   ├── loadPartials.js         # Dynamic navbar/sidebar loading
    │   │   ├── theme.js                # Theme switching (dark/light/auto)
    │   │   ├── utils.js                # Formatting utilities (currency, dates)
    │   │   ├── auth.js                 # Login/Signup logic
    │   │   ├── dashboard.js            # Dashboard aggregations
    │   │   ├── transactions.js         # Transaction CRUD
    │   │   ├── budgets.js              # Budget calculations
    │   │   ├── reports.js              # Report aggregations & charts
    │   │   ├── settings.js             # Settings management
    │   │   ├── profile.js              # Profile editing
    │   │   └── landing-animations.js   # Landing page interactions
    │   │
    │   └── images/
    │       ├── logo.svg                # Finora logo
    │       ├── hero.svg                # Hero section image
    │       ├── mastercard.png          # Card mockup
    │       └── undraw_*.svg            # Illustration assets (7 files)
```

---

## 🚀 Getting Started

### Prerequisites

- **Modern Web Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Local Web Server** (optional but recommended for full functionality)

### Installation

#### Option 1: Direct Browser Access (Simple)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finora.git
   cd finora/frontend
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   start index.html  # Windows
   open index.html   # macOS
   xdg-open index.html  # Linux
   ```

#### Option 2: Local Web Server (Recommended)

**Using Python:**
```bash
cd finora/frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
npm install -g http-server
cd finora/frontend
http-server -p 8000
# Visit: http://localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 📚 Usage Guide

### First Time Setup

1. **Landing Page** - Navigate to `index.html`
2. **Sign Up** - Click "Get Started Free" → Create account
3. **Dashboard** - Automatically redirected after signup

### Adding Your First Transaction

1. Navigate to **Transactions** page (sidebar)
2. Click **"Add Transaction"** button
3. Fill in details:
   - Amount (e.g., 50)
   - Date (today's date)
   - Category (e.g., "Groceries")
   - Type (Income or Expense)
   - Description (optional)
   - Payment Source (e.g., "Debit Card")
4. Click **Save**

### Setting Up Budgets

1. Navigate to **Budgets** page
2. Click **"Create Budget"** button
3. Select:
   - Category (e.g., "Dining Out")
   - Month/Year (current month)
   - Limit Amount (e.g., 300)
4. Click **Save Budget**
5. Watch real-time progress bars update!

### Viewing Reports

1. Navigate to **Reports** page
2. Toggle between **Monthly** / **Yearly** views
3. Explore:
   - Spending insights cards
   - Category distribution charts
   - Income vs. Expense trends
   - Top spending drivers

### Customizing Settings

1. Navigate to **Settings** (user menu → Settings)
2. Customize:
   - **Theme** - Dark/Light/Auto
   - **Currency** - INR, USD, EUR, GBP, JPY
   - **Date Format** - DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
   - **Time Format** - 12h/24h
3. Changes apply instantly across all pages!

---

## 🏗️ Architecture

### Modular JavaScript Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    HTML Pages                          │  │
│  │  (index, login, signup, dashboard, transactions, etc.) │  │
│  └───────────────────────────────────────────────────────┘  │
│                             │                                │
│                             ▼                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               JavaScript Modules                       │  │
│  │                                                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌─────────────┐     │  │
│  │  │  router.js │  │  theme.js  │  │  utils.js   │     │  │
│  │  └────────────┘  └────────────┘  └─────────────┘     │  │
│  │                                                         │  │
│  │  ┌────────────────────────────────────────────────┐   │  │
│  │  │           Page-Specific Modules                 │   │  │
│  │  │  dashboard.js  transactions.js  budgets.js     │   │  │
│  │  │  reports.js    settings.js      profile.js     │   │  │
│  │  └────────────────────────────────────────────────┘   │  │
│  │                        │                               │  │
│  │                        ▼                               │  │
│  │  ┌───────────────────────────────────────────────┐    │  │
│  │  │           state.js (State Manager)             │    │  │
│  │  │   (Centralized localStorage CRUD wrapper)      │    │  │
│  │  └───────────────────────────────────────────────┘    │  │
│  │                        │                               │  │
│  └────────────────────────┼───────────────────────────────┘  │
│                            ▼                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  localStorage                          │  │
│  │  ┌──────────────────────────────────────────────┐    │  │
│  │  │  Keys:                                        │    │  │
│  │  │  • finora_user                               │    │  │
│  │  │  • finora_isAuthenticated                    │    │  │
│  │  │  • finora_transactions  (Array)              │    │  │
│  │  │  • finora_budgets       (Array)              │    │  │
│  │  │  • finora_categories    (Array)              │    │  │
│  │  │  • finora_settings      (Object)             │    │  │
│  │  │  • finora_theme         (String)             │    │  │
│  │  └──────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### State Management Flow

```javascript
// 1. User Action (e.g., Add Transaction)
function handleTransactionSubmit(formData) {
    
    // 2. Validate Data
    if (!formData.amount || !formData.category) {
        showError('Required fields missing');
        return;
    }
    
    // 3. Call State Manager
    const transaction = window.FINORA_STATE.addTransaction(formData);
    
    // 4. State Manager Updates localStorage
    // (Behind the scenes in state.js)
    
    // 5. Update UI
    renderTransactionTable();
    showSuccessToast('Transaction added!');
    
    // 6. Notify Related Pages
    // (Dashboard, Budgets auto-update on next load)
}
```

---

## 🎨 Styling System

### CSS Variables (Dark Theme)

```css
:root {
    /* Colors */
    --primary-accent: #7C3AED;        /* Purple */
    --background-dark: #121212;       /* Deep Black */
    --surface-elevated: #1C1C1E;      /* Card Background */
    --text-primary: #FFFFFF;          /* White Text */
    --text-secondary: #A0A0A0;        /* Gray Text */
    
    /* Semantic Colors */
    --semantic-success: #34C759;      /* Green (Income) */
    --semantic-warning: #FF9500;      /* Orange (Warning) */
    --semantic-danger: #FF3B30;       /* Red (Overspent) */
    
    /* Spacing (8px baseline) */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    
    /* Typography */
    --font-family: 'Inter', sans-serif;
    --font-size-h1: 28px;
    --font-size-body: 14px;
}
```

### Animation Keyframes

8 predefined animations with reduced-motion support:
- `fadeIn` - Opacity 0 → 1
- `slideUp` - Translate Y 20px → 0
- `slideDown` - Translate Y -20px → 0
- `slideLeft` - Translate X 20px → 0
- `slideRight` - Translate X -20px → 0
- `scaleIn` - Scale 0.95 → 1
- `pulse` - Scale 1 → 1.05 → 1
- `shimmer` - Loading skeleton effect

---

## 💾 State Management

### localStorage Schema

#### User Object
```javascript
{
    userId: "user-123",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    bio: "Finance enthusiast",
    avatar: "data:image/png;base64,...",
    createdAt: "2024-06-15T10:30:00.000Z"
}
```

#### Transaction Object
```javascript
{
    transactionId: "txn-1735567890123",
    date: "2024-06-15",
    amount: 45.50,
    type: "Expense",              // "Income" or "Expense"
    categoryId: "cat-004",         // Foreign key
    description: "Weekly groceries",
    paymentSource: "Debit Card",
    isRecurring: false
}
```

#### Budget Object
```javascript
{
    budgetId: "bgt-1735567890456",
    categoryId: "cat-004",
    monthYear: "2024-06",          // YYYY-MM format
    limitAmount: 400.00
}
```

#### Category Object
```javascript
{
    categoryId: "cat-004",
    name: "Groceries",
    type: "Expense",
    icon: "shopping-cart"          // Lucide icon name
}
```

---

## 🔮 Future Enhancements

### Planned Features (Post-Backend Integration)

- [ ] **Real-time Sync** - Multi-device synchronization
- [ ] **Data Encryption** - End-to-end encryption
- [ ] **AI Insights** - Machine learning spending predictions
- [ ] **Goal Tracking** - Savings goals with milestones
- [ ] **Bill Reminders** - Automated payment notifications
- [ ] **Bank Integration** - Plaid/Yodlee API for auto-import
- [ ] **Receipt Scanning** - OCR for receipt uploads
- [ ] **Expense Splitting** - Share bills with friends
- [ ] **Investment Tracking** - Portfolio management
- [ ] **Tax Reporting** - Automated tax document generation
- [ ] **Mobile App** - React Native/Flutter version
- [ ] **Browser Extension** - Quick expense logging

### Technical Improvements

- [ ] **PWA Support** - Offline-first with Service Workers
- [ ] **IndexedDB** - Replace localStorage for larger datasets
- [ ] **Chart Optimization** - Lazy loading, virtualization
- [ ] **i18n Support** - Multi-language translations
- [ ] **Accessibility** - WCAG 2.1 Level AA compliance
- [ ] **Unit Tests** - Jest/Vitest test coverage
- [ ] **E2E Tests** - Playwright/Cypress automation
- [ ] **Performance** - Lighthouse score 95+

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to Branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Coding Standards

- Use **semantic HTML5** elements
- Follow **BEM methodology** for CSS classes
- Write **ES6+ JavaScript** (no jQuery)
- Add **JSDoc comments** for functions
- Maintain **8px spacing baseline**
- Ensure **cross-browser compatibility**

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Project Maintainer** - [@yourusername](https://github.com/yourusername)

**Project Link** - [https://github.com/yourusername/finora](https://github.com/yourusername/finora)

---

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Beautiful charts
- [Lucide Icons](https://lucide.dev/) - Icon library
- [unDraw](https://undraw.co/) - Illustration assets
- [Inter Font](https://rsms.me/inter/) - Typography
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation
- [CSS-Tricks](https://css-tricks.com/) - CSS inspiration

---

<div align="center">

**Built with ❤️ using Pure Web Technologies**

[⬆ Back to Top](#-finora---personal-finance-manager)

</div>
