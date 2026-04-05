# Arquitetura do Projeto e Estratégia de Testes

Este documento fornece uma visão geral da arquitetura do projeto, explicando como as diferentes camadas (serviços, controladores, etc.) interagem e como nossa estratégia de testes garante a qualidade do código.

## 🧱 1. Estrutura de Diretórios

A estrutura de pastas foi projetada para separar claramente as responsabilidades:

```
meu-projeto/
│
├── src/                      # Código fonte da aplicação
│   ├── services/             # Lógica de negócio, comunicação com APIs externas
│   ├── controllers/          # Camada de API (rotas e handlers do Express)
│   └── app.js                # Configuração e inicialização do servidor Express
│
├── tests/                    # Testes automatizados com Jest e Supertest
│   ├── unit/                 # Testes unitários para funções e serviços isolados
│   └── integration/          # Testes de integração para os endpoints da API
│
├── cypress/                  # Testes End-to-End
│
├── .github/workflows/ci.yml  # Pipeline de Integração Contínua
│
└── package.json              # Dependências e scripts
```

## 🧠 2. Pirâmide de Testes Aplicada

Adotamos o conceito da Pirâmide de Testes para obter um feedback rápido, confiável e com bom custo-benefício.

*   **Base (Muitos): Testes Unitários com Jest**
    *   **O quê?** Testam a menor parte do código (funções, módulos) de forma isolada.
    *   **Onde?** `tests/unit/`
    *   **Ferramenta:** `Jest`.
    *   **Estratégia:** Usamos `jest.mock()` para simular dependências externas (como chamadas de API com `axios`), garantindo que os testes sejam rápidos e previsíveis.

*   **Meio (Alguns): Testes de Integração com Supertest**
    *   **O quê?** Testam a integração entre diferentes partes do sistema, como a resposta de um endpoint da API, sem depender da interface do usuário.
    *   **Onde?** `tests/integration/` (sugestão de local) ou `tests/unit/` para testes de API mais simples.
    *   **Ferramenta:** `Jest` + `Supertest`.
    *   **Estratégia:** Fazemos requisições HTTP reais ao nosso servidor Express em memória para validar status codes, headers e o corpo das respostas.

*   **Topo (Poucos): Testes End-to-End (E2E) com Cypress**
    *   **O quê?** Simulam a jornada completa de um usuário na aplicação, interagindo com a interface gráfica em um navegador real.
    *   **Onde?** `cypress/e2e/`
    *   **Ferramenta:** `Cypress`.
    *   **Estratégia:** Validamos os fluxos críticos da aplicação do início ao fim, garantindo que todas as camadas (frontend, backend, banco de dados) funcionem juntas como esperado.

## 🚀 3. Fluxo de Desenvolvimento

O fluxo de trabalho para adicionar uma nova feature segue esta estratégia:

1.  **Desenvolver a Lógica**: O desenvolvedor cria a lógica de negócio na camada de `services`.
2.  **Testes Unitários**: Escreve testes unitários com **Jest** para a nova lógica, usando mocks para isolar o teste.
3.  **Expor via API**: Cria um endpoint no `app.js` ou em um `controller` para expor a nova funcionalidade.
4.  **Testes de Integração**: Adiciona testes com **Supertest** para validar o novo endpoint da API.
5.  **Testes E2E**: Se a feature impacta um fluxo crítico do usuário, um teste **Cypress** é criado ou atualizado.
6.  **Push e CI**: O código é enviado ao GitHub, onde o pipeline de CI/CD executa todos os testes automaticamente para garantir que nada foi quebrado.

Essa abordagem em camadas nos dá confiança para fazer alterações e evoluir o projeto de forma segura e eficiente.