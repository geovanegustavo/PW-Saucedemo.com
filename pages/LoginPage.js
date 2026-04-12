// LoginPage.js

class LoginPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        // Initialize login page elements
        this.page = page;

        // Locators for login page elements
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorCloseButton = page.locator('.error-button');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    // Method to navigate to the login page
    async navigateToUrl(url = process.env.SF_URL) {
        await this.page.goto(url); // baseURL definida no playwright.config.js
    }

    // Method to perform login action
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async closeErrorMessage() {
        await this.errorCloseButton.click();
    }

    // ── Getters ────────────────────────────────────────────────────────────────
    
    async getErrorMessageText() {
        return this.errorMessage.textContent();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    // ── Verifications ──────────────────────────────────────────────────────────

    async isErrorMessageVisible() {
        return this.errorMessage.isVisible();
    }

}

module.exports = { LoginPage };