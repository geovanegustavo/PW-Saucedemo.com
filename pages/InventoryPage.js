// InventoryPage.js

const { expect } = require('@playwright/test');

class InventoryPage {

    constructor(page) {
        // Initialize login page elements
        this.page = page;

        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
        this.productsSort = page.locator('[data-test="product-sort-container"]');
        this.productsNames = page.locator('.inventory_item_name');
        this.productsPrices = page.locator('.inventory_item_price');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    // Method to logout
    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    // Method to sort products by a given option ('az', 'za', 'lohi', 'hilo')
    async sortProductsBy(option) {
        await this.productsSort.selectOption(option);
    }

    // Method to add a product in the cart
    async addProductToCart(productName) {
        const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
        const addToCartButton = productLocator.locator('button');
        await addToCartButton.click();
    }

    // Method to remove a product from the cart
    async removeProductFromCart(productName) {
        const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
        const removeFromCartButton = productLocator.locator('button');
        await removeFromCartButton.click();
    }

    // 
    async expectProductButtonText(productName, expectedText) {
        const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
        const buttonText = await productLocator.locator('button').textContent();
        expect(buttonText).toBe(expectedText);
    }

    async visitCart() {
        await this.shoppingCartLink.click();
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    async getCartItemCount() {
        const countText = await this.shoppingCartBadge.textContent();
        return countText ? parseInt(countText) : 0;
    }

    // ── Verifications ──────────────────────────────────────────────────────────

}

module.exports = { InventoryPage };