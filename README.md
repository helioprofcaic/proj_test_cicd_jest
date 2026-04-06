# proj_test_cicd_jest

Um projeto de exemplo para demonstrar testes e integração contínua (CI/CD) com Jest e Cypress.

## 📄 Documentação

Para mais detalhes sobre a arquitetura, tutoriais e outros procedimentos, consulte a pasta [/docs](./docs/).

### Atividade de Avaliação

Para a atividade prática em laboratório, siga o [Guia da Atividade de Avaliação em Grupo](./docs/activity-guide.md).

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Scripts Disponíveis

### `npm test`

Executa os testes unitários e de integração com o Jest e gera um relatório de cobertura.

### `npm run test:watch`

Executa os testes com o Jest em modo de observação, re-executando os testes a cada alteração de arquivo.

### `npm run cypress:open`

Abre o painel de controle do Cypress para execução de testes de ponta a ponta (E2E) interativamente.

### `npm run cypress:run`

Executa os testes de ponta a ponta (E2E) com o Cypress em modo headless, ideal para ambientes de CI.