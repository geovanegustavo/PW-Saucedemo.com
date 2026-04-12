# language: pt
Funcionalidade: Carrinho de compras
  Como usuário autenticado
  Quero gerenciar meu carrinho
  Para controlar os produtos antes da compra

  Cenário: Voltar para o inventário
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu adiciono os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho
    Então o carrinho deve conter 2 itens
    Quando eu visito o carrinho
    Então devo ser redirecionado para a página de carrinho
    Quando eu clico em continuar comprando
    Então devo ser redirecionado para a página de inventário

  Cenário: Remoção de produto do carrinho
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu adiciono os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho
    Então o carrinho deve conter 2 itens
    Quando eu visito o carrinho
    Então devo ser redirecionado para a página de carrinho
    Quando eu removo um produto do carrinho
    Então o carrinho deve conter 1 item

  Cenário: Visita checkout de produtos
    Dado que estou na página de login
    Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
    Então devo ser redirecionado para a página de inventário
    Quando eu adiciono os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho
    Então o carrinho deve conter 2 itens
    Quando eu visito o carrinho
    Então devo ser redirecionado para a página de carrinho
    Quando eu clico em checkout
    Então devo ser redirecionado para a página de checkout etapa 1
