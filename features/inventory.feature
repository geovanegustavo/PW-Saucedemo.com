# language: pt
Funcionalidade: Inventário de produtos
  Como usuário autenticado
  Quero ordenar e gerenciar produtos
  Para facilitar a navegação e compra

  Cenário: Ordenação de produtos A-Z
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu ordeno os produtos de A-Z
    Então os produtos devem aparecer em ordem alfabética crescente

  Cenário: Ordenação de produtos Z-A
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu ordeno os produtos de Z-A
    Então os produtos devem aparecer em ordem alfabética decrescente

  Cenário: Ordenação de produtos LO-HI
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu ordeno os produtos por preço do menor para o maior
    Então os produtos devem aparecer em ordem crescente de preço

  Cenário: Ordenação de produtos HI-LO
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu ordeno os produtos por preço do maior para o menor
    Então os produtos devem aparecer em ordem decrescente de preço

  Cenário: Adicionar e remover produto do carrinho
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu adiciono o produto "Sauce Labs Backpack" ao carrinho
    Então o botão do produto deve mostrar "Remove"
    E o carrinho deve conter 1 item
    Quando eu removo o produto "Sauce Labs Backpack" do carrinho
    Então o botão do produto deve mostrar "Add to cart"
    E o carrinho deve estar vazio
