// InventoryPage.js

class InventoryPage {

    constructor(page) {
        // Initialize login page elements
        this.page = page;

        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.productsSort = page.locator('[data-test="product-sort-container"]');
        this.productsNames = page.locator('.inventory_item_name');
        this.productsPrices = page.locator('.inventory_item_price');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    // Method to logout
    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async sortProductsBy(option) {
        await this.productsSort.selectOption(option);
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    // ── Verifications ──────────────────────────────────────────────────────────

}

module.exports = { InventoryPage };