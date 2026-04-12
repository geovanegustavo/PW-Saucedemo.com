# language: pt
Funcionalidade: Login no sistema
    Como usuário do sistema
    Quero realizar login e logout
    Para acessar a página de inventário com segurança

    Cenário: Login/Logout com sucesso
        Dado que estou na página de login
        Quando eu insiro o usuário "standard_user" e a senha "secret_sauce"
        E clico em login
        Então devo ser redirecionado para a página de inventário
        Quando eu realizo logout
        Então devo voltar para a página de login

    Cenário: Falha com credenciais inválidas
        Dado que estou na página de login
        Quando eu insiro o usuário "invalid_user" e a senha "invalid_password"
        E clico em login
        Então devo ver a mensagem de erro "Epic sadface: Username and password do not match any user in this service"
        Quando eu fecho a mensagem de erro
        Então a mensagem de erro não deve estar visível

        Cenário: Falha com campos vazios
        Dado que estou na página de login
        Quando eu insiro usuário "" e senha ""
        E clico em login
        Então devo ver a mensagem de erro "Epic sadface: Username is required"
        Quando eu fecho a mensagem de erro
        Então a mensagem de erro não deve estar visível

        Cenário: Falha com login vazio
        Dado que estou na página de login
        Quando eu insiro usuário "" e senha "secret_sauce"
        E clico em login
        Então devo ver a mensagem de erro "Epic sadface: Username is required"
        Quando eu fecho a mensagem de erro
        Então a mensagem de erro não deve estar visível

        Cenário: Falha com senha vazia
        Dado que estou na página de login
        Quando eu insiro usuário "standard_user" e senha ""
        E clico em login
        Então devo ver a mensagem de erro "Epic sadface: Password is required"
        Quando eu fecho a mensagem de erro
        Então a mensagem de erro não deve estar visível
