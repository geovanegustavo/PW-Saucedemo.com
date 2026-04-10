// InventoryPage.js

class InventoryPage {

    constructor(page) {
        // Initialize login page elements
        this.page = page;

        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    // Method to logout
    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    // ── Verifications ──────────────────────────────────────────────────────────

}

module.exports = { InventoryPage };