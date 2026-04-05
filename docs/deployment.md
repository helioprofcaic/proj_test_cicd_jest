# Tutorial de Deploy e Integração Contínua (CI/CD)

Este documento descreve nosso pipeline de Integração Contínua (CI) configurado com o GitHub Actions. O objetivo é automatizar a execução de testes para garantir a qualidade e a estabilidade do código a cada nova alteração.

## 🔄 1. Visão Geral do Pipeline de CI

O pipeline é definido no arquivo `.github/workflows/ci.yml`. Ele é acionado automaticamente em duas situações:

1.  Quando um `push` é feito para as branches `main` ou `master`.
2.  Quando um `pull request` é aberto (ou atualizado) para as branches `main` ou `master`.

O pipeline consiste em dois jobs principais que rodam de forma sequencial.

## 🧪 Job 1: `jest-tests` (Testes Unitários e de Integração)

Este job é responsável por validar a lógica principal da aplicação.

*   **Estratégia de Matriz**: Ele é executado em múltiplas versões do Node.js (`18.x` e `20.x`) para garantir a compatibilidade.
*   **Passos**:
    1.  **Checkout**: Baixa o código do repositório.
    2.  **Setup Node.js**: Configura a versão do Node.js especificada na matriz.
    3.  **Install dependencies**: Executa `npm install` para baixar todas as dependências.
    4.  **Run Jest tests**: Executa o comando `npm test`, rodando todos os testes unitários e de integração.

**Este job precisa passar para que o próximo possa começar.**

## 🌐 Job 2: `cypress-run` (Testes End-to-End)

Este job simula a interação de um usuário real com a aplicação e só é executado se o job `jest-tests` for bem-sucedido (`needs: jest-tests`).

*   **Passos**:
    1.  **Checkout, Setup Node.js, Install dependencies**: Passos similares ao job anterior para preparar o ambiente.
    2.  **Run Cypress tests**: Utiliza a action oficial `cypress-io/github-action@v6` para orquestrar a execução dos testes E2E.
        *   `start: npm start`: Inicia o servidor da aplicação em background. (Requer um script `start` no `package.json`).
        *   `wait-on: 'http://localhost:3000'`: Aguarda a aplicação ficar pronta para receber requisições antes de iniciar os testes.
        *   `command: npm run cypress:run`: Executa os testes do Cypress em modo *headless*.

### Artefatos de Teste em Caso de Falha

Para facilitar a depuração, configuramos um passo que faz o upload de artefatos importantes se os testes do Cypress falharem.

*   **`Upload Cypress artifacts on failure`**:
    *   **Condição**: `if: failure()` - Este passo só é executado se o passo anterior (a execução do Cypress) falhar.
    *   **O que é salvo?**:
        *   `cypress/screenshots`: Capturas de tela tiradas automaticamente pelo Cypress no momento da falha.
        *   `cypress/videos`: Gravações em vídeo de toda a execução do teste que falhou.
    *   **Onde encontrar?**: Os artefatos ficam disponíveis para download na página de resumo da execução do workflow no GitHub.

## 🚀 2. Deploy (Próximos Passos)

Atualmente, o pipeline foca na **Integração Contínua (CI)**, garantindo que o código na branch principal seja sempre testado e estável.

O próximo passo para um fluxo de **Deploy Contínuo (CD)** seria adicionar um novo job que, após o sucesso de todos os testes na branch `main`, executaria os comandos para publicar a aplicação em um ambiente de homologação ou produção (ex: Heroku, Vercel, AWS, etc.).