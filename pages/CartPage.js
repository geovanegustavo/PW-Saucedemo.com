// CartPage.js

const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        // Initialize login page elements
        this.page = page;

        // Botões principais
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

        // Lista de itens do carrinho
        this.cartItems = page.locator('.cart_item');

        // Elementos dentro de cada item
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('.cart_button');

        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');

    }

    // ── Actions ────────────────────────────────────────────────────────────────

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkoutProducts() {
        await this.checkoutButton.click();
    }

    async removeProductByIndex(index) {
        // Quantos produtos existem dentro do carrinho?
        const count = await this.cartItems.count();

        if (index >= count) {
            throw new Error(`Índice ${index} inválido. Total de itens: ${count}`);
        }

        // Seleciona o produto
        const item = this.cartItems.nth(index);

        // Pega o nome do produto
        const productName = await item.locator('.inventory_item_name').textContent();

        // Clica no botão Remover com base no produto selecionado (item)
        await item.locator('button').click();

        // Retorna o nome do produto
        return productName?.trim(); // ? - Se existir, use. Senão, evita dar crash
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    async getCartItemCount() {
        const countText = await this.shoppingCartBadge.textContent();
        return countText ? parseInt(countText) : 0;
    }

}

module.exports = { CartPage };