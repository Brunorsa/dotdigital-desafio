Cypress.Commands.add('login', () => {
  cy.session('login', () => {
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.get('.panel > .header > .authorization-link > a').click();
    cy.get('#email').type('desafiodot@gmail.com')
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass').type('A123456*@')
    cy.get('.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2 > span').click();
  })
})

Cypress.Commands.add('selecionarMenu', () => {
  cy.get('#ui-id-5').trigger('mouseover');
  cy.get('#ui-id-17').trigger('mouseover');
  cy.get('#ui-id-20').click();
})

Cypress.Commands.add('escolherProduto', () => {
  cy.get(':nth-child(2) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('AddFotoramaVideoEvents is not a function')) {
      return false;
    }
    return true;
  });
})

Cypress.Commands.add('verificarProdutoNoCarrinho', () => {
  cy.intercept('**/customer/section/load/**').as('prodNoCarrinho')
  cy.get('#product-addtocart-button').click()
  cy.wait('@prodNoCarrinho')
  cy.get('.message-success > div').should('be.visible')
  cy.get('.showcart').click()
  cy.intercept('**/checkout/summary/item/price/**').as('resumoCarrinho')
  cy.get('#top-cart-btn-checkout').click()
  cy.wait(2000)
  cy.wait('@resumoCarrinho')
  cy.get('.button').click()
})

Cypress.Commands.add('selecionarCorTamanho', () => {
  cy.get('#option-label-size-143-item-167').click()
  cy.get('#option-label-color-93-item-50').click()
})
