# Mapeamento de cenários Gherkin para testes Playwright

| Cenário Gherkin                   | Teste Playwright (`login.spec.js`)         |
|-----------------------------------|--------------------------------------------|
| Login/Logout com sucesso          | test('Login/Logout com sucesso')           |
| Falha com credenciais inválidas   | test('Falha com credenciais inválidas')    |
| Falha com campos vazios           | test('Falha com campos vazios')            |
| Falha com login vazio             | test('Falha com login vazio')              |
| Falha com senha vazia             | test('Falha com senha vazia')              |