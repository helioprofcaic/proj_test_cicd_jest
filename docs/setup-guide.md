# Guia de Configuração do Ambiente

Este guia detalha os passos necessários para configurar o ambiente de desenvolvimento e executar o projeto localmente.

## ⚙️ 1. Pré-requisitos

*   **Node.js**: Versão 18.x ou superior.
*   **npm**: Geralmente vem instalado com o Node.js.

## 📦 2. Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd proj_test_cicd_jest
    ```

2.  **Instale as dependências:**
    O comando a seguir irá instalar todas as dependências listadas no `package.json`.
    ```bash
    npm install
    ```

### Dependências do Projeto

*   **`express`**: Framework web para criar a API e o servidor.

### Dependências de Desenvolvimento

*   **`jest`**: Framework de testes para executar testes unitários e de integração.
*   **`supertest`**: Biblioteca para testar endpoints de API, facilitando requisições HTTP nos testes.
*   **`cypress`**: Ferramenta para testes End-to-End que rodam em um navegador real.
*   **`axios`**: Cliente HTTP usado nos exemplos de serviço (e mockado nos testes).

## 📜 3. Scripts Disponíveis

Você pode executar os seguintes scripts a partir da raiz do projeto:

*   **`npm test`**
    Executa todos os testes unitários e de integração com o Jest e gera um relatório de cobertura na pasta `coverage/`.

*   **`npm run test:watch`**
    Inicia o Jest em modo de observação, que re-executa automaticamente os testes sempre que um arquivo é alterado. Ideal para desenvolvimento.

*   **`npm run cypress:open`**
    Abre a interface gráfica do Cypress, permitindo selecionar e executar testes E2E interativamente.

*   **`npm run cypress:run`**
    Executa todos os testes do Cypress em modo *headless* (sem interface gráfica), como é feito no ambiente de CI.

## 📊 4. Configuração de Cobertura de Testes

A coleta de cobertura de testes já está configurada no `package.json` através da chave `jest`. Ao rodar `npm test`, um relatório detalhado será gerado no diretório `coverage/`.

```json
"jest": {
  "collectCoverage": true,
  "coverageDirectory": "coverage"
}
```