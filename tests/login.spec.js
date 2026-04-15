// tests/login.spec.js

require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Login no sistema', () => {

    let loginPage;
    let inventoryPage;

    // Executa uma vez antes de todos os testes
    test.beforeAll(async () => {
        console.log('Iniciando testes...');
    });

    // Executa antes de cada teste
    test.beforeEach(async ({ page }) => {
        console.log('Acessando página de login...');
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateToUrl(process.env.SF_URL);
    });

    // Executa depois de cada teste
    test.afterEach(async () => {
        console.log('Teste finalizado!');
    });

    test('Login/Logout com sucesso', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        //await inventoryPage.logout();
        await test.step('Realizar logout', async () => {
            await inventoryPage.logout();
        });

    });

    test('Falha com credenciais inválidas', async () => {

        await test.step('Tentar login com usuário e senha incorretos', async () => {

            await loginPage.login('invalid_user', 'invalid_password');

            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(
                'Epic sadface: Username and password do not match any user in this service'
            );

        });

        await test.step('Fechar mensagem de erro', async () => {
            await loginPage.closeErrorMessage();
            await expect(loginPage.errorMessage).not.toBeVisible();
        });

    });

    test('Falha com campos vazios', async () => {

        await test.step('Tentar login com campos vazios', async () => {

            await loginPage.login('', '');

            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(
                'Epic sadface: Username is required'
            );

        });

        await test.step('Fechar mensagem de erro', async () => {
            await loginPage.closeErrorMessage();
            await expect(loginPage.errorMessage).not.toBeVisible();
        });
    
    });

    // Teste de falha com login vazio
    test('Falha com login vazio', async () => {

        await test.step('Tentar login sem usuário', async () => {

            await loginPage.login('', process.env.SF_PASSWORD);

            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(
                'Epic sadface: Username is required'
            );

        });

        await test.step('Fechar mensagem de erro', async () => {
            await loginPage.closeErrorMessage();
            await expect(loginPage.errorMessage).not.toBeVisible();
        });

    });

    // Teste de falha com senha vazia
    test('Falha com senha vazia', async () => {

        await test.step('Tentar login sem senha', async () => {

            await loginPage.login(process.env.SF_USERNAME, '');

            await expect(loginPage.errorMessage).toBeVisible();
            await expect(loginPage.errorMessage).toHaveText(
                'Epic sadface: Password is required'
            );

        });

        await test.step('Fechar mensagem de erro', async () => {
            await loginPage.closeErrorMessage();
            await expect(loginPage.errorMessage).not.toBeVisible();
        });
        
    });

});