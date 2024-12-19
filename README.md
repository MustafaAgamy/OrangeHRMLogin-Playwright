### Description
This repository automates the login functionality of the OrangeHRM demo website using APIs and Playwright with TypeScript. It demonstrates a robust, scalable, and easy-to-maintain testing solution.

---

### Features
- API-based authentication for login automation.
- Leverages Playwright’s capabilities for testing.
- Written in TypeScript for modern, type-safe development.
- Modular and reusable code structure.

---

### Prerequisites
1. **Node.js** (version 16 or later).
2. **Playwright** installed globally or locally.

---

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure Playwright is set up:
   ```bash
   npx playwright install
   ```

---

### Project Structure
- **src/**: Contains the source code.
  - **api/**: API utilities and helper functions.
  - **tests/**: Test cases for login and validation.
- **playwright.config.ts**: Playwright configuration.

---

### How to Run
1. Run API authentication and login tests:
   ```bash
   npx playwright test
   ```
2. Generate a test report:
   ```bash
   npx playwright show-report
   ```

---

### Customization
- Modify test cases in the `src/tests` folder as per requirements.

---

### Contact
For questions or support, contact [mostafaagamy1995@gmail.com].
