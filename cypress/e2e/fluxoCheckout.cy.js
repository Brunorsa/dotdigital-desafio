describe('template spec', () => {
  describe('Efetuar compra no Luma', () => {
    beforeEach(() => {
      cy.login();
    })
    it('Validar seleção do produto e fazer checkout', () => {
      cy.visit('/');
      cy.selecionarMenu();
      cy.escolherProduto();
      cy.get('.size').should('be.visible')
      cy.get('.swatch-attribute.color').should('be.visible')

      cy.selecionarCorTamanho();
      cy.get('#option-label-size-143-item-167').should('have.attr', 'aria-checked', 'true')
      cy.get('#option-label-color-93-item-50').should('have.attr', 'aria-checked', 'true')
    })
    it('Validar checkout', () => {
      cy.visit('/ajax-full-zip-sweatshirt.html');
      cy.selecionarCorTamanho();
      cy.verificarProdutoNoCarrinho()

      cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click();

      cy.get('.order-number > strong').should('be.visible');
      cy.get('.base').should('have.text', 'Thank you for your purchase!')
    });
  })
})