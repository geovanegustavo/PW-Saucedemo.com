// tests/login.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Login Tests', () => {

    test('Successful Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        await inventoryPage.logout();

    });

    test('Failed Login with Invalid Credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('invalid_user', 'invalid_password');

        // Verificar se o login falhou exibindo a mensagem de erro
        await expect(loginPage.errorMessage).toBeVisible();
    });

});