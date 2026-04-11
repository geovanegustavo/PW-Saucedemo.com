// tests/inventory.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Testes de Inventário', () => {

    test('Ordenação de produtos A-Z', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        // Testar ordenação de produtos por nome (A-Z)
        await inventoryPage.sortProductsBy('za');
        await inventoryPage.sortProductsBy('az');
        const productNamesAZ = await inventoryPage.productsNames.allTextContents(); // retorna um array com os nomes dos produtos
        
        // Aqui o teste cria uma cópia do array productNamesAZ e aplica o método .sort(), que ordena os nomes em ordem alfabética.
        const sortedNamesAZ = [...productNamesAZ].sort();
        // Compara o array original (productNamesAZ) com o array ordenado (sortedNamesAZ) usando expect().toEqual().
        expect(productNamesAZ).toEqual(sortedNamesAZ);

    });

    test('Ordenação de produtos Z-A', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        // Testar ordenação de produtos por nome (A-Z)
        await inventoryPage.sortProductsBy('za');
        const productNamesZA = await inventoryPage.productsNames.allTextContents(); // retorna um array com os nomes dos produtos
        
        // Aqui o teste cria uma cópia do array productNamesAZ e aplica o método .sort(), que ordena os nomes em ordem alfabética.
        const sortedNamesZA = [...productNamesZA].sort().reverse();
        // Compara o array original (productNamesZA) com o array ordenado (sortedNamesZA) usando expect().toEqual().
        expect(productNamesZA).toEqual(sortedNamesZA);

    });

    test('Ordenação de produtos LO-HI', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        // Testar ordenação de produtos por nome (A-Z)
        await inventoryPage.sortProductsBy('lohi');

        // retorna um array com os preços dos produtos
        const productPricesLoHi = await inventoryPage.productsPrices.allTextContents();
        
        // cria uma cópia do array productNamesLoHi e aplica o método .sort(), que ordena os preços em ordem alfabética.
        const sortedPricesLoHi = [...productPricesLoHi].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));

        // Compara o array original (productPricesLoHi) com o array ordenado (sortedPricesLoHi) usando expect().toEqual().
        expect(productPricesLoHi).toEqual(sortedPricesLoHi);

    });

    test('Ordenação de produtos HI-LO', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.navigateToUrl();
        await loginPage.login('standard_user', 'secret_sauce');

        // Verificar se o login foi bem-sucedido redirecionando para a página de inventário
        await expect(page).toHaveURL(/.*inventory.html/);

        // Testar ordenação de produtos por nome (A-Z)
        await inventoryPage.sortProductsBy('hilo');

        // retorna um array com os preços dos produtos
        const productPricesHiLo = await inventoryPage.productsPrices.allTextContents();
        
        // cria uma cópia do array productNamesHiLo e aplica o método .sort(), que ordena os preços em ordem alfabética.
        const sortedPricesHiLo = [...productPricesHiLo].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));

        // Compara o array original (productPricesHiLo) com o array ordenado (sortedPricesHiLo) usando expect().toEqual().
        expect(productPricesHiLo).toEqual(sortedPricesHiLo);

    });

});