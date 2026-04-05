// cypress/e2e/home.cy.js
describe('Página inicial', () => {
  it('deve carregar corretamente', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Bem-vindo');
  });
});