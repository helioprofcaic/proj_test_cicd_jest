# Guia da Atividade de Avaliação em Grupo

## 🎯 Objetivo

O objetivo desta atividade é aplicar os conceitos de desenvolvimento, testes automatizados e integração contínua (CI) em um ambiente de equipe. Cada grupo irá colaborar para adicionar uma nova funcionalidade a este projeto, seguindo as melhores práticas de engenharia de software.

## ⚙️ Preparação do Ambiente (5 minutos)

1.  **Líder do Grupo**: Um membro do grupo deve fazer um **Fork** deste repositório para sua própria conta do GitHub.
2.  **Adicionar Colaboradores**: O líder deve ir em `Settings > Collaborators` no repositório *forkado* e adicionar os outros membros do grupo.
3.  **Clonar o Projeto**: **Todos** os membros do grupo devem clonar o repositório **forkado** para o seu computador no laboratório.
    ```bash
    # NÃO clone o repositório original, mas sim o fork do seu grupo!
    git clone <URL_DO_FORK_DO_SEU_GRUPO>
    ```
4.  **Instalar Dependências**: Navegue até a pasta do projeto e instale as dependências.
    ```bash
    cd proj_test_cicd_jest
    npm install
    ```

## 🚀 A Tarefa: Criar um Gerador de Citações (60 minutos)

A tarefa do grupo é criar um novo endpoint `/quote` que retorna uma citação aleatória. Vocês devem seguir a pirâmide de testes para validar a nova funcionalidade.

### Passo 1: Criar a Lógica e o Teste Unitário

1.  **Crie o Serviço**: Dentro da pasta `src/services/`, crie um novo arquivo chamado `quoteService.js`. Este serviço terá uma função `getQuote()` que retorna uma cotação de um array pré-definido.

    ```javascript
    // src/services/quoteService.js
    const quotes = [
      "A única maneira de fazer um excelente trabalho é amar o que você faz.",
      "A persistência é o caminho do êxito.",
      "O sucesso é a soma de pequenos esforços repetidos dia após dia."
    ];

    const getQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    module.exports = { getQuote };
    ```

2.  **Crie o Teste Unitário**: Na pasta `tests/unit/`, crie o arquivo `quoteService.test.js`. Teste se a função `getQuote` retorna uma string que está presente no array original de citações.

    ```javascript
    // tests/unit/quoteService.test.js
    const { getQuote } = require('../../src/services/quoteService');

    test('deve retornar uma citação válida', () => {
      const quotes = [
        "A única maneira de fazer um excelente trabalho é amar o que você faz.",
        "A persistência é o caminho do êxito.",
        "O sucesso é a soma de pequenos esforços repetidos dia após dia."
      ];
      const quote = getQuote();
      expect(quotes).toContain(quote);
    });
    ```

3.  **Valide**: Rode `npm test` e garanta que o novo teste passa.

### Passo 2: Criar o Endpoint e o Teste de Integração

1.  **Crie o Endpoint**: Modifique o arquivo `src/app.js` para adicionar a rota `/quote`.

    ```javascript
    // Adicione no final de src/app.js, antes do module.exports
    const { getQuote } = require('./services/quoteService');

    app.get('/quote', (req, res) => {
      res.json({ quote: getQuote() });
    });
    ```

2.  **Crie o Teste de Integração**: Modifique o arquivo `tests/unit/app.test.js` para adicionar um teste para o novo endpoint `/quote`. Verifique se o status da resposta é 200 e se o corpo da resposta contém uma chave `quote`.

    ```javascript
    // Adicione este teste dentro do describe em tests/unit/app.test.js
    it('GET /quote deve retornar uma citação', async () => {
      const response = await request(app).get('/quote');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('quote');
      expect(typeof response.body.quote).toBe('string');
    });
    ```

3.  **Valide**: Rode `npm test` novamente e garanta que todos os testes continuam passando.

### Passo 3: Criar o Pull Request e Validar o CI

1.  **Commit e Push**: Um membro do grupo deve fazer o commit das alterações e enviar para o repositório do grupo.
    ```bash
    git add .
    git commit -m "feat: adiciona gerador de citações com testes"
    git push origin main
    ```
2.  **Crie o Pull Request**: No GitHub, crie um Pull Request da branch `main` do seu fork para a branch `main` do repositório **original** (o do professor).
3.  **Verifique o Pipeline**: Observe na página do Pull Request o pipeline de CI sendo executado. Os jobs `jest-tests` e `cypress-run` devem passar, resultando em um check verde.

## ✅ Entrega e Avaliação

A entrega da atividade é o **Pull Request com o status do pipeline "All checks have passed" (Verde)**. O grupo será avaliado pela colaboração, pela implementação correta da funcionalidade e dos testes, e pelo sucesso do pipeline de CI.