// tests/inventory.spec.js

require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Testes de Inventário', () => {

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

    test('Ordenação de produtos A-Z', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);

        await test.step('Ordenação de produtos por nome (A-Z)', async () => {
            await inventoryPage.sortProductsBy('za'); // Desfazer a ordenação padrão da página ('az')
            await inventoryPage.sortProductsBy('az');
        });

        await test.step('Criação das listas de produtos', async () => {
            // Recebe a lista de produtos do container e ordena alfabeticamente de A-Z
            const productNamesAZ = await inventoryPage.productsNames.allTextContents();
            const sortedNamesAZ = [...productNamesAZ].sort();

            expect(productNamesAZ).toEqual(sortedNamesAZ);
        });        

    });

    test('Ordenação de produtos Z-A', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);

        test.step('Ordenação de produtos por nome (Z-A)', async () => {
            await inventoryPage.sortProductsBy('za');

            test.step('Criação das listas de produtos por preço de 9-0', async () => {
                const productNamesZA = await inventoryPage.productsNames.allTextContents();
                const sortedNamesZA = [...productNamesZA].sort().reverse();

                expect(productNamesZA).toEqual(sortedNamesZA);
                console.log('Lista invertida:', sortedNamesZA);
            });
            
        });        

    });

    test('Ordenação de produtos LO-HI', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);

        test.step('Ordenação de produtos por nome (Low-Hight)', async () => {
            await inventoryPage.sortProductsBy('lohi');

            test.step('Criação das listas de produtos por preço de 0-9', async () => {
                const productPricesLoHi = await inventoryPage.productsPrices.allTextContents();
                const sortedPricesLoHi = [...productPricesLoHi].sort(
                    (a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''))
                );
                
                expect(productPricesLoHi).toEqual(sortedPricesLoHi);    
            });

        });               

    });

    test('Ordenação de produtos HI-LO', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);

        test.step('Ordenação de produtos por nome (Hight-Low)', async () => {
            await inventoryPage.sortProductsBy('hilo');

            test.step('Criação das listas de produtos por preço de 9-0', async () => {
                // Recebe a lista de produtos por preço do container e ordena alfabeticamente de 9-0
                const productPricesHiLo = await inventoryPage.productsPrices.allTextContents();
                const sortedPricesHiLo = [...productPricesHiLo].sort(
                    (a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''))
                );

                expect(productPricesHiLo).toEqual(sortedPricesHiLo);
            });

        });               

    });

    test('Adicionar e remover produto do carrinho', async ({ page }) => {

        await loginPage.login(process.env.SF_USERNAME, process.env.SF_PASSWORD);
        await expect(page).toHaveURL(/.*inventory.html/);

        test.step('Inclusão/exclusão de produto ao carrinho', async () => {

            const productName = 'Sauce Labs Backpack';
            await inventoryPage.addProductToCart(productName);
            await inventoryPage.expectProductButtonText(productName, 'Remove');

            const cartItemCount = await inventoryPage.getCartItemCount();
            expect(cartItemCount).toBe(1);
                
            await inventoryPage.removeProductFromCart(productName);
            expect(inventoryPage.expectProductButtonText(productName, 'Add to cart'));            

        });

    });

});