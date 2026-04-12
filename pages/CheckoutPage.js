// CheckoutPage.js

class CheckoutPage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        // Initialize login page elements
        this.page = page;

        this.firstName = page.locator('first-name');
        this.lastName = page.locator('last-name');
        this.postalCode = page.locator('postal-code');
        this.cancelButton = page.locator('cancel');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    async getErrorMessageText() {
        return this.errorMessage.textContent();
    }

}

module.exports = { CheckoutPage };