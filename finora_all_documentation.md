# Finora

## Project Description
Perfect — this is exactly the kind of clear system-level description a video code copilot / AI coding assistant understands well.

Below is a clean, detailed, frontend-only project description you can paste directly.
It tells the AI what to build, how to structure files, how pages interact, and how backend teams can plug in later.


---

📌 Project Description – Frontend Only (HTML, CSS, JavaScript)

Project Name

Personal Finance Manager – Frontend


---

🎯 Goal of the Web App

Build a fully interactive frontend for a personal finance manager using only HTML, CSS, and JavaScript.
The app should feel like a real fintech product, where all pages are connected, navigation works smoothly, and UI states update dynamically using JavaScript.

This is a frontend-only implementation. No backend logic is required, but the code and structure must be clean, readable, and backend-ready so API integration can be added later without refactoring.


---

🧠 Core Principles

Use separate HTML, CSS, and JS files for every page

Use modular folder structure

No inline CSS or JS

Pages should communicate with each other using JavaScript (navigation, shared data via localStorage)

UI should be fully interactive (forms, modals, filters, charts placeholders)

Follow professional naming conventions

Easy for backend team to identify:

where API calls will go

where data rendering happens




---

🗂️ Folder Structure (MANDATORY)

frontend/
│
├── index.html                 # Landing page
│
├── pages/
│   ├── auth/
│   │   ├── login.html
│   │   ├── signup.html
│   │
│   ├── dashboard/
│   │   ├── dashboard.html
│   │   ├── transactions.html
│   │   ├── budgets.html
│   │   ├── reports.html
│
├── partials/
│   ├── navbar.html
│   ├── sidebar.html
│
├── assets/
│   ├── css/
│   │   ├── base.css            # global styles, colors, typography
│   │   ├── layout.css          # navbar, sidebar, grids
│   │   ├── components.css      # buttons, cards, modals
│   │   ├── pages/
│   │   │   ├── landing.css
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── transactions.css
│   │   │   ├── budgets.css
│   │   │   ├── reports.css
│
│   ├── js/
│   │   ├── config.js           # constants, dummy data
│   │   ├── router.js           # navigation between pages
│   │   ├── state.js            # shared app state (localStorage)
│   │   ├── loadPartials.js     # navbar & sidebar loader
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   ├── reports.js
│   │
│   └── images/
│       └── logo.svg


---

🔁 Page Communication & Interaction Rules

Navigation

All navigation should be handled via:

normal links (window.location)

or a simple JS router


Sidebar and navbar must be reused via partials



---

Shared State (Very Important)

Use localStorage to simulate backend data:

logged-in user

transactions

budgets


Example:


localStorage.setItem("transactions", JSON.stringify([]))

This allows:

Dashboard → show totals

Transactions → add/update data

Budgets → calculate usage



---

📄 Page-by-Page Behavior


---

1️⃣ Landing Page (index.html)

Purpose: Marketing & entry point

UI

Hero section

Features (Core + AI cards)

CTA buttons


Behavior

Login → navigate to login page

Signup → navigate to signup page



---

2️⃣ Login Page (login.html)

Purpose: Authentication UI

UI

Email & password inputs

Login button

Link to signup


Behavior

On submit:

validate inputs

save dummy user to localStorage

redirect to dashboard




---

3️⃣ Signup Page (signup.html)

Purpose: Registration UI

Behavior

Save user info in localStorage

Redirect to login or dashboard



---

4️⃣ Dashboard Page (dashboard.html)

Purpose: Overview screen

Components

Summary cards (income, expense, balance)

Expense chart placeholder

Recent transactions list

Budget status preview


Behavior

Read data from localStorage

Update UI dynamically

Links to Transactions & Budgets pages



---

5️⃣ Transactions Page (transactions.html)

Purpose: Core CRUD UI

Components

Add transaction modal

Transaction table

Filters (category, date, type)


Behavior

Add/edit/delete transactions

Save to localStorage

Reflect changes across app



---

6️⃣ Budgets Page (budgets.html)

Purpose: Spending limits UI

Components

Budget overview strip

Category budget cards

Progress bars

Edit budget modal


Behavior

Calculate usage using transaction data

Visual warnings when exceeded



---

7️⃣ Reports Page (reports.html)

Purpose: Analytics UI

Components

Chart placeholders

Monthly/yearly toggle


Behavior

Read aggregated data

Display summaries (UI only)



---

🧩 Reusable Components

Navbar

App name

User profile dropdown

Logout button


Sidebar

Dashboard

Transactions

Budgets

Reports


Loaded dynamically on all dashboard pages.


---

🎨 Styling Rules

Use a modern fintech dark theme

Consistent spacing

No inline styles

Buttons & cards reused via components.css



---

🧪 Backend Readiness

All API calls should be commented placeholders


// TODO: Replace with backend API call

Clear separation between:

UI rendering

data handling

navigation




---

✅ Final Outcome

The result should be:

A fully clickable, interactive frontend

Clean, readable codebase

Easy for backend developers to:

replace localStorage with APIs

plug in Django endpoints


Professional enough for demos, reviews, and interviews



---

If you want, next I can:

Convert this into a shorter AI prompt

Generate starter boilerplate files

Create dummy data structures

Design navigation + state flow diagram


Just tell me what you want next 👍

## Product Requirements Document
Product Requirements Document (PRD) - Finora Frontend Implementation

1. Introduction
1.1 Project Overview
Finora is a modern, interactive Personal Finance Manager frontend application developed using pure HTML, CSS, and JavaScript. The primary goal is to create a high-fidelity, dynamic UI that simulates a complete fintech experience, ready for seamless backend API integration.

1.2 Goals
*   Deliver a fully functional, interactive user interface for managing personal finances (transactions, budgets, reports).
*   Ensure clean separation of concerns (HTML structure, CSS styling, JavaScript logic).
*   Use localStorage to simulate persistent data storage and cross-page state management.
*   Adhere strictly to the specified modular folder structure.
*   Provide clear placeholders for future backend API integration points.

1.3 Core Principles
*   No backend logic required; all data manipulation is client-side (localStorage).
*   Modular structure: separate files for pages, partials, and JS modules.
*   Dynamic updates within pages simulating SPA behavior, even if navigation uses traditional page loads.
*   Adherence to a modern fintech dark theme aesthetic.

2. User Stories & Target Audience Needs
The application is targeted at students and early-career professionals focused on essential financial management tasks:
*   As a new user, I need clear onboarding and signup/login flows to access the application.
*   As a user, I need to quickly see an overview of my current financial status (Dashboard).
*   As a user, I need an easy way to log new income and expenses and categorize them.
*   As a user, I need to set and track monthly budgets by category to control spending.
*   As a user, I need simple, actionable reports to understand where my money is going month-to-month.

3. Functional Requirements

3.1 Authentication (Simulated)
*   **Login (login.html):** Accepts email/password. Basic validation (minimum 6-character password). Successful login saves a dummy user object and \"isAuthenticated=true\" to localStorage and redirects to /dashboard.html. Displays inline error messages for empty fields or simulated invalid credentials.
*   **Signup (signup.html):** Collects user details. Saves initial user data to localStorage. Redirects to login or dashboard upon success. Displays inline error for simulated duplicate email usage.
*   **Session Management:** Uses localStorage for session state simulation. Manual logout clears session data.

3.2 Dashboard (dashboard.html)
*   **Summary Cards:** Display total Income, total Expense, and Net Balance calculated from all transactions in localStorage.
*   **Recent Transactions:** Shows the 5 most recent transactions.
*   **Budget Preview:** Shows a summary/status strip of overall budget health (e.g., \"On Track,\" \"Warning\").
*   **Chart Placeholder:** Space reserved for expense distribution visualization (data updated dynamically based on filters).
*   Behavior: Reads all necessary data from localStorage on load and dynamically renders components.

3.3 Transactions Management (transactions.html)
*   **Transaction Table:** Displays all stored transactions. Must support realistic pagination/scrolling behavior simulation even without virtualization.
*   **Filters:** Must implement client-side filtering logic by Category, Date Range, and Type (Income/Expense). Filters instantly update the displayed table data via JS DOM manipulation.
*   **Add/Edit Modal:** Modal interface for creating new transactions or modifying existing ones.
    *   Required Fields: Amount, Date, Category, Type (Income/Expense).
    *   Metadata Fields: Description/Notes, Payment Source, Recurring Flag (Boolean).
    *   Must generate a unique transactionId on creation.
*   **Data Persistence:** All CRUD operations update the \"transactions\" item in localStorage immediately and trigger UI updates across related components (Dashboard, Budgets).

3.4 Budget Management (budgets.html)
*   **Monthly Focus:** Budget calculations are strictly monthly (V1 scope). No rollover logic implemented initially.
*   **Budget Definition:** UI must allow defining a maximum spending limit per pre-defined category for the current month.
*   **Progress Visualization:** Each budget category must display a progress bar showing percentage used vs. total allocated.
*   **Warning States:** Visual indicators (e.g., color change) when budget utilization exceeds 80% or is 100%+ utilized.
*   **Calculation:** Usage is calculated by aggregating transaction amounts matching that category and month.

3.5 Reporting (reports.html)
*   **Time Toggle:** Simple UI toggle for viewing monthly vs. aggregated (simulated yearly) reports.
*   **Report Metrics (Placeholders):**
    1.  Category-wise spending breakdown (initial structure for a chart).
    2.  Income vs. Expense Trend comparison (simulated monthly view).
    3.  Monthly Financial Summary: Total Income, Total Expenses, Net Savings.
*   Behavior: Aggregates dummy data from localStorage to populate placeholder structures. Interactivity must update placeholders instantly.

4. Technical Specifications

4.1 Folder Structure (Mandatory Adherence)
(See Project Description for exact structure)

4.2 State Management (localStorage)
The following keys must be utilized in localStorage:
*   `userProfile`: Stores the logged-in user data.
*   `isAuthenticated`: Boolean flag for session simulation.
*   `transactions`: Array of transaction objects.
*   `budgets`: Array of monthly budget objects.

4.3 Data Structures (Schema for localStorage)

**Transaction Object Example:**
{
  "transactionId": "uuid-12345",
  "amount": 45.50,
  "date": "2024-06-15",
  "category": "Groceries",
  "type": "Expense", // "Income" or "Expense"
  "description": "Weekly shop at local market",
  "paymentSource": "Debit Card",
  "isRecurring": false
}

**Budget Object Example (Monthly Scope):**
{
  "budgetId": "bgt-001",
  "monthYear": "2024-06", // YYYY-MM format
  "category": "Dining Out",
  "limit": 300.00
}

4.4 Frontend Interactivity (SPA Simulation)
*   All updates (adding transactions, applying filters) must be handled via JavaScript DOM manipulation without triggering a full page reload for that specific data update.
*   Navigation between main sections (Dashboard, Transactions, etc.) will utilize standard link navigation initially, but the structure supports future routing implementation.

4.5 Styling and Design
*   **Aesthetic:** Modern fintech dark theme (e.g., deep greys, high contrast white text).
*   **Typography:** Clean sans-serif font family.
*   **CSS Structure:** Strict adherence to separated CSS files for base, layout, components, and page-specific styles. No inline styles permitted.
*   **Components:** Navbar and Sidebar must be loaded dynamically via JavaScript partials loader.

4.6 Backend Readiness and API Placeholders
All JavaScript modules responsible for data handling must include commented placeholders indicating where future RESTful API calls should be inserted, assuming a base path of /api/v1/.

Example Placeholders:
// TODO: API Call -> GET /api/v1/transactions
// TODO: API Call -> POST /api/v1/transactions

5. Deliverables and Constraints
*   The project must be runnable by opening index.html in a modern browser.
*   The solution must be frontend-only (HTML, CSS, JS). No external libraries (like React/Vue) or charting libraries are permitted in V1. Chart placeholders should use basic DOM elements/SVG if necessary, or just clear visual blocks.
*   Initial localStorage data volume must include 30-50 transactions and 5-6 budgets to allow meaningful testing of summaries and filtering.

## Technology Stack
TECHNOLOGY STACK DOCUMENT: Finora (Frontend Only)

1. OVERVIEW

This document outlines the technology stack chosen for the frontend implementation of the Finora Personal Finance Manager. As this implementation is frontend-only, the stack focuses entirely on delivering a responsive, interactive, and well-structured user interface using standard web technologies. The structure is explicitly designed to facilitate seamless future integration with a RESTful backend API.

2. CORE TECHNOLOGIES

| Technology | Version / Context | Justification |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Standard structure for web content. Used in separate files as per project mandate. |
| **Styling** | CSS3 | Used exclusively for styling. Separation of concerns mandated into base, layout, components, and page-specific stylesheets. |
| **Interactivity** | Vanilla JavaScript (ES6+) | Used for all interactivity, DOM manipulation, routing, and state management (via localStorage). Chosen to avoid framework overhead for this initial phase while maintaining clean, modular code. |

3. FOLDER STRUCTURE AND MODULARITY

The mandatory structure ensures clear separation of concerns, crucial for maintainability and backend handoff:

*   **`index.html`**: Entry point.
*   **`pages/`**: Contains the primary HTML structure for each major application view (e.g., dashboard, transactions).
*   **`partials/`**: Stores reusable HTML snippets (navbar, sidebar) loaded dynamically via JavaScript.
*   **`assets/css/`**: Strictly separated CSS files:
    *   `base.css`: Global resets, typography, color variables (Fintech Dark Theme variables).
    *   `layout.css`: Grid systems, navigation shells.
    *   `components.css`: Reusable UI elements (buttons, cards, modals).
    *   `pages/*.css`: Specific styles per screen.
*   **`assets/js/`**: Modular JavaScript organization:
    *   `config.js`: Constants and dummy data structure definitions.
    *   `router.js`: Manages client-side navigation logic.
    *   `state.js`: Handles all data persistence and retrieval via localStorage.
    *   `loadPartials.js`: Handles dynamic loading of shared components.
    *   Page-specific modules (`dashboard.js`, `transactions.js`, etc.) for focused logic.

4. STATE MANAGEMENT AND INTERACTIVITY

**Mechanism:** Local Storage

| Concept | Implementation Detail | Backend Readiness Note |
| :--- | :--- | :--- |
| **Shared State** | Uses `localStorage` to persist essential data (user session, transactions array, budget objects). | All reads/writes in `state.js` are clearly demarcated. These functions will be the first targets for replacement with `fetch()` calls to the API. |
| **Session Simulation** | Dummy user object and an `isAuthenticated` flag stored in localStorage upon successful login simulation. | Structure allows for future inclusion of JWT tokens or session expiration timestamps. |
| **Interactivity Depth** | Heavy reliance on Vanilla JS DOM manipulation to update UIs immediately upon form submission or filter change, mimicking SPA behavior without page reloads. | Placeholder functions for API calls are mandated in relevant JS modules (e.g., `transactions.js`) corresponding to the defined REST endpoints. |

5. STYLING AND DESIGN AESTHETICS

*   **Theme:** Modern Fintech Dark Theme (Inspired by Stripe/Revolut minimalism).
*   **Font:** Preference for clean, highly legible sans-serif fonts (e.g., Inter, Roboto).
*   **Color Palette:** Restrained, high-contrast scheme utilizing one strong primary accent color for CTAs and active states, set via CSS variables in `base.css`.
*   **Principle:** Consistency, professionalism, and accessibility through high contrast. No inline styles permitted.

6. BACKEND READINESS AND API INTEGRATION GUIDELINES

The entire frontend is structured to minimize refactoring when the backend is connected.

**API Assumptions (RESTful, Versioned):**
*   Base Endpoint: Assumed prefix `/api/v1`

**Mandatory API Placeholder Comments:**
JavaScript modules will explicitly contain comments indicating where a `fetch` call should replace the current `localStorage` operation.

| Domain Functionality | Placeholder Endpoint Reference (For Backend Reference) |
| :--- | :--- |
| User Auth | `// TODO: POST /api/v1/auth/login` |
| Transaction CRUD | `// TODO: GET/POST/PUT/DELETE /api/v1/transactions` |
| Budget Management | `// TODO: GET/POST /api/v1/budgets` |
| Reporting Data | `// TODO: GET /api/v1/reports/summary?period=monthly` |

7. DATA STRUCTURE EXPECTATION (For V1 Simulation)

Data integrity is maintained using clear schemas simulated in `config.js` and persisted in `state.js`:

*   **Transaction Object Fields (Mandatory V1):** `transactionId` (UUID/Unique ID), `date`, `amount`, `type` (Income/Expense), `category`, `description/notes`, `paymentSource`, `isRecurring` (Boolean).
*   **Budget Object Fields:** `budgetId`, `monthYear` (YYYY-MM format), `category`, `allocatedAmount`.
*   **Goal Alignment:** Data volume (30-50 transactions) is set to ensure Report and Dashboard aggregation logic is effectively testable immediately.

8. PERFORMANCE CONSIDERATIONS

Performance focus in V1 is on perceived responsiveness. All dynamic updates (filtering, CRUD) must occur instantly via client-side DOM manipulation. Initial load time tolerance is < 2 seconds, achieved by using only standard, non-bundled assets (plain HTML, CSS, JS files). Virtualization/Pagination excluded from V1 scope but the DOM structure supports future implementation.

## Project Structure
# PROJECT STRUCTURE DOCUMENT: Finora (Personal Finance Manager Frontend)

This document details the mandatory folder structure, file organization, and principles governing the development of the Finora frontend application. This structure prioritizes maintainability, modularity, and clear separation of concerns, facilitating seamless future integration with backend APIs.

## 1. Root Directory Structure

The project root (`frontend/`) contains all primary assets, pages, and scripts.

```
frontend/
│
├── index.html                 # Landing page (Marketing & Entry)
│
├── pages/                     # Directory for all primary application pages
│   ├── auth/
│   │   ├── login.html
│   │   ├── signup.html
│   │
│   ├── dashboard/
│   │   ├── dashboard.html     # Main overview
│   │   ├── transactions.html  # CRUD interface for transactions
│   │   ├── budgets.html       # Budget management
│   │   ├── reports.html       # Analytics and summary views
│
├── partials/                  # Reusable HTML snippets loaded via JS
│   ├── navbar.html
│   ├── sidebar.html
│
├── assets/                    # Static resources (CSS, JS, Images)
│   ├── css/
│   │   ├── base.css           # Global styles, reset, typography, colors (Dark Theme)
│   │   ├── layout.css         # Structure: navbar, sidebar, grid systems
│   │   ├── components.css     # Reusable UI elements: buttons, cards, modals
│   │   ├── pages/             # Page-specific overrides or unique styles
│   │   │   ├── landing.css
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── transactions.css
│   │   │   ├── budgets.css
│   │   │   ├── reports.css
│   │
│   ├── js/
│   │   ├── config.js          # Constants (e.g., STORAGE_KEYS), initial dummy data setup
│   │   ├── router.js          # Handles SPA-like navigation simulation (if needed) and routing logic
│   │   ├── state.js           # Core logic for reading/writing to localStorage (Shared State)
│   │   ├── loadPartials.js    # Script to dynamically load navbar and sidebar HTML content
│   │   ├── auth.js            # Logic for login/signup validation and session management
│   │   ├── dashboard.js       # Logic for dashboard data aggregation and rendering
│   │   ├── transactions.js    # Logic for transaction CRUD operations
│   │   ├── budgets.js         # Logic for budget calculation and display
│   │   ├── reports.js         # Logic for data aggregation specific to reports
│   │
│   └── images/
│       └── logo.svg
```

## 2. File Responsibilities and Inter-File Communication

### 2.1. HTML Pages (`index.html`, `pages/`)

Each application view resides in its own HTML file.

*   **Partials Integration:** All primary pages (`dashboard.html`, `transactions.html`, etc.) must include references to the dynamic loader script (`loadPartials.js`) to ensure the `navbar.html` and `sidebar.html` are inserted correctly upon page load.
*   **Data Hooks:** HTML elements requiring dynamic data binding (e.g., summary cards, transaction tables) must use distinct, descriptive IDs (e.g., `id="balance-value"`, `id="transaction-list-body"`) for easy targeting by JavaScript scripts.

### 2.2. Styling (`assets/css/`)

A three-tiered CSS structure is enforced:

1.  **`base.css`:** Defines the global fintech dark theme palette, typography (sans-serif), base font sizes, and utility styling variables.
2.  **`layout.css`:** Styles structural elements: main application containers, navigation bars, sidebars, and overall page flow (e.g., utilizing CSS Grid/Flexbox for dashboard layouts).
3.  **`components.css`:** Styles atomic/reusable components like buttons, input fields, data cards, modals, and progress bars. These components should be styled abstractly, suitable for reuse across different pages.
4.  **`pages/*.css`:** Used only for unique structural elements or specific content that cannot be generalized into components (e.g., the specific layout of the Landing Page Hero section).

### 2.3. JavaScript Modules (`assets/js/`)

JavaScript follows a modular structure where each file handles a specific concern.

| File | Primary Responsibility | State Interaction | Backend Readiness Hooks |
| :--- | :--- | :--- | :--- |
| `config.js` | Define global constants and initialize dummy data structures in `localStorage` upon first run. | N/A (Initialization) | Defines endpoint base URL constants. |
| `state.js` | Centralized wrapper functions (`getTransactions()`, `setUser(user)`) for all `localStorage` interactions. | Read/Write Shared State | All `localStorage` operations are isolated here, making replacement easy. |
| `loadPartials.js` | Uses `fetch()` to load `navbar.html` and `sidebar.html` content into designated placeholders in the respective pages. | N/A | N/A |
| `router.js` | Manages navigation flows, especially between authenticated pages. Should be robust enough to handle internal link clicks if implemented, falling back to `window.location`. | Reads session state from `state.js` to determine redirects (e.g., redirecting logged-in user from `login.html`). | Placeholder for future client-side routing framework integration. |
| `auth.js` | Handles Login/Signup form submissions, input validation, and writes user session data to `state.js`. | Writes user data to `state.js`. | **Placeholder:** `// TODO: Replace with POST /api/v1/auth/login` |
| `dashboard.js` | Aggregates transaction data from `state.js`, calculates summary metrics (Income, Expense, Balance), and updates dashboard DOM elements. | Reads all necessary data from `state.js`. | **Placeholder:** Chart data fetching hooks (e.g., `// TODO: GET /api/v1/transactions/summary`). |
| `transactions.js` | Handles rendering the transaction table, displaying the Add/Edit Modal, and executing CRUD operations via `state.js`. | Writes directly to transaction array in `state.js`. | **Placeholder:** `// TODO: POST /api/v1/transactions`, `// TODO: DELETE /api/v1/transactions/:id` |
| `budgets.js` | Reads transactions and budget definitions from `state.js`. Calculates actual spending vs. budget limit for each category (monthly focus). | Reads both transaction and budget state from `state.js`. | **Placeholder:** Budget creation/update hooks. |
| `reports.js` | Implements complex aggregation logic (e.g., income vs. expense trends, category breakdowns) based on filtered data from `state.js`. | Reads transaction data from `state.js`. | **Placeholder:** Aggregation endpoint calls. |

## 3. State Management and Backend Readiness

### 3.1. Shared State Simulation (`localStorage`)

`localStorage` is the single source of truth for persisted data necessary across pages:

*   `"finora_user"`: Stores the logged-in user object (simulated session).
*   `"finora_transactions"`: Array of transaction objects (initialized with 30–50 records).
*   `"finora_budgets"`: Array of budget objects (monthly, category-specific).

**Backend Integration Strategy:**
When a backend team integrates, the logic within `state.js` (specifically the functions that interact with `localStorage`) will be updated. The functions performing CRUD operations in scripts like `transactions.js` and `dashboard.js` will be modified to call the appropriate `/api/v1/...` endpoints instead of interacting with local storage keys. The existing function names and parameters will remain consistent to minimize refactoring impact.

### 3.2. Data Volume Expectation

`config.js` will contain the logic to pre-populate `localStorage` upon first load to ensure meaningful data exists for testing the Dashboard, Transactions filtering, and Reports aggregation stages (approx. 30–50 transactions, 5–6 budgets).

## 4. Page Communication & Interactivity Depth

*   **Navigation:** Standard hyperlink navigation (`<a href="...">`) is permitted for moving between pages, ensuring a clean separation between page loads and internal dynamic interactions.
*   **Dynamic Interactivity:** All interactions *within* a page (e.g., submitting a transaction form, changing a filter dropdown) must be handled by JavaScript using DOM manipulation (e.g., `document.getElementById().innerHTML = ...`) without causing a full browser page reload, simulating an SPA experience.
*   **Cross-Page Consistency:** Any state-changing action (e.g., adding a transaction on `transactions.html`) must immediately update `localStorage`, ensuring that upon navigating to `dashboard.html`, the new data is instantly reflected in the summary cards and recent transactions list.

## Database Schema Design
# SCHEMADESIGN: Finora Personal Finance Manager (Frontend Data Model)

This document outlines the conceptual data structures and relationships required for the Finora frontend application. Since this is a frontend-only implementation, these structures will be persisted in the browser's `localStorage` until API integration replaces them. The design prioritizes clear, domain-specific objects suitable for direct mapping to future REST endpoints.

## 1. Core Data Structures (LocalStorage Keys)

The primary data entities will be stored under the following keys in `localStorage`:

| LocalStorage Key | Description | Structure | Primary API Endpoint Placeholder |
| :--- | :--- | :--- | :--- |
| `finora_user` | Authenticated user profile information. | User Object | `/api/v1/user` |
| `finora_transactions` | Array of all financial transactions. | Array of Transaction Objects | `/api/v1/transactions` |
| `finora_budgets` | Array of defined monthly budgets per category. | Array of Budget Objects | `/api/v1/budgets` |
| `finora_categories` | Predefined/user-defined spending/income categories. | Array of Category Objects | `/api/v1/categories` |

## 2. Data Models (Object Schemas)

### 2.1. User Object (`finora_user`)

Represents the currently logged-in user.

| Field Name | Data Type | Description | Required | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `userId` | String | Unique identifier for the user. | Yes | Generated/Provided by backend. |
| `email` | String | User's unique email address. | Yes | Used for login. |
| `firstName` | String | User's first name. | Yes | Used in UI greetings. |
| `isAuthenticated`| Boolean | Session simulation flag. | Yes | Set to `true` upon successful login. |
| `createdAt` | String (ISO Date) | Account creation timestamp. | Yes | |

### 2.2. Transaction Object (`finora_transactions`)

Represents a single income or expense record.

| Field Name | Data Type | Description | Required | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `transactionId` | String | Unique identifier for the transaction. | Yes | Frontend-generated UUID for v1 (e.g., using `crypto.randomUUID()`). |
| `date` | String (ISO Date) | Date the transaction occurred. | Yes | Used for filtering and reporting. |
| `amount` | Number | Monetary value (positive for income, negative for expense). | Yes | Stored as a number. |
| `type` | String | \"Income\" or \"Expense\". | Yes | |
| `categoryId` | String | Foreign key reference to `finora_categories`. | Yes | Essential for budget tracking. |
| `description` | String | Short note or description (e.g., \"Groceries at Safeway\"). | No | User context field. |
| `paymentSource` | String | How the transaction was paid (e.g., \"Debit Card\", \"Cash\", \"Credit Card\"). | No | Supports filtering. |
| `isRecurring` | Boolean | Flag if this is a repeating transaction. | No | Simple flag, no recurrence logic in v1. |

**API Placeholder:**
`// TODO: POST /api/v1/transactions` (Create)
`// TODO: GET /api/v1/transactions?userId={id}` (Retrieve List)

### 2.3. Category Object (`finora_categories`)

Defines the types of spending and income allowed.

| Field Name | Data Type | Description | Required | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `categoryId` | String | Unique identifier for the category. | Yes | |
| `name` | String | Display name (e.g., \"Groceries\", \"Salary\"). | Yes | |
| `type` | String | \"Expense\" or \"Income\". | Yes | Must match transaction type consistency. |
| `icon` | String | Placeholder for an icon identifier (e.g., \"fa-cart-shopping\"). | No | UI implementation detail. |

**Relationship:** Transactions link directly to Categories via `categoryId`.

### 2.4. Budget Object (`finora_budgets`)

Defines the monthly spending limit for a specific category. Calculations are monthly only (v1 scope).

| Field Name | Data Type | Description | Required | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `budgetId` | String | Unique identifier for the budget record. | Yes | Frontend-generated UUID for v1. |
| `categoryId` | String | Foreign key reference to the category being budgeted. | Yes | Only expense categories should have budgets. |
| `monthYear` | String | Identifier for the budget period (YYYY-MM). | Yes | E.g., \"2024-07\". Crucial for monthly scope. |
| `limitAmount` | Number | The maximum budgeted amount for this category this month. | Yes | Must be a positive value. |

**Relationship:** Budgets link to Categories via `categoryId`. Budget usage is calculated dynamically by aggregating linked transactions (`type=\"Expense\"`, matching `categoryId` and `monthYear`).

**API Placeholder:**
`// TODO: PUT /api/v1/budgets/{budgetId}` (Update/Create)

## 3. Data Relationships Summary

1.  **User to Transactions:** One User has Many Transactions (Implied via session context).
2.  **Category to Transactions:** One Category has Many Transactions (via `categoryId`).
3.  **Category to Budgets:** One Category can have Many Budgets (one per month, via `categoryId`).

## 4. Frontend State Management Notes

*   **Data Loading:** Upon initial dashboard load (or successful login), all four arrays (`user`, `transactions`, `categories`, `budgets`) must be loaded from `localStorage`.
*   **Data Consistency:** When an action occurs (e.g., adding a transaction on `transactions.html`), the corresponding array in `localStorage` must be updated immediately. Related pages (Dashboard, Budgets) must then refresh their views based on the new `localStorage` data to maintain the SPA-like feel.
*   **Category Management:** For V1, the `finora_categories` array will be pre-populated with standard data (e.g., Rent, Salary, Groceries, Entertainment). User addition/deletion of categories is out of scope, ensuring budget calculations remain stable against the initial set.

## User Flow
# USER FLOW DOCUMENTATION: Finora Personal Finance Manager (Frontend)

## 1. Overview & Goal

This document details the intended user journeys, interaction patterns, and state management flows for the Finora Personal Finance Manager frontend application. The flows are designed to support a fully interactive, single-page-like experience achieved through dynamic DOM manipulation and simulated state management using `localStorage`.

## 2. Core Navigation Flow

The application supports two primary navigation paths: Unauthenticated (Landing/Auth) and Authenticated (Dashboard and Internal Pages).

### 2.1. Unauthenticated Flow

| Step | Page | Trigger/Action | Destination | State Change/Notes |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Landing Page (`index.html`) | User visits site | Landing Page | Initial state. No data in `localStorage`. |
| 2 | Landing Page | Clicks "Login" CTA | `pages/auth/login.html` | `router.js` handles navigation. |
| 3 | Landing Page | Clicks "Sign Up" CTA | `pages/auth/signup.html` | `router.js` handles navigation. |
| 4 | Login Page | Successful submission (Dummy Auth) | `pages/dashboard/dashboard.html` | `auth.js` sets `localStorage.isLoggedIn = true` and user data. |
| 5 | Signup Page | Successful submission (Dummy Auth) | `pages/auth/login.html` (or Dashboard if bypassing login) | `auth.js` saves user data to `localStorage`. |

### 2.2. Authenticated Flow (Post-Login)

Once logged in, the user interacts primarily through the persistent Sidebar navigation.

| Step | Page | Trigger/Action | Destination | State Change/Notes |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Any Authenticated Page | Clicks Dashboard in Sidebar | `pages/dashboard/dashboard.html` | `loadPartials.js` ensures sidebar/navbar are present. |
| 2 | Any Authenticated Page | Clicks Transactions in Sidebar | `pages/transactions/transactions.html` | Data is read from `localStorage.transactions`. |
| 3 | Dashboard/Transactions | User clicks "Logout" in Navbar | `index.html` | `auth.js` clears `localStorage` (user, tokens, data flags). |

---

## 3. Detailed Page Flows & Interactivity

### 3.1. Login/Signup Interaction Flow

**Goal:** Simulate immediate feedback and successful session creation.

1.  **Input Validation (Client-Side):** `auth.js` intercepts the form submit.
    *   Checks for empty fields (User-friendly error: "Email and Password are required.").
    *   Basic email format check (e.g., presence of '@' and '.').
    *   Basic password length check (> 6 characters).
2.  **Dummy Auth Success (Login):** If validation passes, `auth.js`:
    *   Simulates successful check against dummy credentials (optional, for realism).
    *   Sets `localStorage.isLoggedIn = "true"`.
    *   Sets `localStorage.user = JSON.stringify({name: "Finora User", email: "user@example.com"})`.
    *   Redirects to `/dashboard.html`.
3.  **Dummy Auth Success (Signup):** If validation passes, `auth.js`:
    *   Sets initial dummy data structures in `localStorage` if they don't exist (Transactions, Budgets, Categories).
    *   Sets `localStorage.isLoggedIn = "true"`.
    *   Redirects to `/dashboard.html`.
4.  **Error Display:** Invalid states cause inline error messages to appear near the relevant input field, styled via `auth.css`. No page reload occurs.

### 3.2. Dashboard Flow (`dashboard.html`)

**Goal:** Display critical aggregated financial health indicators immediately upon login.

1.  **Initialization:** `dashboard.js` runs on page load.
    *   Checks `localStorage.isLoggedIn`. If false, redirects to `/login.html`.
2.  **Data Aggregation:** `dashboard.js` calls helper functions to process data:
    *   **Summary Cards:** Calculates total Income, total Expense, and Net Balance from `localStorage.transactions` for all time (or current month, based on feature priority).
    *   **Budget Status:** Pulls current month's budgets from `localStorage.budgets` and calculates spent vs. remaining using filtered transactions.
    *   **Recent Transactions:** Takes the latest 5 entries from `localStorage.transactions`.
3.  **DOM Rendering:** Updates the summary cards, budget preview section, and recent transaction table using DOM manipulation.
4.  **Navigation Links:** Updates links/buttons to point correctly to the detailed pages:
    *   "View All Transactions" → `/transactions.html`
    *   "Manage Budgets" → `/budgets.html`

### 3.3. Transactions Flow (`transactions.html`)

**Goal:** Enable full CRUD operations on transactions, updating global state instantly.

1.  **Initialization:** `transactions.js` runs. Loads and renders all data from `localStorage.transactions` into the main table.
2.  **Add Transaction (Modal Interaction):**
    *   User clicks "Add Transaction," opening the modal.
    *   Input fields map to the transaction schema (Amount, Date, Category, Type, Description, Source, Recurring).
    *   On modal submit:
        *   A new `transactionId` is generated (UUID/Timestamp based).
        *   The new object is added to the array retrieved from `localStorage.transactions`.
        *   `localStorage.transactions` is updated.
        *   **CRITICAL:** The UI updates immediately (new row appears in the table).
        *   The Dashboard and Budgets pages (if active in another tab/session) are conceptually updated via the shared `localStorage` key (though full SPA refresh isn't simulated, the data source is instantly clean).
3.  **Filtering/Sorting:**
    *   User interacts with Category dropdown, Date range picker, or Type toggle.
    *   `transactions.js` reads current filter settings from component state/URL params (simulated).
    *   It filters the full `localStorage.transactions` array *in memory*.
    *   The table DOM is completely redrawn with the filtered subset. No page reload.
4.  **Edit/Delete:**
    *   User clicks Edit/Delete icon in a table row.
    *   Edit triggers the modal pre-filled with existing data. Update overwrites the item in `localStorage.transactions`.
    *   Delete removes the item from `localStorage.transactions`.
    *   In both cases, the table redraws instantly.

### 3.4. Budgets Flow (`budgets.html`)

**Goal:** Visually represent budget consumption and highlight overspending based on current transactions.

1.  **Initialization:** `budgets.js` loads data.
    *   Loads static budgets from `localStorage.budgets`.
    *   Loads *all* transactions from `localStorage.transactions`.
2.  **Calculation Loop (Monthly Focus):**
    *   For each budget defined in `localStorage.budgets` for the current month:
        *   Filters transactions to only include those matching the budget's category *and* the current month/year.
        *   Sums the amounts to get `amountSpent`.
        *   Calculates `amountRemaining` (`budgetLimit - amountSpent`).
3.  **DOM Rendering:**
    *   Renders category budget cards showing `Limit`, `Spent`, and `Remaining`.
    *   Renders a progress bar. Bar color dynamically changes based on utilization: Green (safe), Yellow (75-99%), Red (100%+).
    *   If a budget is exceeded, a clear warning icon/text is displayed next to the progress bar.
4.  **Budget Editing:** Editing a budget via the modal updates `localStorage.budgets` and triggers an immediate recalculation and UI refresh.

### 3.5. Reports Flow (`reports.html`)

**Goal:** Provide simulated analytical views based on filtered transaction data.

1.  **Initialization:** `reports.js` loads the required dataset (50+ transactions recommended).
2.  **Filter Interaction (Time Period):** The Monthly/Yearly toggle updates the internal state defining the scope of data aggregation.
3.  **Data Aggregation (Placeholder Logic):**
    *   **Category Spending:** Groups transactions by category, sums amounts, and generates a simulated dataset structure ready for a chart library (e.g., `{labels: [...], data: [...]}`).
    *   **Income vs. Expense Trend:** Creates monthly aggregates to show a trend line (placeholder visualization).
    *   **Monthly Summary:** Calculates total Income, Expense, and Net Savings for the selected period.
4.  **DOM Update:** The section labels and placeholder chart areas are updated to reflect the aggregated numbers, demonstrating responsiveness to filter changes without requiring a real charting library implementation in v1.

---

## 4. State Synchronization Strategy

All persistent state changes that affect multiple pages (`transactions`, `dashboard`, `budgets`) are synchronized exclusively via `localStorage`.

| Data Key | Purpose | Initial State Source | Affected Pages |
| :--- | :--- | :--- | :--- |
| `isLoggedIn` | Session flag | `auth.js` | All Auth/Protected pages |
| `user` | User metadata | `auth.js` | Navbar display |
| `transactions` | Core ledger data | `config.js` (Dummy Data) | Dashboard, Transactions, Budgets, Reports |
| `budgets` | Monthly spending limits | `config.js` (Dummy Data) | Dashboard, Budgets |
| `categories` | Reference list for filtering | `config.js` (Configured list) | Transactions, Budgets |

**Interaction Example:** When a user adds a transaction on the **Transactions Page**, `transactions.js` updates `localStorage.transactions`. When the **Dashboard Page** loads, it checks this same key, ensuring the summary cards reflect the new total immediately (upon page load/navigation).

## Styling Guidelines
# Finora Styling Guidelines Document

## 1. Overview and Design Aesthetic

Finora utilizes a **Modern Fintech Dark Theme** designed for clarity, trust, and professional minimalism. The aesthetic is inspired by industry leaders, prioritizing high contrast, clean data presentation, and intuitive navigation. The goal is to create a calm, product-focused interface suitable for daily financial management.

**Key Principles:**

*   **Clarity over Flash:** Prioritize readability and data comprehension. Avoid heavy gradients, neon colors, or unnecessary visual flair.
*   **High Contrast:** Essential for usability in a dark theme, ensuring text and primary data elements stand out clearly.
*   **Restrained Palette:** A limited set of colors is used, with a single, trustworthy primary accent color to guide user focus.
*   **Consistent Spacing:** Strict adherence to a defined spacing scale ensures visual rhythm across all components and pages.

---

## 2. Color Palette

The palette is built around a deep, neutral background, high-contrast text, and distinct semantic colors for financial indicators.

| Variable Name | Hex Code | Usage | Notes |
| :--- | :--- | :--- | :--- |
| **Primary Accent (Brand/Action)** | `#007AFF` | Primary buttons, active states, chart highlights, positive feedback. | A reliable, accessible blue. |
| **Background / Surface Dark** | `#121212` | Main application background. | Deep black/dark gray for reduced eye strain. |
| **Surface Elevated** | `#1C1C1E` | Cards, modals, sidebar, navbar backgrounds. | Slightly lighter than the main background for subtle layering. |
| **Text Primary** | `#FFFFFF` | Main headers, body text, critical data points. | Pure white for maximum contrast. |
| **Text Secondary** | `#A0A0A0` | Helper text, labels, timestamps, inactive states. | Light gray for secondary information. |
| **Semantic Success (Income)** | `#34C759` | Income indicators, positive balance changes. | Standard green for positive financial movement. |
| **Semantic Warning (Expense)** | `#FF9500` | Budget warnings, high expense indicators. | A warm orange for caution. |
| **Semantic Danger (Overspent)** | `#FF3B30` | Budget critical alerts, negative balance indicators. | Standard red for critical alerts. |

---

## 3. Typography

We use a highly readable, modern sans-serif typeface across the application.

**Font Family:** *Inter* (or a suitable system fallback like Arial/Helvetica, pending final implementation choice).

| Element | Font Size (px) | Weight | Usage Context |
| :--- | :--- | :--- | :--- |
| **H1 (Page Titles)** | 28px | Bold (700) | Dashboard, Transactions Main Header. |
| **H2 (Section Headers)** | 20px | Semi-Bold (600) | Card titles, Sidebar menu items. |
| **Body Large** | 16px | Regular (400) | Primary text content, summary statistics. |
| **Body Regular** | 14px | Regular (400) | Table rows, form input text. |
| **Caption / Helper** | 12px | Regular (400) | Timestamps, metadata, small labels. |

**Text Styling Notes:**
*   All text should use the defined color palette (Primary or Secondary).
*   Text alignment in tables should typically be left-aligned for descriptions and right-aligned for monetary values.

---

## 4. Spacing and Layout

A standardized spacing system based on an 8px baseline is mandatory to ensure visual consistency across all components and between elements (`layout.css`).

| Spacing Variable | Value (px) | Usage |
| :--- | :--- | :--- |
| `--space-xs` | 4px | Miniature padding, input borders. |
| `--space-sm` | 8px | Standard card padding, button vertical padding. |
| `--space-md` | 16px | Section margins, container padding, form group spacing. |
| `--space-lg` | 24px | Major section separation. |
| `--space-xl` | 32px | Large content block spacing. |

**Layout Structure:**

*   **Sidebar/Navbar:** Fixed width/height, using `--surface-elevated`.
*   **Main Content Area:** Uses CSS Grid or Flexbox for structure. Padding around all primary content containers should align with `--space-md`.
*   **Component Padding:** Cards, modals, and content blocks must maintain internal padding of `--space-sm` to separate content from borders.

---

## 5. Reusable UI Components Styling (`components.css`)

All styling for interactive elements must reside here, ensuring reusability across pages.

### 5.1 Buttons

Buttons must clearly communicate action, state, and hierarchy.

| Type | Background Color | Text Color | Hover State | Focus State |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--primary-accent` | `#FFFFFF` | Opacity reduced to 90% | Subtle focus ring using `--primary-accent` |
| **Secondary** | `--surface-elevated` | `--text-primary` | Border color darkens slightly | Subtle focus ring using `--text-secondary` |
| **Danger** | `--semantic-danger` | `#FFFFFF` | Opacity reduced to 90% | Subtle focus ring using `--semantic-danger` |

**Sizing:** All primary buttons should have a minimum height of 40px and horizontal padding corresponding to `--space-md`.

### 5.2 Cards and Containers

Used for grouping related information (e.g., Summary Cards, Budget Previews).

*   **Background:** `--surface-elevated`
*   **Border Radius:** 8px (Subtle rounding)
*   **Shadows:** Minimal or no shadow. A subtle border separation (1px light gray) is preferred over heavy box-shadows to maintain the minimalist look.
*   **Content Padding:** `--space-sm` on all sides.

### 5.3 Forms and Inputs

Inputs should be clear and distinctly defined, especially in the dark theme.

*   **Text Fields:**
    *   Background: Darker than surface (`#0A0A0A` or use transparent background if using outlines).
    *   Border: 1px solid `--text-secondary` when inactive.
    *   Focus: Border shifts to `--primary-accent`.
    *   Text Color: `--text-primary`.
*   **Error States (Inline):** Text color shifts to `--semantic-danger`, and the input border turns red.

### 5.4 Modals

Modals must overlay the content clearly, indicating a temporary, focused task.

*   **Overlay/Backdrop:** A semi-transparent black layer (e.g., `rgba(0, 0, 0, 0.7)`).
*   **Modal Content Box:** `--surface-elevated`, centered, with a minimum width that scales responsively. Border radius of 12px.

---

## 6. Semantic Visualizations (Charts & Progress Bars)

Visualizations must rely on the semantic color palette.

### 6.1 Progress Bars (Budgets)

Used extensively on the Budgets page to show spending vs. limit.

*   **Track (Background):** `--surface-elevated` or a slightly darker shade.
*   **Fill (Progress):**
    *   If usage is under 80%: Use `--primary-accent`.
    *   If usage is 80% to 99%: Use `--semantic-warning`.
    *   If usage is 100% or more: Use `--semantic-danger`.

### 6.2 Chart Placeholders

Chart placeholders (Reports and Dashboard) should use the brand colors to represent data categories (e.g., Income in Green, Expenses in Warning Orange). These are conceptual placeholders; actual chart libraries will adhere to this palette upon integration.

---

## 7. Naming Conventions (CSS and JS)

**CSS BEM Methodology (Block__Element--Modifier):** Used for reusable components (buttons, cards) for clarity and scalability.

**Utility Classes:** Standardized utility classes will be used sparingly, primarily for margin/padding shortcuts if necessary (e.g., `m-r-md`, though using CSS variables is preferred).

**JavaScript Variables & State:**
*   Follow standard JavaScript conventions (camelCase).
*   LocalStorage keys must be descriptive and pluralized (e.g., `userProfile`, `transactions`).
*   API endpoint placeholders in JS comments must clearly reference the assumed REST structure (`// TODO: POST /api/v1/transactions`).
