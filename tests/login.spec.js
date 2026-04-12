// tests/login.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Login no sistema', () => {

    test('Login/Logout com sucesso', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        await inventoryPage.logout();

    });

    test('Falha com credenciais inválidas', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('invalid_user', 'invalid_password');

        // Verificar se o login falhou exibindo a mensagem de erro
        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );

        await loginPage.closeErrorMessage();

        await expect(loginPage.errorMessage).not.toBeVisible();

    });

    test('Falha com campos vazios', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('', '');

        // Verificar se o login falhou exibindo a mensagem de erro
        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );

        await loginPage.closeErrorMessage();

        await expect(loginPage.errorMessage).not.toBeVisible();

    });

    test('Falha com login vazio', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('', 'secret_sauce');

        // Verificar se o login falhou exibindo a mensagem de erro
        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );

        await loginPage.closeErrorMessage();

        await expect(loginPage.errorMessage).not.toBeVisible();

    });

    test('Falha com senha vazia', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', '');

        // Verificar se o login falhou exibindo a mensagem de erro
        await expect(loginPage.errorMessage).toBeVisible();

        await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Password is required'
        );

        await loginPage.closeErrorMessage();

        await expect(loginPage.errorMessage).not.toBeVisible();

    });

});