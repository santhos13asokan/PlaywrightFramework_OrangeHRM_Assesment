# OrangeHRM Playwright Test Suite

This repository contains the automated E2E test suite for the OrangeHRM web application. It is built using Playwright with TypeScript and follows the Page Object Model (POM) design pattern to keep tests clean, maintainable, and easy to extend.

---

## Framework Highlights

* **Page Object Model:** Locators and page interactions are modularized inside `pages/`.
* **Custom Fixtures:** Page objects (`poManager`) and utilities (`uiUtil`, `waitsUtil`) are injected into tests automatically.
* **Scoped Locators:** Uses scoped filtering and role-based locators to handle duplicate UI elements (like multiple Save buttons) without strict mode violations.
* **Dynamic Handling:** Handles dynamic employee creation and unique ID generation.
---

## Project Structure

```text
├── fixtures/
│   └── custom.fixture.ts   # Custom Playwright fixture definitions
├── pages/
│   ├── base.page.ts        # Shared page actions wrapper
│   ├── login.page.ts       # Login Page Object
│   ├── pim.page.ts         # PIM Module & Employee Management Object
│   └── po.manager.ts       # Central Page Object Manager
├── testdata/
│   └── test.json           # Credentials and test environment data
├── tests/
│   ├── login.spec.ts       # Login module scenarios
│   └── pim.spec.ts         # Employee search, edit, and delete scenarios
├── utils/
│   ├── ui.utils.ts         # Action wrappers, assertions, and ID generator
│   └── waits.utils.ts      # Custom wait strategies
├── playwright.config.ts    # Playwright runner configuration
└── package.json            # Dependencies and terminal script shortcuts

Prerequisites
Ensure you have Node.js (v18 or higher) installed.

1. Clone & Install Dependencies

git clone <your-repository-url>
cd <project-folder>
npm install

