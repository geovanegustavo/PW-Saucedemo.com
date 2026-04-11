// tests/checkout.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Testes do Checkout', () => {

    test('Informações não preenchidas', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.navigateToUrl();

        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        // Adicionar um produto ao carrinho
        const productName1 = 'Sauce Labs Backpack';
        await inventoryPage.addProductToCart(productName1);

        // Adicionar um produto ao carrinho
        const productName2 = 'Sauce Labs Bike Light';
        await inventoryPage.addProductToCart(productName2);

        const inventoryCartItemCount = await inventoryPage.getCartItemCount();
        expect(inventoryCartItemCount).toBe(2);

        await inventoryPage.visitCart();

        await expect(page).toHaveURL(/.*cart.html/);

        await cartPage.checkoutProducts();

        await expect(page).toHaveURL(/.*checkout-step-one.html/);

        await checkoutPage.clickContinueButtonAction();

    });

});